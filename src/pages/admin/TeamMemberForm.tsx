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
  const [error, setError] = useState<string | null>(null);
  
  // Create separate state variables for each field
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('#000000');
  const [memberProjects, setMemberProjects] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');
  
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
        console.log("Loading team member for editing:", memberToEdit);
        // Set individual field values
        setName(memberToEdit.name || '');
        setRole(memberToEdit.role || '');
        setBio(memberToEdit.bio || '');
        setImageUrl(memberToEdit.imageUrl || '');
        setColor(memberToEdit.color || '#000000');
        setMemberProjects(memberToEdit.projects || []);
        setEmail(memberToEdit.email || '');
        setMemberId(memberToEdit.id);
      } else {
        setError(`Could not find team member with ID: ${id}`);
        setTimeout(() => navigate('/admin'), 2000);
      }
    } else {
      // Set up a new team member with a generated ID
      const newId = `member-${Date.now()}`;
      setMemberId(newId);
      setColor('#000000');
    }
  }, [id, isEditMode, teamMembers, projects, navigate]);
  
  const handleProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMemberProjects(selected);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name || !role || !bio) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Construct the team member object
    const memberData: TeamMember = {
      id: memberId,
      name,
      role,
      bio,
      imageUrl,
      color,
      projects: memberProjects
    };
    
    // Add email if provided
    if (email) {
      memberData.email = email;
    }
    
    console.log("Submitting team member data:", memberData);
    
    try {
      if (isEditMode) {
        updateTeamMember(memberData);
      } else {
        addTeamMember(memberData);
      }
      
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error) {
      console.error("Error saving team member:", error);
      setError("An error occurred while saving the team member.");
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setIsDeleting(true);
      deleteTeamMember(memberId);
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
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Debug info */}
        <div style={{background: '#f8f9fa', padding: '10px', marginBottom: '15px', fontSize: '12px'}}>
          <strong>ID:</strong> {memberId}<br/>
          <strong>Mode:</strong> {isEditMode ? 'Edit' : 'New'}<br/>
          <strong>Name:</strong> {name}
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role*</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio*</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/assets/team/default.jpg"
              />
              {imageUrl && (
                <div className="image-preview">
                  <img 
                    src={imageUrl} 
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
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <span className="color-value">{color}</span>
              <div 
                className="color-preview" 
                style={{ 
                  height: '30px', 
                  width: '100%', 
                  backgroundColor: color,
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
              multiple
              value={memberProjects}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
