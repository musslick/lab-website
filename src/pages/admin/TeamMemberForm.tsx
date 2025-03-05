import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { TeamMember } from '../../data/team';

const TeamMemberForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teamMembers, projects, updateTeamMember, addTeamMember } = useContent();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const emptyMember: TeamMember = {
    id: '',
    name: '',
    role: '',
    bio: '',
    imageUrl: '/team/placeholder.jpg',
    color: '#FF5733',
    projects: [],
    email: ''
  };

  const [member, setMember] = useState<TeamMember>(emptyMember);
  const isEditMode = id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      const memberToEdit = teamMembers.find(m => m.id === id);
      if (memberToEdit) {
        setMember(memberToEdit);
      } else {
        navigate('/admin/team');
      }
    } else {
      // Generate a unique ID for new team members
      setMember({
        ...emptyMember,
        id: `member-${Date.now()}`
      });
    }
  }, [id, teamMembers, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMember(prevMember => ({
      ...prevMember,
      [name]: value
    }));
  };

  const handleProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    
    setMember(prevMember => ({
      ...prevMember,
      projects: selectedOptions
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
            <label htmlFor="name">Full Name</label>
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
            <label htmlFor="role">Role</label>
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
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={member.bio}
              onChange={handleChange}
              rows={4}
              required
            />
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
          
          <div className="form-group">
            <label htmlFor="imageUrl">Profile Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={member.imageUrl}
              onChange={handleChange}
              required
            />
            <div className="image-preview">
              <img 
                src={member.imageUrl} 
                alt="Profile preview" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/team/placeholder.jpg';
                }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={member.color}
              onChange={handleChange}
              required
            />
            <span className="color-value">{member.color}</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="projects">Projects</label>
            <select
              id="projects"
              name="projects"
              multiple
              value={member.projects || []}
              onChange={handleProjectsChange}
              size={Math.min(5, projects.length)}
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <p className="form-help-text">Hold Ctrl/Cmd to select multiple projects</p>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin')} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              {isEditMode ? 'Update Team Member' : 'Add Team Member'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TeamMemberForm;
