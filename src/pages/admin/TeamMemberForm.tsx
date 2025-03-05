import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { TeamMember } from '../../data/team';

const TeamMemberForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teamMembers, projects, updateTeamMember, addTeamMember, deleteTeamMember } = useContent();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const emptyMember: TeamMember = {
    id: '',
    name: '',
    role: '',
    bio: '',
    imageUrl: '',
    color: '#000000',
    projects: []
  };
  
  const [member, setMember] = useState<TeamMember>(emptyMember);
  const [availableProjects, setAvailableProjects] = useState<{ id: string, title: string }[]>([]);
  
  const isEditMode = id !== 'new';
  
  useEffect(() => {
    // Load project options
    const projectOptions = projects.map(project => ({
      id: project.id,
      title: project.title
    }));
    setAvailableProjects(projectOptions);
    
    if (isEditMode) {
      const memberToEdit = teamMembers.find(m => m.id === id);
      if (memberToEdit) {
        setMember(JSON.parse(JSON.stringify(memberToEdit))); // Deep copy
      } else {
        navigate('/admin');
      }
    } else {
      // Set up a new team member with a generated ID
      setMember({
        ...emptyMember,
        id: `member-${Date.now()}`
      });
    }
  }, [id, isEditMode, teamMembers, projects, navigate, emptyMember]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMember(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMember(prev => ({
      ...prev,
      projects: selected
    }));
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember(prev => ({
      ...prev,
      color: e.target.value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!member.name || !member.role || !member.bio) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditMode) {
      updateTeamMember(member);
    } else {
      addTeamMember(member);
    }
    
    setFormSubmitted(true);
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setIsDeleting(true);
      deleteTeamMember(member.id);
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
            Team member deleted successfully. Redirecting...
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="admin-form-container">
        <h1>{isEditMode ? 'Edit Team Member' : 'Add Team Member'}</h1>
        
        {formSubmitted && (
          <div className="success-message">
            Team member successfully {isEditMode ? 'updated' : 'added'}! Redirecting...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={member.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role*</label>
            <input
              type="text"
              id="role"
              name="role"
              value={member.role}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio*</label>
            <textarea
              id="bio"
              name="bio"
              value={member.bio}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={member.imageUrl}
                onChange={handleChange}
                placeholder="/assets/team/default.jpg"
              />
              {member.imageUrl && (
                <div className="image-preview">
                  <img 
                    src={member.imageUrl} 
                    alt="Member preview" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                id="color"
                name="color"
                value={member.color}
                onChange={handleColorChange}
              />
              <span className="color-value">{member.color}</span>
              <div 
                className="color-preview" 
                style={{ 
                  height: '30px', 
                  width: '100%', 
                  backgroundColor: member.color,
                  marginTop: '10px',
                  borderRadius: '4px'
                }}
              ></div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="projects">Projects</label>
            <select
              id="projects"
              name="projects"
              multiple
              value={member.projects || []}
              onChange={handleProjectsChange}
              style={{ height: '120px' }}
            >
              {availableProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <p className="form-help-text">Hold Ctrl/Cmd to select multiple projects</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={member.email || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            {isEditMode && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-button"
              >
                Delete Team Member
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
                {isEditMode ? 'Update Team Member' : 'Add Team Member'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TeamMemberForm;
