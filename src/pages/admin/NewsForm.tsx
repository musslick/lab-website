import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { NewsItem } from '../../data/news';

const NewsForm: React.FC = () => {
  // Get necessary parameters and context
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { newsItems, teamMembers, updateNewsItem, addNewsItem, deleteNewsItem } = useContent();
  
  // Create refs to track form state
  const formRef = useRef<HTMLFormElement>(null);
  const initialLoadCompleted = useRef(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const isEditMode = id !== 'new';
  const today = new Date().toISOString().split('T')[0];
  
  // Load news item data when component mounts
  useEffect(() => {
    const loadNewsItem = () => {
      try {
        if (isEditMode) {
          const itemToEdit = newsItems.find(item => item.id === id);
          
          if (itemToEdit) {
            console.log("Loading news item:", itemToEdit);
            setCurrentId(itemToEdit.id);
            setTitle(itemToEdit.title || '');
            setContent(itemToEdit.content || '');
            setDate(itemToEdit.date || today);
            setAuthor(itemToEdit.author || '');
            setImageUrl(itemToEdit.imageUrl || '');
            setFeatured(itemToEdit.featured || false);
            setTags(itemToEdit.tags || []);
            initialLoadCompleted.current = true;
          } else {
            console.error("Could not find news item with ID:", id);
            setErrorMessage(`Could not find news item with ID: ${id}`);
            setTimeout(() => navigate('/admin'), 2000);
          }
        } else {
          // For new items, set defaults
          const newId = `news-${Date.now()}`;
          setCurrentId(newId);
          setDate(today);
          initialLoadCompleted.current = true;
        }
      } catch (error) {
        console.error("Error loading news item:", error);
        setErrorMessage("An error occurred while loading the news item.");
      }
    };
    
    loadNewsItem();
  }, [id, newsItems, isEditMode, navigate, today]);
  
  // Tag management
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prevTags => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !content || !date || !author) {
      setErrorMessage("Please fill in all required fields");
      return;
    }
    
    // Clear any previous errors
    setErrorMessage(null);
    
    try {
      // Construct the news item object
      const newsItem: NewsItem = {
        id: currentId || `news-${Date.now()}`,
        title,
        content,
        date,
        author,
        featured,
        tags: [...tags]
      };
      
      // Only include imageUrl if it's not empty
      if (imageUrl.trim()) {
        newsItem.imageUrl = imageUrl;
      }
      
      console.log("Submitting news item:", newsItem);
      
      if (isEditMode) {
        updateNewsItem(newsItem);
        console.log("Updated news item with ID:", newsItem.id);
      } else {
        addNewsItem(newsItem);
        console.log("Added new news item with ID:", newsItem.id);
      }
      
      // Show success message and redirect
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error) {
      console.error("Error saving news item:", error);
      setErrorMessage("An error occurred while saving the news item.");
    }
  };
  
  // Handle deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      if (!currentId) {
        setErrorMessage("Cannot delete: no item ID found");
        return;
      }
      
      setIsDeleting(true);
      try {
        deleteNewsItem(currentId);
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } catch (error) {
        console.error("Error deleting news item:", error);
        setErrorMessage("An error occurred while deleting the news item.");
        setIsDeleting(false);
      }
    }
  };
  
  // Show deletion message
  if (isDeleting) {
    return (
      <Layout>
        <div className="admin-form-container">
          <div className="success-message">
            News item deleted successfully. Redirecting...
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isEditMode ? 'Edit News Item' : 'Add News Item'}</h1>
        
        {/* Success message */}
        {formSubmitted && (
          <div className="success-message">
            News item successfully {isEditMode ? 'updated' : 'added'}! Redirecting...
          </div>
        )}
        
        {/* Error message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        {/* Debug info */}
        <div style={{background: '#f8f9fa', padding: '10px', marginBottom: '15px', fontSize: '12px'}}>
          <strong>ID:</strong> {currentId || 'Not set'}<br/>
          <strong>Mode:</strong> {isEditMode ? 'Edit' : 'New'}<br/>
          <strong>Title:</strong> {title}
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
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
            <label htmlFor="content">Content*</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date*</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Author*</label>
              <select
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              >
                <option value="">Select Author</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <div className="image-preview">
                <img 
                  src={imageUrl} 
                  alt="News preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a tag and press Enter"
              />
              <button 
                type="button" 
                onClick={handleAddTag}
                className="tag-add-button"
              >
                Add
              </button>
            </div>
            <div className="tags-container">
              {tags.map(tag => (
                <div key={tag} className="tag-badge">
                  {tag}
                  <button 
                    type="button" 
                    className="tag-remove" 
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span className="checkbox-label">Mark as featured news item</span>
          </div>
          
          <div className="form-actions">
            {isEditMode && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-button"
              >
                Delete News Item
              </button>
            )}
            <div className="right-buttons">
              <button 
                type="button" 
                onClick={() => navigate('/admin')} 
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="save-button">
                {isEditMode ? 'Update News Item' : 'Add News Item'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewsForm;