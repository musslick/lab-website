import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';

const ProjectsList: React.FC = () => {
  const { projects } = useContent();
  
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Manage Projects</h1>
          <Link to="/admin" className="back-link">
            Back to Dashboard
          </Link>
        </div>
        
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
                <div 
                  className="admin-item-color-gradient" 
                  style={{ background: project.color }}
                ></div>
                <div className="admin-item-title">{project.title}</div>
                <div className="admin-item-category">{project.category}</div>
                <div className="admin-item-actions">
                  <Link to={`/admin/projects/edit/${project.id}`} className="edit-button">
                    Edit
                  </Link>
                  <Link to={`/projects/${project.id}`} className="view-button">
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsList;
