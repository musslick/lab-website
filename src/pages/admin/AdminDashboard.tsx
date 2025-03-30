import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { cleanupStorage, resetNewsItems, repairTeamProjectAssociations } from '../../utils/debugStorage';
import '../../styles/admin.css';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { 
    projects, 
    teamMembers, 
    newsItems, 
    collaborators, 
    publications, 
    software, 
    jobOpenings, 
    resetToDefaults,
    getFeaturedItems
  } = useContent();
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [storageInfo, setStorageInfo] = useState<{ key: string; size: number }[]>([]);
  const navigate = useNavigate();
  
  // Get current featured items
  const featuredItems = getFeaturedItems();

  useEffect(() => {
    // Calculate storage usage
    const calculateStorage = () => {
      const items = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || '';
        const value = localStorage.getItem(key) || '';
        items.push({ key, size: (value.length * 2) / 1024 }); // Size in KB (UTF-16 = 2 bytes per char)
      }
      setStorageInfo(items);
    };
    
    if (showDebugInfo) {
      calculateStorage();
    }
  }, [showDebugInfo]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  const clearStorage = () => {
    if (window.confirm('Are you sure you want to clear all localStorage data? This cannot be undone.')) {
      localStorage.clear(); // Clear all localStorage data
      window.location.reload();
    }
  };

  const handleCleanupNewsItems = () => {
    if (window.confirm('Cleanup news items? This will remove any corrupted items.')) {
      const success = cleanupStorage('newsItems');
      if (success) {
        alert('News items cleaned up. Please reload the page.');
        window.location.reload();
      } else {
        alert('Failed to clean up news items.');
      }
    }
  };

  const handleRepairAssociations = () => {
    if (window.confirm('Repair team-project associations? This will ensure consistency between teams and projects.')) {
      const changesApplied = repairTeamProjectAssociations();
      if (changesApplied) {
        alert('Team-project associations repaired. Please reload the page to see the changes.');
        window.location.reload();
      } else {
        alert('No issues found or couldn\'t repair associations.');
      }
    }
  };
  
  const handleResetNewsItems = () => {
    if (window.confirm('Reset news items? This will remove all news items and restore defaults.')) {
      resetNewsItems();
      alert('News items have been reset. Please reload the page.');
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleResetData = () => {
    resetToDefaults();
  };

  // Function to navigate to management pages when clicking on a card
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <button 
              onClick={() => setShowDebugInfo(!showDebugInfo)} 
              className="debug-button"
              style={{ marginRight: '10px' }}
            >
              {showDebugInfo ? 'Hide Debug' : 'Show Debug'}
            </button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>

        {/* Debug info section */}
        {showDebugInfo && (
          <div className="debug-info">
            <h3>Debug Information</h3>
            <div className="debug-actions">
              <button onClick={resetToDefaults} className="reset-button">
                Reset to Default Data
              </button>
              <button onClick={clearStorage} className="clear-button">
                Clear All Storage
              </button>
              <button onClick={handleRepairAssociations} className="repair-button">
                Fix Team-Project Links
              </button>
              <button onClick={() => window.location.reload()} className="reload-button">
                Reload Page
              </button>
            </div>
            
            <div className="storage-info">
              <h4>Storage Usage</h4>
              <ul>
                {storageInfo.map((item) => (
                  <li key={item.key}>
                    {item.key}: {item.size.toFixed(2)} KB
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="data-preview">
              <h4>Projects Data ({projects.length})</h4>
              <pre>{JSON.stringify(projects, null, 2)}</pre>
            </div>
            
            <div className="data-preview">
              <h4>Team Members Data ({teamMembers.length})</h4>
              <pre>{JSON.stringify(teamMembers, null, 2)}</pre>
            </div>
            
            <div className="data-preview">
              <h4>News Data ({newsItems.length})</h4>
              <pre>{JSON.stringify(newsItems, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Main dashboard cards */}
        <div className="admin-stats">
          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/projects')}
          >
            <div className="admin-card-header">
              <h2>Projects</h2>
              <Link 
                to="/admin/projects/new" 
                className="card-action-button"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{projects.length}</p>
              <p>Research projects</p>
            </div>
          </div>

          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/team')}
          >
            <div className="admin-card-header">
              <h2>Team</h2>
              <Link 
                to="/admin/team/new"
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{teamMembers.length}</p>
              <p>Team members</p>
            </div>
          </div>

          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/news')}
          >
            <div className="admin-card-header">
              <h2>News</h2>
              <Link 
                to="/admin/news/new"
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{newsItems.length}</p>
              <p>News items</p>
            </div>
          </div>

          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/publications')}
          >
            <div className="admin-card-header">
              <h2>Publications</h2>
              <Link 
                to="/admin/publications/new"
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{publications.length}</p>
              <p>Scientific publications</p>
            </div>
          </div>

          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/collaborators')}
          >
            <div className="admin-card-header">
              <h2>Collaborators</h2>
              <Link 
                to="/admin/collaborators/new"
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{collaborators.length}</p>
              <p>Academic & industry partners</p>
            </div>
          </div>

          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/software')}
          >
            <div className="admin-card-header">
              <h2>Software</h2>
              <Link 
                to="/admin/software/new" 
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{software.length}</p>
              <p>Software projects</p>
            </div>
          </div>

          {/* New Job Openings Card */}
          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/jobs')}
          >
            <div className="admin-card-header">
              <h2>Job Openings</h2>
              <Link 
                to="/admin/jobs/new" 
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                + Add New
              </Link>
            </div>
            <div className="admin-card-content">
              <p className="admin-stats-number">{jobOpenings.length}</p>
              <p>Open positions</p>
            </div>
          </div>

          {/* Featured Content Card - Updated to be cleaner */}
          <div 
            className="admin-card"
            onClick={() => handleNavigate('/admin/featured')}
          >
            <div className="admin-card-header">
              <h2>Featured Content</h2>
              <Link 
                to="/admin/featured" 
                className="card-action-button"
                onClick={(e) => e.stopPropagation()}
              >
                Manage
              </Link>
            </div>
            <div className="admin-card-content featured-card-content">
              {/* Show only the featured items indicators */}
              <div className="featured-items-indicators">
                {featuredItems.projectId && (
                  <span className="featured-indicator">
                    <strong>Project:</strong> {projects.find(p => p.id === featuredItems.projectId)?.title.substring(0, 20)}
                    {projects.find(p => p.id === featuredItems.projectId)?.title.length! > 20 ? "..." : ""}
                  </span>
                )}
                {featuredItems.newsItemId && (
                  <span className="featured-indicator">
                    <strong>News:</strong> {newsItems.find(n => n.id === featuredItems.newsItemId)?.title.substring(0, 20)}
                    {newsItems.find(n => n.id === featuredItems.newsItemId)?.title.length! > 20 ? "..." : ""}
                  </span>
                )}
                {featuredItems.publicationId && (
                  <span className="featured-indicator">
                    <strong>Publication:</strong> {publications.find(p => p.id === featuredItems.publicationId)?.title.substring(0, 20)}
                    {publications.find(p => p.id === featuredItems.publicationId)?.title.length! > 20 ? "..." : ""}
                  </span>
                )}
                
                {/* Show message if no items are featured */}
                {!featuredItems.projectId && !featuredItems.newsItemId && !featuredItems.publicationId && (
                  <span className="no-featured-items">No items currently featured</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
