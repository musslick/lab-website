import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';

const TeamImageForm: React.FC = () => {
  const navigate = useNavigate();
  const { getTeamImage, updateTeamImage } = useContent();
  
  // Form state
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Load current team image on component mount
  useEffect(() => {
    const teamImage = getTeamImage();
    setCurrentImage(teamImage);
  }, [getTeamImage]);
  
  // Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpeg, png, gif, etc)');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image file size should be less than 2MB');
      return;
    }
    
    setIsUploading(true);
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      setImageUrl(''); // Clear URL input when uploading file
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setUploadedImage(null); // Clear uploaded image when entering URL
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError(null);
    
    try {
      // If image is being updated
      if (imageUrl || uploadedImage) {
        // Update with either uploaded image or URL
        const newImageSource = uploadedImage || imageUrl;
        updateTeamImage(newImageSource);
        
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        setError('Please provide an image URL or upload an image');
      }
    } catch (error) {
      console.error("Error updating team image:", error);
      setError("An error occurred while updating the team image.");
    }
  };
  
  return (
    <Layout>
      <div className="admin-form-container">
        <h1>Update Team Image</h1>
        <p>This image appears on the home page in the team section.</p>
        
        {formSubmitted && (
          <div className="success-message">
            Team image successfully updated! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="current-image-preview">
          <h3>Current Team Image:</h3>
          <div 
            ref={previewRef} 
            className="image-position-preview"
            style={{
              width: '100%',
              maxHeight: '300px',
              overflow: 'hidden',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              position: 'relative'
            }}
          >
            <div style={{ 
              backgroundColor: 'rgba(0, 170, 255, 0.3)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1
            }}></div>
            <img 
              src={uploadedImage || imageUrl || currentImage} 
              alt="Team preview" 
              style={{ 
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Team+Image+Not+Found';
              }}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Update Team Image</label>
            
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
                    placeholder="https://example.com/team-image.jpg"
                    disabled={!!uploadedImage}
                  />
                </div>
              </div>
              
              {uploadedImage && (
                <div className="uploaded-image-preview">
                  <button
                    type="button"
                    onClick={handleClearUpload}
                    className="clear-upload-button"
                  >
                    Clear Uploaded Image
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <div className="right-buttons">
              <button 
                type="button" 
                onClick={() => navigate('/admin')} 
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="save-button">
                Update Team Image
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default TeamImageForm;
