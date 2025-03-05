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
  
  const emptyProject: Project = {
    id: '',
    title: '',
    description: '',
    color: 'linear-gradient(135deg, #FF5733, #00AAFF)',
    category: '',
    team: []
  };
  
  const [project, setProject] = useState<Project>(emptyProject);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<{ name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const isEditMode = id !== 'new';
  
  useEffect(() => {
    // Extract unique categories from existing projects
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    setCategories(uniqueCategories);
    
    // Get team member names
    const teamMemberNames = teamMembers.map(member => ({ name: member.name }));
    setAvailableTeamMembers(teamMemberNames);
    
    if (isEditMode) {
      const projectToEdit = projects.find(p => p.id === id);
      if (projectToEdit) {
        setProject(JSON.parse(JSON.stringify(projectToEdit))); // Deep copy
      } else {
        navigate('/admin');
      }
    } else {
      // Set up a new project with a generated ID
      setProject({
        ...emptyProject,
        id: `project-${Date.now()}`
      });
    }
  }, [id, isEditMode, projects, teamMembers, navigate, emptyProject]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setProject(prev => ({
      ...prev,
      team: selected
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!project.title || !project.description || !project.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditMode) {
      updateProject(project);
    } else {
      addProject(project);
    }
    
    setFormSubmitted(true);
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(true);
      deleteProject(project.id);
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
    background: project.color
  };
  
  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isEditMode ? 'Edit Project' : 'Add Project'}</h1>
        
        {formSubmitted && (
          <div className="success-message">
            Project successfully {isEditMode ? 'updated' : 'added'}! Redirecting...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Project Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={project.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <input
              type="text"
              id="category"
              name="category"
              value={project.category}
              onChange={handleChange}
              list="categories"
              required
            />
            <datalist id="categories">
              {categories.map((category, index) => (
                <option key={index} value={category} />
              ))}
            </datalist>
            <p className="form-help-text">Type to select an existing category or enter a new one</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team Members</label>
            <select
              id="team"
              name="team"
              multiple
              value={project.team || []}
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
            {isEditMode && (
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
                {isEditMode ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProjectForm;
