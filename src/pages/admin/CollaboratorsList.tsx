import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';

const CollaboratorsList: React.FC = () => {
  const { collaborators } = useContent();
  
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Manage Collaborators</h1>
          <Link to="/admin" className="back-link">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="admin-action-header">
          <h2>Collaborators</h2>
          <Link to="/admin/collaborators/new" className="add-button">
            Add New Collaborator
          </Link>
        </div>
        
        <div className="admin-list">
          {collaborators.length === 0 ? (
            <div className="empty-state">
              <p>No collaborators yet. Add your first collaborator to get started!</p>
            </div>
          ) : (
            collaborators.map(collaborator => (
              <div key={collaborator.id} className="admin-list-item">
                <div className="admin-item-title">{collaborator.name}</div>
                <div className="admin-item-category">
                  <a 
                    href={collaborator.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="collaborator-link"
                  >
                    {collaborator.url}
                  </a>
                </div>
                <div className="admin-item-actions">
                  <Link to={`/admin/collaborators/edit/${collaborator.id}`} className="edit-button">
                    Edit
                  </Link>
                  <a 
                    href={collaborator.url} 
                    className="view-button" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CollaboratorsList;
