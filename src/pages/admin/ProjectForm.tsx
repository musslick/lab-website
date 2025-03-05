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
    color: 'linear-gradient(120deg, #FF5733, #33A8FF)',
    category: '',
    team: [],
    status: 'ongoing',
    startDate: new Date().toISOString().split('T')[0],
  };

  const [project, setProject] = useState<Project>(emptyProject);
  const isEditMode = id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      const projectToEdit = projects.find(p => p.id === id);
      if (projectToEdit) {
        setProject(projectToEdit);
      } else {
        navigate('/admin');
      }
    } else {
      // Generate a unique ID for new projects
      setProject({
        ...emptyProject,
        id: `project-${Date.now()}`
      });
    }
  }, [id, projects, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    
    setProject(prevProject => ({
      ...prevProject,
      team: selectedOptions
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!project.title || !project.description || !project.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Make sure we have a proper color value
    if (!project.color.includes('gradient') && !project.color.match(/#[0-9A-Fa-f]{6}/)) {
      setProject(prev => ({
        ...prev,
        color: 'linear-gradient(120deg, #FF5733, #33A8FF)'
      }));
    }
    
    console.log('Submitting project:', project);
    
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

  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isEditMode ? 'Edit Project' : 'Add New Project'}</h1>
        
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
              rows={4}
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
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Color (Gradient or Hex)*</label>
            <input
              type="text"
              id="color"
              name="color"
              value={project.color}
              onChange={handleChange}
              required
            />
            <div 
              className="color-preview" 
              style={{ background: project.color, height: '30px', width: '100%', marginTop: '5px', borderRadius: '4px' }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team Members</label>
            <select
              id="team"
              name="team"
              multiple
              value={project.team}
              onChange={handleTeamChange}
              size={Math.min(5, teamMembers.length)}
            >
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
            <p className="form-help-text">Hold Ctrl/Cmd to select multiple members</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status*</label>
            <select
              id="status"
              name="status"
              value={project.status}
              onChange={handleChange}
              required
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date (if completed)</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={project.endDate || ''}
                onChange={handleChange}
              />
            </div>
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
