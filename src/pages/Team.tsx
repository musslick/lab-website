import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

const Team: React.FC = () => {
  const { teamMembers } = useContent();

  return (
    <div className="team-page">
      <div className="projects-header">
        <h1>Our Research Team</h1>
        <p>Meet the people behind our groundbreaking work</p>
      </div>
      
      <div className="team-intro">
        <p>
          Our interdisciplinary team consists of researchers with backgrounds in neuroscience, 
          computer science, psychology, and engineering. We work collaboratively to advance our 
          understanding of the mind and brain through innovative research methods.
        </p>
      </div>
      
      <div className="team-container">
        {/* Join Us Card */}
        <Link to="/join-us" className="team-member-card join-us-card">
          <div className="join-us-icon">+</div>
          <h3 className="join-us-title">Join Us!</h3>
          <p className="join-us-text">View our open positions and application process</p>
        </Link>
        
        {/* Existing Team Members */}
        {teamMembers.map(member => (
          <Link key={member.id} to={`/team/${member.id}`} className="team-member-card">
            {member.imageUrl ? (
              <div className="team-member-image" style={{ backgroundImage: `url(${member.imageUrl})` }}></div>
            ) : (
              <div className="team-member-image-placeholder" style={{ backgroundColor: member.color }}></div>
            )}
            <div className="team-member-info">
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Team;