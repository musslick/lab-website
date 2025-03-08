import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import '../styles/styles.css';

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTeamMemberById, projects } = useContent();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [memberProjects, setMemberProjects] = useState<any[]>([]);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundMember = getTeamMemberById(id);
      
      if (foundMember) {
        setMember(foundMember);
        
        // Projects can be found in two ways:
        // 1. By checking if the member's name is in project.team array (most reliable)
        // 2. By checking if project.id is in member.projects array (if it exists)
        
        // First look for projects that include this member in their team
        const relatedProjectsByName = projects.filter(p => 
          p.team.includes(foundMember.name)
        );
        
        // If we found projects by name, use those
        if (relatedProjectsByName.length > 0) {
          setMemberProjects(relatedProjectsByName);
        }
        // Otherwise, fall back to the member.projects array if it exists
        else {
          const memberProjectIds = foundMember.projects ?? [];
          if (memberProjectIds.length > 0) {
            const relatedProjectsById = projects.filter(p => 
              memberProjectIds.includes(p.id)
            );
            setMemberProjects(relatedProjectsById);
          }
        }
      }
      
      setLoading(false);
      // Reset the image error state when loading a new member
      setImageError(false);
    }
  }, [id, getTeamMemberById, projects]);

  if (loading) {
    return <div>Loading team member details...</div>;
  }

  if (!member) {
    return <div>Team member not found</div>;
  }

  // More robust check for valid image URL
  const hasValidImage = Boolean(
    member.imageUrl && 
    member.imageUrl.trim() !== '' && 
    !member.imageUrl.endsWith('undefined') && 
    !member.imageUrl.endsWith('null') &&
    !imageError
  );

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
          {hasValidImage ? (
            <img 
              src={member.imageUrl} 
              alt={member.name}
              className="team-member-large-image"
              onError={() => {
                console.log(`Image failed to load for ${member.name} detail page`);
                setImageError(true);
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
                  <p>{project.category}</p>
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
