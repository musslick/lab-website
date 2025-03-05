import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { TeamMember } from '../../data/team';

// Color palette options for team members
const COLOR_PALETTE = [
  '#FF5F6D', '#36D1DC', '#4E65FF', '#92EFFD', '#A88BEB', 
  '#FF9A8B', '#00B4DB', '#7B68EE', '#FF64B8', '#9CECFB',
  '#6DD5FA', '#FFB88C', '#FE5196', '#43CBFF', '#9708CC',
  '#00C9FF', '#EE9CA7', '#5271C4', '#5BE1B3', '#FF61D2'
];

const TeamMemberForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teamMembers, projects, updateTeamMember, addTeamMember, deleteTeamMember } = useContent();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);

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
        navigate('/admin');
      }
    } else {
      // Generate a unique ID for new team members
      setMember({
        ...emptyMember,
        id: `member-${Date.now()}`,
        // Select a random color from the palette for new members
        color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
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

  const handleColorChange = (color: string) => {
    setMember(prevMember => ({
      ...prevMember,
      color
    }));
    setShowColorPalette(false);
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this team member? This will also update any projects they are assigned to.')) {
      setIsDeleting(true);
      deleteTeamMember(member.id);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
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
            <label htmlFor="name">Full Name*</label>
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
                style={{ borderColor: member.color }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Member Color*</label>
            <div className="color-selector">
              <div 
                className="selected-color" 
                style={{ 
                  backgroundColor: member.color,
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '2px solid #ddd'
                }}
                onClick={() => setShowColorPalette(!showColorPalette)}
              ></div>
              <input
                type="text"
                value={member.color}
                name="color"
                onChange={handleChange}
                style={{ width: 'calc(100% - 50px)', marginLeft: '10px' }}
              />
            </div>

            {showColorPalette && (
              <div className="color-palette">
                {COLOR_PALETTE.map((color, index) => (
                  <div 
                    key={index}
                    className="color-option"
                    style={{ 
                      backgroundColor: color,
                      width: '30px',
                      height: '30px',
                      margin: '5px',
                      display: 'inline-block',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: color === member.color ? '2px solid black' : '1px solid #ddd'
                    }}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            )}
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
            {isEditMode && (
              <button type="button" onClick={handleDelete} className="delete-button">
                Delete Team Member
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TeamMemberForm;
