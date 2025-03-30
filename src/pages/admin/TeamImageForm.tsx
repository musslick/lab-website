import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';

const TeamImageForm: React.FC = () => {
  const navigate = useNavigate();
  const { getTeamImage, updateTeamImage, getTeamImagePosition, updateTeamImagePosition } = useContent();
  
  // Form state
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [imagePosition, setImagePosition] = useState('center');
  
  // Position controls
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  
  // UI state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Load current team image and position on component mount
  useEffect(() => {
    const teamImage = getTeamImage();
    const position = getTeamImagePosition();
    setCurrentImage(teamImage);
    
    // Parse position values
    if (position && position !== 'center') {
      const positionParts = position.split(' ');
      if (positionParts.length === 2) {
        const horizontal = parseInt(positionParts[0]);
        const vertical = parseInt(positionParts[1]);
        
        if (!isNaN(horizontal) && !isNaN(vertical)) {
          setHorizontalPosition(horizontal);
          setVerticalPosition(vertical);
        }
      }
    }
    
    setImagePosition(position || 'center');
  }, [getTeamImage, getTeamImagePosition]);
  
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
  
  // Update position state when sliders change
  const handlePositionChange = () => {
    const newPosition = `${horizontalPosition}% ${verticalPosition}%`;
    setImagePosition(newPosition);
  };
  
  // Update horizontal position
  const handleHorizontalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontalPosition(parseInt(e.target.value));
    handlePositionChange();
  };
  
  // Update vertical position
  const handleVerticalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerticalPosition(parseInt(e.target.value));
    handlePositionChange();
  };
  
  // Effect to update position when either slider changes
  useEffect(() => {
    handlePositionChange();
  }, [horizontalPosition, verticalPosition]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate - either URL or uploaded image must be provided for image update
    if ((imageUrl || uploadedImage) && !imagePosition) {
      setError('Please set the image position');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    try {
      // If image is being updated
      if (imageUrl || uploadedImage) {
        // Update with either uploaded image or URL
        const newImageSource = uploadedImage || imageUrl;
        updateTeamImage(newImageSource);
      }
      
      // Always update position
      updateTeamImagePosition(imagePosition);
      
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
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
              maxWidth: '100%',
              maxHeight: '300px',
              overflow: 'hidden',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <img 
              src={uploadedImage || imageUrl || currentImage} 
              alt="Team preview" 
              style={{ 
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                objectPosition: imagePosition
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
          
          {/* Image Position Controls */}
          <div className="form-group">
            <label>Image Position</label>
            <p className="form-help-text">Adjust sliders to control which part of the image is visible</p>
            
            <div className="position-controls">
              <div className="slider-control">
                <label htmlFor="horizontalPosition">Horizontal Position: {horizontalPosition}%</label>
                <input
                  type="range"
                  id="horizontalPosition"
                  min="0"
                  max="100"
                  value={horizontalPosition}
                  onChange={handleHorizontalChange}
                  className="position-slider"
                />
                <div className="slider-labels">
                  <span>Left</span>
                  <span>Center</span>
                  <span>Right</span>
                </div>
              </div>
              
              <div className="slider-control">
                <label htmlFor="verticalPosition">Vertical Position: {verticalPosition}%</label>
                <input
                  type="range"
                  id="verticalPosition"
                  min="0"
                  max="100"
                  value={verticalPosition}
                  onChange={handleVerticalChange}
                  className="position-slider"
                />
                <div className="slider-labels">
                  <span>Top</span>
                  <span>Center</span>
                  <span>Bottom</span>
                </div>
              </div>
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
