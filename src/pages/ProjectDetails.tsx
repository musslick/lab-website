import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { teamMembers } from '../data/team';
import '../styles/styles.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="project-details">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects">Back to projects</Link>
      </div>
    );
  }
  
  // Find team members associated with the project
  const projectTeam = project.team.map(memberName => {
    return teamMembers.find(m => m.name === memberName);
  }).filter(Boolean);
  
  return (
    <div className="project-details">
      <div 
        className="project-color-header"
        style={{ background: project.color }}
      >
        <h1>{project.title}</h1>
      </div>
      
      <section className="project-section">
        <h2>Overview</h2>
        <p>{project.description}</p>
      </section>
      
      <section className="project-section">
        <h2>Team Members</h2>
        <div className="project-team-grid">
          {projectTeam.map((member, index) => (
            member && (
              <Link 
                to={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`} 
                className="project-team-member"
                key={index}
              >
                <div 
                  className="team-color-indicator"
                  style={{ backgroundColor: member.color }}
                ></div>
                <span>{member.name}</span>
              </Link>
            )
          ))}
        </div>
      </section>
      
      {project.publications && project.publications.length > 0 && (
        <section className="project-section">
          <h2>Publications</h2>
          <ul>
            {project.publications.map((pub, index) => (
              <li key={index}>{pub}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
