import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';
import { cleanupStorage, resetNewsItems, repairTeamProjectAssociations } from '../../utils/debugStorage';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { projects, teamMembers, newsItems, resetToDefaults } = useContent();
  const [activePage, setActivePage] = useState<'overview' | 'projects' | 'team' | 'news'>('overview');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [storageInfo, setStorageInfo] = useState<{ key: string; size: number }[]>([]);
  
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

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  const clearStorage = () => {
    if (window.confirm('Are you sure you want to clear all localStorage data? This cannot be undone.')) {
      localStorage.clear();
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

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        </div>

        <div className="admin-nav">
          <button 
            className={activePage === 'overview' ? 'active' : ''}
            onClick={() => setActivePage('overview')}
          >
            Overview
          </button>
          <button 
            className={activePage === 'projects' ? 'active' : ''}
            onClick={() => setActivePage('projects')}
          >
            Manage Projects
          </button>
          <button 
            className={activePage === 'team' ? 'active' : ''}
            onClick={() => setActivePage('team')}
          >
            Manage Team
          </button>
          <button 
            className={activePage === 'news' ? 'active' : ''}
            onClick={() => setActivePage('news')}
          >
            Manage News
          </button>
        </div>

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

        {activePage === 'overview' && (
          <div className="admin-overview">
            <div className="stats-card">
              <h3>Projects</h3>
              <p className="stats-number">{projects.length}</p>
              <Link to="/admin/projects/new" className="action-link">
                Add New Project
              </Link>
            </div>
            <div className="stats-card">
              <h3>Team Members</h3>
              <p className="stats-number">{teamMembers.length}</p>
              <Link to="/admin/team/new" className="action-link">
                Add Team Member
              </Link>
            </div>
            <div className="stats-card">
              <h3>News Items</h3>
              <p className="stats-number">{newsItems.length}</p>
              <Link to="/admin/news/new" className="action-link">
                Add News Item
              </Link>
            </div>
          </div>
        )}

        {activePage === 'projects' && (
          <div className="admin-projects">
            <div className="admin-action-header">
              <h2>Projects</h2>
              <Link to="/admin/projects/new" className="add-button">
                Add New Project
              </Link>
            </div>
            <div className="admin-list">
              {projects.length === 0 ? (
                <div className="empty-state">
                  <p>No projects yet. Add your first project to get started!</p>
                </div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="admin-list-item">
                    <div className="admin-item-title">{project.title}</div>
                    <div className="admin-item-category">{project.category}</div>
                    <div className="admin-item-actions">
                      <Link to={`/admin/projects/edit/${project.id}`} className="edit-button">
                        Edit
                      </Link>
                      <Link to={`/projects/${project.id}`} className="view-button" target="_blank">
                        View
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activePage === 'team' && (
          <div className="admin-team">
            <div className="admin-action-header">
              <h2>Team Members</h2>
              <Link to="/admin/team/new" className="add-button">
                Add Team Member
              </Link>
            </div>
            <div className="admin-list">
              {teamMembers.length === 0 ? (
                <div className="empty-state">
                  <p>No team members yet. Add your first team member to get started!</p>
                </div>
              ) : (
                teamMembers.map(member => (
                  <div key={member.id} className="admin-list-item">
                    <div className="admin-item-title">{member.name}</div>
                    <div className="admin-item-category">{member.role}</div>
                    <div className="admin-item-actions">
                      <Link to={`/admin/team/edit/${member.id}`} className="edit-button">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activePage === 'news' && (
          <div className="admin-news">
            <div className="admin-action-header">
              <h2>News Items</h2>
              <div>
                <button 
                  onClick={handleCleanupNewsItems} 
                  style={{marginRight: '10px'}}
                  className="cleanup-button"
                >
                  Cleanup News Items
                </button>
                <button 
                  onClick={handleResetNewsItems}
                  style={{marginRight: '10px'}}
                  className="reset-button"
                >
                  Reset News Items
                </button>
                <Link to="/admin/news/new" className="add-button">
                  Add News Item
                </Link>
              </div>
            </div>
            {newsItems.length === 0 ? (
              <div className="empty-state">
                <p>No news items yet. Add your first news item to get started!</p>
              </div>
            ) : (
              <>
                <div className="debug-info" style={{marginBottom: '20px', fontSize: '12px'}}>
                  <strong>Total News Items:</strong> {newsItems.length}
                </div>
                <div className="admin-list">
                  {newsItems
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(item => (
                      <div key={item.id} className="admin-list-item">
                        <div className="admin-item-title">
                          {item.title} {item.featured && <span className="featured-badge">Featured</span>}
                        </div>
                        <div className="admin-item-category">
                          <span className="news-date">{formatDate(item.date)}</span>
                          <span className="news-author">By {item.author}</span>
                        </div>
                        <div className="admin-item-actions">
                          <Link to={`/admin/news/edit/${item.id}`} className="edit-button">
                            Edit
                          </Link>
                          <Link to="/feed" className="view-button" target="_blank">
                            View All
                          </Link>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
