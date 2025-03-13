import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { Publication } from '../../data/publications';

const PublicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { publications, projects, updatePublication, addPublication, deletePublication } = useContent();
  
  // Form state
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState<'journal' | 'conference' | 'book' | 'preprint' | 'thesis'>('journal');
  const [authors, setAuthors] = useState<string[]>(['']);
  const [doi, setDoi] = useState('');
  const [url, setUrl] = useState('');
  const [abstract, setAbstract] = useState('');
  const [citation, setCitation] = useState('');
  const [projectId, setProjectId] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [pubId, setPubId] = useState('');
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if we're in create mode or edit mode
  const isNewPublication = !id || id === 'new';
  
  // Initialize a new publication ID only once when creating a new publication
  useEffect(() => {
    if (isNewPublication && !pubId) {
      const newId = `pub-${Date.now()}`;
      setPubId(newId);
      console.log("Created new publication ID:", newId);
    }
  }, [isNewPublication, pubId]);
  
  useEffect(() => {
    if (!isNewPublication) {
      // Only load existing data for edit mode
      const publicationToEdit = publications.find(pub => pub.id === id);
      if (publicationToEdit) {
        console.log("Editing existing publication:", publicationToEdit.title);
        setPubId(publicationToEdit.id);
        setTitle(publicationToEdit.title || '');
        setJournal(publicationToEdit.journal || '');
        setYear(publicationToEdit.year || new Date().getFullYear());
        setType(publicationToEdit.type || 'journal');
        setAuthors(publicationToEdit.authors || ['']);
        setDoi(publicationToEdit.doi || '');
        setUrl(publicationToEdit.url || '');
        setAbstract(publicationToEdit.abstract || '');
        setCitation(publicationToEdit.citation || '');
        setProjectId(publicationToEdit.projectId || '');
        setKeywords(publicationToEdit.keywords || []);
      } else {
        setError(`Could not find publication with ID: ${id}`);
        console.error(`Could not find publication with ID: ${id}`);
      }
    }
  }, [id, isNewPublication, publications]);

  // Author management
  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };
  
  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };
  
  const handleRemoveAuthor = (index: number) => {
    if (authors.length > 1) {
      const newAuthors = [...authors];
      newAuthors.splice(index, 1);
      setAuthors(newAuthors);
    }
  };

  // Keyword management
  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords(prevKeywords => [...prevKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };
  
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));
  };
  
  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !journal || !authors.length || !year || !type || !citation) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Remove empty author entries
    const filteredAuthors = authors.filter(author => author.trim() !== '');
    
    if (filteredAuthors.length === 0) {
      setError('Please add at least one author');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    try {
      // Construct the publication object
      const publicationData: Publication = {
        id: pubId,
        title,
        journal,
        year,
        type,
        authors: filteredAuthors,
        citation
      };
      
      // Add optional fields if they exist
      if (doi) publicationData.doi = doi;
      if (url) publicationData.url = url;
      if (abstract) publicationData.abstract = abstract;
      if (projectId) publicationData.projectId = projectId;
      if (keywords.length > 0) publicationData.keywords = [...keywords];
      
      console.log("Saving publication:", publicationData);
      
      if (isNewPublication) {
        const addedPublication = addPublication(publicationData);
        console.log("Added new publication with ID:", addedPublication.id);
      } else {
        updatePublication(publicationData);
        console.log("Updated existing publication:", publicationData.id);
      }
      
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin/publications');
      }, 1500);
    } catch (error) {
      console.error("Error saving publication:", error);
      setError("An error occurred while saving the publication.");
    }
  };
  
  // Handle publication deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      setIsDeleting(true);
      deletePublication(pubId);
      setTimeout(() => {
        navigate('/admin/publications');
      }, 1000);
    }
  };
  
  // Show deletion message
  if (isDeleting) {
    return (
      <Layout>
        <div className="admin-form-container">
          <div className="success-message">
            Publication deleted successfully. Redirecting...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isNewPublication ? 'Add Publication' : 'Edit Publication'}</h1>
        
        {/* Success message */}
        {formSubmitted && (
          <div className="success-message">
            Publication successfully {isNewPublication ? 'added' : 'updated'}! Redirecting...
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Debug info */}
        <div style={{background: '#f8f9fa', padding: '10px', marginBottom: '15px', fontSize: '12px'}}>
          <strong>ID:</strong> {pubId}<br/>
          <strong>Mode:</strong> {isNewPublication ? 'New' : 'Edit'}
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="journal">Journal/Conference/Book*</label>
            <input
              type="text"
              id="journal"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year*</label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                min="1900"
                max={new Date().getFullYear() + 5}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Publication Type*</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                required
              >
                <option value="journal">Journal Article</option>
                <option value="conference">Conference Paper</option>
                <option value="book">Book/Book Chapter</option>
                <option value="preprint">Preprint</option>
                <option value="thesis">Thesis/Dissertation</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Authors*</label>
            {authors.map((author, index) => (
              <div key={index} className="author-input-row">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  placeholder="Author Name (e.g., Smith, J.)"
                  style={{ marginBottom: '5px' }}
                  required={index === 0}
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveAuthor(index)}
                  className="remove-button"
                  disabled={authors.length <= 1 && index === 0}
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddAuthor}
              className="add-field-button"
            >
              Add Author
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="doi">DOI (optional)</label>
              <input
                type="text"
                id="doi"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                placeholder="10.xxxx/xxxxx"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="url">URL (optional)</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://doi.org/..."
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="abstract">Abstract (optional)</label>
            <textarea
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="citation">Citation*</label>
            <textarea
              id="citation"
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              rows={3}
              placeholder="Full citation text (e.g., Author, A. (Year). Title. Journal, Vol(Issue), pages.)"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectId">Related Project (optional)</label>
            <select
              id="projectId"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">None</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Keywords (optional)</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder="Type a keyword and press Enter"
              />
              <button 
                type="button" 
                onClick={handleAddKeyword}
                className="tag-add-button"
              >
                Add
              </button>
            </div>
            <div className="tags-container">
              {keywords.map(keyword => (
                <div key={keyword} className="tag-badge">
                  {keyword}
                  <button 
                    type="button" 
                    className="tag-remove" 
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            {!isNewPublication && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-button"
              >
                Delete Publication
              </button>
            )}
            <div className="right-buttons">
              <button 
                type="button" 
                onClick={() => navigate('/admin/publications')} 
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="save-button">
                {isNewPublication ? 'Add Publication' : 'Update Publication'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PublicationForm;
