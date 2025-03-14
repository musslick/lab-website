import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import '../styles/styles.css';

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTeamMemberById, getProjectById } = useContent();
  const [member, setMember] = useState(id ? getTeamMemberById(id) : undefined);
  const [memberProjects, setMemberProjects] = useState<any[]>([]);

  useEffect(() => {
    const updateMemberData = () => {
      if (id) {
        const updatedMember = getTeamMemberById(id);
        setMember(updatedMember);
        
        // Update projects list
        if (updatedMember?.projects) {
          const projects = updatedMember.projects
            .map(projectId => getProjectById(projectId))
            .filter(project => project !== undefined);
          setMemberProjects(projects);
        }
      }
    };

    // Initial data load
    updateMemberData();

    // Listen for project updates
    const handleProjectUpdate = () => {
      updateMemberData();
    };

    window.addEventListener('project-updated', handleProjectUpdate);
    
    return () => {
      window.removeEventListener('project-updated', handleProjectUpdate);
    };
  }, [id, getTeamMemberById, getProjectById]);

  if (!member) {
    return <div>Team member not found</div>;
  }

  return (
    <div className="team-member-detail-page">
      <div className="team-member-header">
        <div 
          className="team-member-color-header"
          style={{ background: member.color }}
        ></div>
      </div>

      <div className="team-member-profile">
        <div className="team-member-profile-image">
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name}
              className="team-member-large-image"
              onError={() => {
                console.log(`Image failed to load for ${member.name} detail page`);
              }}
            />
          ) : (
            <div 
              className="team-member-image team-member-large-color-circle"
              style={{ backgroundColor: member.color }}
              aria-label={`${member.name}'s profile color`}
            />
          )}
        </div>

        <div className="team-member-profile-info">
          <h1>{member.name}</h1>
          <h2 className="team-member-role">{member.role}</h2>
          
          {member.email && (
            <div className="team-member-contact">
              <a href={`mailto:${member.email}`} className="team-member-email">
                {member.email}
              </a>
            </div>
          )}
          
          <div className="team-member-bio-extended">
            <p>{member.bio}</p>
          </div>
        </div>
      </div>

      {memberProjects.length > 0 && (
        <div className="team-member-projects-section">
          <h2>Projects</h2>
          <div className="team-member-projects-grid">
            {memberProjects.map(project => (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className="team-member-project-card"
              >
                <div 
                  className="project-color-indicator"
                  style={{ background: project.color }}
                ></div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberDetail;
