import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { Project } from '../../data/projects';

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, teamMembers, updateProject, addProject, deleteProject } = useContent();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [team, setTeam] = useState<string[]>([]);
  const [projectId, setProjectId] = useState('');
  const [color, setColor] = useState('');
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  
  // Available options
  const [availableTeamMembers, setAvailableTeamMembers] = useState<{ name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Determine if we're in create mode or edit mode
  const isNewProject = id === 'new';
  
  // Initialize a new project ID only once when creating a new project
  useEffect(() => {
    if (isNewProject && !projectId) {
      const newId = `project-${Date.now()}`;
      setProjectId(newId);
      setColor('linear-gradient(135deg, #FF5733, #00AAFF)');
      console.log("Created new project ID:", newId);
    }
  }, [isNewProject, projectId]);
  
  useEffect(() => {
    // Always load available team members and categories
    const teamMemberNames = teamMembers.map(member => ({ name: member.name }));
    setAvailableTeamMembers(teamMemberNames);
    
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    setCategories(uniqueCategories);
    
    if (!isNewProject) {
      // Only load existing data for edit mode
      const projectToEdit = projects.find(p => p.id === id);
      if (projectToEdit) {
        console.log("Editing existing project:", projectToEdit.title);
        setProjectId(projectToEdit.id);
        setTitle(projectToEdit.title || '');
        setDescription(projectToEdit.description || '');
        setCategory(projectToEdit.category || '');
        setTeam(projectToEdit.team || []);
        setColor(projectToEdit.color || '');
      } else {
        setError(`Could not find project with ID: ${id}`);
        console.error(`Could not find project with ID: ${id}`);
      }
    }
  }, [id, isNewProject, projects, teamMembers]);
  
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setTeam(selected);
  };
  
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
      // Construct the project object
      const projectData: Project = {
        id: projectId,
        title,
        description,
        category,
        team,
        color,
        _lastUpdated: Date.now() // For cache busting
      };
      
      console.log("Saving project:", projectData);
      
      if (isNewProject) {
        const addedProject = addProject(projectData);
        console.log("Added new project with ID:", addedProject.id);
      } else {
        updateProject(projectData);
        console.log("Updated existing project:", projectData.title);
        // Add cache busting for edited projects
        localStorage.setItem(`project_cache_${projectId}`, Date.now().toString());
      }
      
      setFormSubmitted(true);
      setLastUpdated(Date.now());
      
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
  
  // Preview the project's color gradient
  const colorPreviewStyle = {
    height: '100px',
    borderRadius: '8px',
    marginTop: '15px',
    background: color
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
        
        {/* Debug info with more details */}
        <div style={{background: '#f8f9fa', padding: '10px', marginBottom: '15px', fontSize: '12px'}}>
          <strong>ID:</strong> {projectId}<br/>
          <strong>Mode:</strong> {isNewProject ? 'New' : 'Edit'}<br/>
          <strong>Title:</strong> {title}<br/>
          <strong>Last Updated:</strong> {new Date(lastUpdated).toLocaleTimeString()}<br/>
          <strong>Team Members:</strong> {team.length > 0 ? team.join(', ') : 'None selected'}<br/>
          <strong>Category:</strong> {category || 'Not set'}
        </div>
        
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
            <label htmlFor="category">Category*</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="categories"
              required
            />
            <datalist id="categories">
              {categories.map((cat, index) => (
                <option key={index} value={cat} />
              ))}
            </datalist>
            <p className="form-help-text">Type to select an existing category or enter a new one</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team Members</label>
            <select
              id="team"
              multiple
              value={team}
              onChange={handleTeamChange}
              style={{ height: '150px' }}
            >
              {availableTeamMembers.map((member, index) => (
                <option key={index} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
            <p className="form-help-text">Hold Ctrl/Cmd to select multiple team members</p>
          </div>
          
          <div className="form-group">
            <label>Color Preview</label>
            <div style={colorPreviewStyle}></div>
            <p className="form-help-text">Color is automatically generated based on team members</p>
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
