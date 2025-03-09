import React from 'react';
import { TeamMember } from '../components/Components';
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
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id}
            id={member.id}
            name={member.name}
            bio={member.role} // Changed from bio to role
            imageUrl={member.imageUrl}
            color={member.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;