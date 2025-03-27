import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { Project } from '../../data/projects';
import { generateTopicColor, hexToHsl, hslToHex } from '../../utils/colorUtils';

// Lab color (blue) - constant for reference with topic colors - MOVED TO TOP
const LAB_COLOR = '#00AAFF';

// Define TopicWithColor interface to match the Project interface
interface TopicWithColor {
  name: string;
  color: string;
  hue: number;  // Using hue instead of lightness
}

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, teamMembers, updateProject, addProject, deleteProject } = useContent();

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]); // Changed from string to string[]
  const [categoryInput, setCategoryInput] = useState('');
  const [team, setTeam] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [topics, setTopics] = useState<TopicWithColor[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [status, setStatus] = useState<'ongoing' | 'completed'>('ongoing');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [publications, setPublications] = useState<string[]>([]);
  const [publicationInput, setPublicationInput] = useState('');
  const [projectId, setProjectId] = useState('');
  const [previewHue, setPreviewHue] = useState<number>(0);
  
  // Extract all unique topics from existing projects
  const existingMethods = React.useMemo(() => {
    const allMethods = projects.flatMap(project => 
      (project.topics || []).map(methodName => {
        // Look for this method in any existing project to get its color
        const methodWithColor = projects
          .flatMap(p => p.topicsWithColors || [])
          .find(t => t && t.name === methodName);
          
        return {
          name: methodName,
          color: methodWithColor?.color || generateTopicColor(LAB_COLOR, 0, 1),
          hue: methodWithColor?.hue || 0  // Using the hue property
        };
      })
    );
    
    // Remove duplicates by name
    const uniqueMethods = Array.from(
      allMethods.reduce((map, method) => {
        if (!map.has(method.name)) {
          map.set(method.name, method);
        }
        return map;
      }, new Map<string, TopicWithColor>())
    ).map(([_, method]) => method);
    
    return uniqueMethods.sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);
  
  // Extract all unique categories from existing projects
  const existingDisciplines = React.useMemo(() => {
    const allDisciplines = projects.flatMap(project => 
      typeof project.category === 'string' ? [project.category] :
      Array.isArray(project.category) ? project.category : []
    );
    return Array.from(new Set(allDisciplines)).sort();
  }, [projects]);
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Constants for dropdown options
  const statusOptions = [
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' }
  ];
  
  // Determine if we're in create mode or edit mode
  const isNewProject = !id || id === 'new';
  
  // Initialize a new project ID only once when creating a new project
  useEffect(() => {
    if (isNewProject && !projectId) {
      const newId = `project-${Date.now()}`;
      setProjectId(newId);
    }
  }, [isNewProject, projectId]);
  
  useEffect(() => {
    if (!isNewProject) {
      // Load existing data for edit mode
      const projectToEdit = projects.find(p => p.id === id);
      if (projectToEdit) {
        setProjectId(projectToEdit.id);
        setTitle(projectToEdit.title || '');
        setDescription(projectToEdit.description || '');
        
        // Handle category as either string or array
        if (typeof projectToEdit.category === 'string') {
          setCategories([projectToEdit.category]);
        } else if (Array.isArray(projectToEdit.category)) {
          setCategories(projectToEdit.category);
        } else {
          setCategories([]);
        }
        
        setTeam(projectToEdit.team || []);
        setImage(projectToEdit.image || '');
        
        // Handle topics with colors if available, otherwise convert simple topics
        if (projectToEdit.topicsWithColors && projectToEdit.topicsWithColors.length > 0) {
          // Convert topicsWithColors to the correct format if needed
          const formattedTopics: TopicWithColor[] = projectToEdit.topicsWithColors.map(topic => ({
            name: topic.name,
            color: topic.color,
            hue: topic.hue || 0  // Ensure hue is defined
          }));
          setTopics(formattedTopics);
        } else if (projectToEdit.topics) {
          // Convert simple topics to topics with colors
          setTopics(projectToEdit.topics.map((name, index) => ({
            name,
            color: generateTopicColor(LAB_COLOR, index, projectToEdit.topics?.length || 1),
            hue: 0
          })));
        } else {
          setTopics([]);
        }
        
        setStatus(projectToEdit.status || 'ongoing');
        setStartDate(projectToEdit.startDate || '');
        setEndDate(projectToEdit.endDate || '');
        setPublications(projectToEdit.publications || []);
      } else {
        setError(`Could not find project with ID: ${id}`);
      }
    }
  }, [id, isNewProject, projects, LAB_COLOR]);
  
  // Team members selection
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setTeam(selected);
  };

  // Generate topic color based on lab color and selected lightness
  const generateTopicColorWithHue = (hue: number): string => {
    // Use fixed saturation (100) and lightness (80)
    return hslToHex(hue, 100, 80);
  };

  // Topic management
  const handleAddMethod = () => {
    if (topicInput.trim() && !topics.some(t => t.name === topicInput.trim())) {
      // Use the preview hue value instead of a random hue
      const newColor = generateTopicColorWithHue(previewHue);
      setTopics(prevTopics => [...prevTopics, {
        name: topicInput.trim(),
        color: newColor,
        hue: previewHue
      }]);
      setTopicInput('');
      // Reset preview hue for the next method
      setPreviewHue(Math.floor(Math.random() * 360));
    }
  };
  
  const handleRemoveMethod = (methodName: string) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.name !== methodName));
  };

  // Handle selecting an existing topic from the dropdown
  const handleSelectExistingMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMethodName = e.target.value;
    if (selectedMethodName && !topics.some(t => t.name === selectedMethodName)) {
      // Find the selected method in existing methods
      const selectedMethod = existingMethods.find(t => t.name === selectedMethodName);
      
      if (selectedMethod) {
        setTopics(prevTopics => [...prevTopics, selectedMethod]);
      } else {
        // If not found, create a new one with default color
        const newHue = Math.floor(Math.random() * 360); // Random hue
        const newColor = generateTopicColorWithHue(newHue);
        setTopics(prevTopics => [...prevTopics, {
          name: selectedMethodName,
          color: newColor,
          hue: newHue
        }]);
      }
      
      // Reset the select dropdown after selection
      e.target.value = '';
    }
  };
  
  // Handle changing topic hue
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>, topicIndex: number) => {
    const hue = parseInt(e.target.value);
    const updatedTopics = [...topics];
    
    // Use the fixed saturation (100) and lightness (80) values
    const color = hslToHex(hue, 100, 80);
    
    updatedTopics[topicIndex] = {
      ...updatedTopics[topicIndex],
      color: color,
      hue: hue, // Keep track of the hue value for the slider
    };
    
    setTopics(updatedTopics);
  };
  
  // Update color for a specific method
  const updateMethodColor = (methodName: string, hue: number) => {
    setTopics(prevTopics => prevTopics.map(topic => {
      if (topic.name === methodName) {
        const newColor = generateTopicColorWithHue(hue);
        return {
          ...topic,
          color: newColor,
          hue
        };
      }
      return topic;
    }));
  };
  
  // Handle preview hue slider change
  const handlePreviewHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    setPreviewHue(hue);
  };

  // Category management
  const handleAddDiscipline = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories(prevCategories => [...prevCategories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const handleRemoveDiscipline = (disciplineToRemove: string) => {
    setCategories(prevCategories => 
      prevCategories.filter(category => category !== disciplineToRemove)
    );
  };

  // Handle selecting an existing category
  const handleSelectExistingDiscipline = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDiscipline = e.target.value;
    if (selectedDiscipline && !categories.includes(selectedDiscipline)) {
      setCategories(prevCategories => [...prevCategories, selectedDiscipline]);
      e.target.value = ''; // Reset select after selection
    }
  };

  const handleDisciplineKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDiscipline();
    }
  };

  // Publication management
  const handleAddPublication = () => {
    if (publicationInput.trim() && !publications.includes(publicationInput.trim())) {
      setPublications(prevPublications => [...prevPublications, publicationInput.trim()]);
      setPublicationInput('');
    }
  };
  
  const handleRemovePublication = (publicationToRemove: string) => {
    setPublications(prevPublications => 
      prevPublications.filter(publication => publication !== publicationToRemove)
    );
  };
  
  const handlePublicationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPublication();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !description || categories.length === 0) {
      setError('Please fill in all required fields and add at least one category');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    try {
      // Extract just the topic names for backward compatibility
      const topicNames = topics.map(topic => topic.name);
      
      // Construct the project object
      const projectData: Project = {
        id: projectId,
        title,
        description,
        category: categories.length === 1 ? categories[0] : categories, // Support both single string and array
        team,
        color: '', // This will be generated based on team members in the context
        topics: topicNames,
        topicsWithColors: topics, // Now properly typed
        status,
        publications
      };
      
      // Only add fields if they have values
      if (image) projectData.image = image;
      if (startDate) projectData.startDate = startDate;
      if (endDate) projectData.endDate = endDate;
      
      console.log("Saving project:", projectData);
      
      if (isNewProject) {
        const addedProject = addProject(projectData);
        console.log("Added new project with ID:", addedProject.id);
      } else {
        updateProject(projectData);
        console.log("Updated existing project:", projectData.id);
      }
      
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error) {
      console.error("Error saving project:", error);
      setError("An error occurred while saving the project.");
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(true);
      deleteProject(projectId);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
  };
  
  if (isDeleting) {
    return (
      <Layout>
        <div className="admin-form-container">
          <div className="success-message">
            Project deleted successfully. Redirecting...
          </div>
        </div>
      </Layout>
    );
  }

  // Function to generate a color for a topic based on index
  const getTopicColor = (topic: string, index: number) => {
    return generateTopicColor(LAB_COLOR, index, topics.length);
  };
  
  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isNewProject ? 'Add Project' : 'Edit Project'}</h1>
        
        {formSubmitted && (
          <div className="success-message">
            Project successfully {isNewProject ? 'added' : 'updated'}! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Project Title*</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Disciplines*</label>
            <div className="topic-selection-container">
              {/* Dropdown for selecting existing disciplines */}
              <div className="existing-topics-dropdown">
                <select 
                  onChange={handleSelectExistingDiscipline}
                  defaultValue=""
                >
                  <option value="" disabled>Select existing discipline</option>
                  {existingDisciplines.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              {/* Input for adding new disciplines */}
              <div className="topic-input-container">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleDisciplineKeyDown}
                  placeholder="Type a new discipline and press Enter"
                />
                <button 
                  type="button" 
                  onClick={handleAddDiscipline}
                  className="tag-add-button"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Display selected disciplines as tags */}
            <div className="topics-container">
              {categories.map(category => (
                <div key={category} className="topic-badge">
                  {category}
                  <button 
                    type="button" 
                    className="tag-remove" 
                    onClick={() => handleRemoveDiscipline(category)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {categories.length === 0 && (
              <p className="form-help-text">Please add at least one discipline</p>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'ongoing' | 'completed')}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={status === 'ongoing'}
              />
              {status === 'ongoing' && (
                <p className="form-help-text">End date only available for completed projects</p>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team Members</label>
            <select
              id="team"
              multiple
              value={team}
              onChange={handleTeamChange}
              style={{ height: '120px' }}
            >
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
            <p className="form-help-text">Hold Ctrl/Cmd to select multiple team members</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image URL (optional)</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && (
              <div className="image-preview">
                <img 
                  src={image} 
                  alt="Project preview" 
                  style={{ maxHeight: '150px' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Methods</label>
            <div className="topic-selection-container">
              {/* Dropdown for selecting existing methods */}
              <div className="existing-topics-dropdown">
                <select 
                  onChange={handleSelectExistingMethod}
                  defaultValue=""
                >
                  <option value="" disabled>Select existing method</option>
                  {existingMethods.map(topic => (
                    <option key={topic.name} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Input for adding new methods with color control */}
              <div className="topic-input-container">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMethod();
                    }
                  }}
                  placeholder="Type a new method and press Enter"
                />
                <button 
                  type="button" 
                  onClick={handleAddMethod}
                  className="tag-add-button"
                >
                  Add
                </button>
              </div>
              
              {/* Color hue control - Updated to use previewHue state */}
              <div className="topic-color-control">
                <label>Method Color</label>
                <div className="color-slider-container">
                  <input
                    type="range"
                    min="0"
                    max="359"
                    value={previewHue}
                    onChange={handlePreviewHueChange}
                    className="hue-slider"
                  />
                  <div 
                    className="color-preview"
                    style={{
                      backgroundColor: generateTopicColorWithHue(previewHue),
                      width: '30px',
                      height: '30px',
                      borderRadius: '4px',
                      marginLeft: '10px'
                    }}
                  ></div>
                </div>
                <span className="hue-value">Hue: {previewHue}°</span>
              </div>
            </div>
            
            <div className="topics-container">
              {topics.map((topic, index) => (
                <div 
                  key={topic.name} 
                  className="topic-badge"
                  style={{ borderLeft: `4px solid ${topic.color}` }}
                >
                  <span style={{ marginRight: '8px' }}>{topic.name}</span>
                  <div className="topic-controls">
                    <input 
                      type="range"
                      min="0"
                      max="359"
                      value={topic.hue}
                      onChange={(e) => updateMethodColor(topic.name, parseInt(e.target.value))}
                      className="topic-hue-slider"
                      title="Adjust color hue"
                    />
                    <div 
                      className="topic-color-preview"
                      style={{
                        backgroundColor: topic.color,
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        marginRight: '6px'
                      }}
                    ></div>
                    <button 
                      type="button" 
                      className="tag-remove" 
                      onClick={() => handleRemoveMethod(topic.name)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="publications">Publications</label>
            <div className="topic-input-container">
              <input
                type="text"
                value={publicationInput}
                onChange={(e) => setPublicationInput(e.target.value)}
                onKeyDown={handlePublicationKeyDown}
                placeholder="Add a publication reference"
              />
              <button 
                type="button" 
                onClick={handleAddPublication}
                className="topic-add-button"
              >
                Add
              </button>
            </div>
            <div className="topics-container">
              {publications.map((publication, index) => (
                <div key={index} className="topic-badge">
                  {publication}
                  <button 
                    type="button" 
                    className="topic-remove" 
                    onClick={() => handleRemovePublication(publication)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            {!isNewProject && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-button"
              >
                Delete Project
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
                {isNewProject ? 'Add Project' : 'Update Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProjectForm;
