import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import Layout from '../../components/Layout';

const TeamMembersList: React.FC = () => {
  const { teamMembers } = useContent();
  
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Manage Team Members</h1>
          <Link to="/admin" className="back-link">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="admin-action-header">
          <h2>Team Members</h2>
          <Link to="/admin/team/new" className="add-button">
            Add New Team Member
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
                <div className="admin-item-color" style={{ backgroundColor: member.color }}></div>
                <div className="admin-item-title">{member.name}</div>
                <div className="admin-item-category">{member.role}</div>
                <div className="admin-item-actions">
                  <Link to={`/admin/team/edit/${member.id}`} className="edit-button">
                    Edit
                  </Link>
                  <Link to={`/team/${member.id}`} className="view-button">
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

export default TeamMembersList;
