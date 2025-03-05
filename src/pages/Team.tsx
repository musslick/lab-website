import React from 'react';
import { teamMembers } from '../data/team';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Team: React.FC = () => {
  return (
    <div className="team-page">
      <div className="team-gradient-banner">
        <div className="banner-content">
          <h2>Our Research Team</h2>
          <p>Meet the people behind our groundbreaking work</p>
        </div>
      </div>

      <p className="team-intro">
        Our lab brings together experts from various disciplines including neuroscience, 
        computer science, psychology, and data science to advance our understanding of 
        the mind and brain through innovative research approaches.
      </p>

      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <div 
              className="team-member-color-header" 
              style={{ backgroundColor: member.color }}
            ></div>
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="team-member-image"
            />
            <div className="team-member-info">
              <h3 className="team-member-name">{member.name}</h3>
              <h4>{member.role}</h4>
              <p className="team-member-bio">{member.bio}</p>
              
              {member.projects && member.projects.length > 0 && (
                <div className="member-projects">
                  <h4>Projects:</h4>
                  <div className="member-project-list">
                    {member.projects.map((projectId, idx) => {
                      const matchingProject = require('../data/projects').projects.find(
                        (p: any) => p.id === projectId
                      );
                      
                      return matchingProject ? (
                        <Link 
                          to={`/projects/${projectId}`} 
                          className="member-project-chip"
                          style={{background: matchingProject.color}}
                          key={idx}
                        >
                          {matchingProject.title}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;