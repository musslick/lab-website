import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { Project } from '../../data/projects';
import { generateTopicColor, hexToHsl, hslToHex } from '../../utils/colorUtils';

// Lab color (blue) - constant for reference with topic colors - MOVED TO TOP
const LAB_COLOR = '#00AAFF';

interface TopicWithColor {
  name: string;
  color: string;
  lightness: number;
}

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, teamMembers, updateProject, addProject, deleteProject } = useContent();

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [team, setTeam] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [topics, setTopics] = useState<TopicWithColor[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [topicLightness, setTopicLightness] = useState(50); // Default lightness (0-100)
  const [status, setStatus] = useState<'ongoing' | 'completed'>('ongoing');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [publications, setPublications] = useState<string[]>([]);
  const [publicationInput, setPublicationInput] = useState('');
  const [projectId, setProjectId] = useState('');
  
  // Extract all unique topics from existing projects
  const existingTopics = React.useMemo(() => {
    const allTopics = projects.flatMap(project => 
      (project.topics || []).map(topicName => {
        // Look for this topic in any existing project to get its color
        const topicWithColor = projects
          .flatMap(p => p.topicsWithColors || [])
          .find(t => t && t.name === topicName);
          
        return {
          name: topicName,
          color: topicWithColor?.color || generateTopicColor(LAB_COLOR, 0, 1),
          lightness: topicWithColor?.lightness || 50
        };
      })
    );
    
    // Remove duplicates by name
    const uniqueTopics = Array.from(
      allTopics.reduce((map, topic) => {
        if (!map.has(topic.name)) {
          map.set(topic.name, topic);
        }
        return map;
      }, new Map<string, TopicWithColor>())
    ).map(([_, topic]) => topic);
    
    return uniqueTopics.sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Constants for dropdown options
  const categories = ['Neuroscience', 'Artificial Intelligence', 'Cognitive Enhancement', 'Interface Technology', 'Data Science', 'Other'];
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
        setCategory(projectToEdit.category || '');
        setTeam(projectToEdit.team || []);
        setImage(projectToEdit.image || '');
        
        // Handle topics with colors if available, otherwise convert simple topics
        if (projectToEdit.topicsWithColors && projectToEdit.topicsWithColors.length > 0) {
          setTopics(projectToEdit.topicsWithColors);
        } else if (projectToEdit.topics) {
          // Convert simple topics to topics with colors
          setTopics(projectToEdit.topics.map((name, index) => ({
            name,
            color: generateTopicColor(LAB_COLOR, index, projectToEdit.topics?.length || 1),
            lightness: 50
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
  const generateTopicColorWithLightness = (lightness: number): string => {
    // Extract hue and saturation from lab color, but use the provided lightness
    const [h, s, _] = hexToHsl(LAB_COLOR);
    return hslToHex(h, s, lightness);
  };

  // Topic management
  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.some(t => t.name === topicInput.trim())) {
      const newColor = generateTopicColorWithLightness(topicLightness);
      setTopics(prevTopics => [...prevTopics, {
        name: topicInput.trim(),
        color: newColor,
        lightness: topicLightness
      }]);
      setTopicInput('');
    }
  };
  
  const handleRemoveTopic = (topicName: string) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.name !== topicName));
  };

  // Handle selecting an existing topic from the dropdown
  const handleSelectExistingTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopicName = e.target.value;
    if (selectedTopicName && !topics.some(t => t.name === selectedTopicName)) {
      // Find the selected topic in existing topics
      const selectedTopic = existingTopics.find(t => t.name === selectedTopicName);
      
      if (selectedTopic) {
        setTopics(prevTopics => [...prevTopics, selectedTopic]);
      } else {
        // If not found, create a new one with default color
        const newColor = generateTopicColorWithLightness(topicLightness);
        setTopics(prevTopics => [...prevTopics, {
          name: selectedTopicName,
          color: newColor,
          lightness: topicLightness
        }]);
      }
      
      // Reset the select dropdown after selection
      e.target.value = '';
    }
  };
  
  // Handle changing topic lightness
  const handleTopicLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightness = parseInt(e.target.value);
    setTopicLightness(newLightness);
    // Update the color preview in real-time
  };
  
  // Update color for a specific topic
  const updateTopicColor = (topicName: string, lightness: number) => {
    setTopics(prevTopics => prevTopics.map(topic => {
      if (topic.name === topicName) {
        const newColor = generateTopicColorWithLightness(lightness);
        return {
          ...topic,
          color: newColor,
          lightness
        };
      }
      return topic;
    }));
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
    if (!title || !description || !category) {
      setError('Please fill in all required fields');
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
        category,
        team,
        color: '', // This will be generated based on team members in the context
        topics: topicNames,
        topicsWithColors: topics, // New field to store topics with color information
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
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
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
            <label>Topics</label>
            <div className="topic-selection-container">
              {/* Dropdown for selecting existing topics */}
              <div className="existing-topics-dropdown">
                <select 
                  onChange={handleSelectExistingTopic}
                  defaultValue=""
                >
                  <option value="" disabled>Select existing topic</option>
                  {existingTopics.map(topic => (
                    <option key={topic.name} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Input for adding new topics with color control */}
              <div className="topic-input-container">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTopic();
                    }
                  }}
                  placeholder="Type a new topic and press Enter"
                />
                <button 
                  type="button" 
                  onClick={handleAddTopic}
                  className="tag-add-button"
                >
                  Add
                </button>
              </div>
              
              {/* Color lightness control */}
              <div className="topic-color-control">
                <label>Topic Color Lightness</label>
                <div className="color-slider-container">
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={topicLightness}
                    onChange={handleTopicLightnessChange}
                    className="lightness-slider"
                  />
                  <div 
                    className="color-preview"
                    style={{
                      backgroundColor: generateTopicColorWithLightness(topicLightness),
                      width: '30px',
                      height: '30px',
                      borderRadius: '4px',
                      marginLeft: '10px'
                    }}
                  ></div>
                </div>
                <span className="lightness-value">{topicLightness}%</span>
              </div>
            </div>
            
            <div className="topics-container">
              {topics.map((topic) => (
                <div 
                  key={topic.name} 
                  className="topic-badge"
                  style={{ borderLeft: `4px solid ${topic.color}` }}
                >
                  <span style={{ marginRight: '8px' }}>{topic.name}</span>
                  <div className="topic-controls">
                    <input 
                      type="range"
                      min="20"
                      max="80"
                      value={topic.lightness}
                      onChange={(e) => updateTopicColor(topic.name, parseInt(e.target.value))}
                      className="topic-lightness-slider"
                      title="Adjust color lightness"
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
                      onClick={() => handleRemoveTopic(topic.name)}
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
