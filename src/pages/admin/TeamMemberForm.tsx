import React, { useState, useEffect, useRef } from 'react';
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
  
  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('#000000');
  const [memberProjects, setMemberProjects] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');
  
  // New image upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Available projects for selection
  const [availableProjects, setAvailableProjects] = useState<{ id: string, title: string }[]>([]);
  
  // Determine if we're in create mode or edit mode
  const isNewMember = id === 'new';
  
  // Initialize a new member ID only once when creating a new member
  useEffect(() => {
    if (isNewMember && !memberId) {
      const newId = `member-${Date.now()}`;
      setMemberId(newId);
      setColor('#000000');
      console.log("Created new team member ID:", newId);
    }
  }, [isNewMember, memberId]);
  
  useEffect(() => {
    // Always load available projects for selection
    const projectOptions = projects.map(project => ({
      id: project.id,
      title: project.title
    }));
    setAvailableProjects(projectOptions);
    
    if (!isNewMember) {
      // Only load existing data for edit mode
      const memberToEdit = teamMembers.find(m => m.id === id);
      if (memberToEdit) {
        console.log("Editing existing team member:", memberToEdit.name);
        setMemberId(memberToEdit.id);
        setName(memberToEdit.name || '');
        setRole(memberToEdit.role || '');
        setBio(memberToEdit.bio || '');
        setImageUrl(memberToEdit.imageUrl || '');
        setColor(memberToEdit.color || '#000000');
        setMemberProjects(memberToEdit.projects || []);
        setEmail(memberToEdit.email || '');
        
        // If there's an existing image URL and it's a base64 image, set it as uploaded
        if (memberToEdit.imageUrl && memberToEdit.imageUrl.startsWith('data:image/')) {
          setUploadedImage(memberToEdit.imageUrl);
        }
      } else {
        setError(`Could not find team member with ID: ${id}`);
        console.error(`Could not find team member with ID: ${id}`);
      }
    }
  }, [id, isNewMember, projects, teamMembers, navigate]);
  
  const handleProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMemberProjects(selected);
  };
  
  // Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpeg, png, gif, etc)');
      return;
    }
    
    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setError('Image file size should be less than 1MB');
      return;
    }
    
    setIsUploading(true);
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      setImageUrl(base64); // Also update the imageUrl field
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      setError('Failed to read the image file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Clear uploaded image
  const handleClearUpload = () => {
    setUploadedImage(null);
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle external URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    
    // Clear uploaded image if we're using an external URL
    if (url && !url.startsWith('data:image/')) {
      setUploadedImage(null);
    }
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
    
    try {
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
      
      if (isNewMember) {
        const addedMember = addTeamMember(memberData);
        console.log("Added new team member with ID:", addedMember.id);
      } else {
        updateTeamMember(memberData);
        console.log("Updated existing team member:", memberData.name);
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
        <h1>{isNewMember ? 'Add Team Member' : 'Edit Team Member'}</h1>
        
        {formSubmitted && (
          <div className="success-message">
            Team member successfully {isNewMember ? 'added' : 'updated'}! Redirecting...
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
          <strong>Mode:</strong> {isNewMember ? 'New' : 'Edit'}<br/>
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
            <div className="form-group" style={{ flex: '1' }}>
              <label>Profile Image</label>
              
              <div className="image-upload-container">
                <div className="image-upload-options">
                  <div className="upload-option">
                    <label htmlFor="imageUpload" className="upload-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="file-input"
                    />
                    {isUploading && <span className="uploading-indicator">Uploading...</span>}
                  </div>
                  
                  <div className="upload-option">
                    <label htmlFor="imageUrl">or Enter Image URL</label>
                    <input
                      type="text"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={handleUrlChange}
                      placeholder="http://example.com/image.jpg"
                      disabled={!!uploadedImage}
                    />
                  </div>
                </div>
                
                {uploadedImage && (
                  <div className="uploaded-image-preview">
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      style={{ maxHeight: '150px', maxWidth: '100%' }}
                    />
                    <button
                      type="button"
                      onClick={handleClearUpload}
                      className="clear-upload-button"
                    >
                      Clear Uploaded Image
                    </button>
                  </div>
                )}
                
                {imageUrl && !uploadedImage && (
                  <div className="image-preview">
                    <img 
                      src={imageUrl} 
                      alt="Member preview" 
                      style={{ maxHeight: '150px', maxWidth: '100%' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
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
            {!isNewMember && (
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
                {isNewMember ? 'Add Team Member' : 'Update Team Member'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TeamMemberForm;
