import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import '../styles/styles.css';

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTeamMemberById, getProjectById, publications } = useContent();
  const [member, setMember] = useState(id ? getTeamMemberById(id) : undefined);
  const [memberProjects, setMemberProjects] = useState<any[]>([]);
  const [memberPublications, setMemberPublications] = useState<any[]>([]);

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
        
        // Find publications where this team member is an author
        if (updatedMember) {
          // Get the last name of the team member for matching in publications
          const lastName = updatedMember.name.split(' ').pop()?.toLowerCase() || '';
          
          // Filter publications where the member appears as an author
          const relatedPublications = publications.filter(publication => 
            publication.authors.some(author => 
              author.toLowerCase().includes(lastName)
            )
          );
          
          // Sort by year (newest first)
          const sortedPublications = [...relatedPublications].sort((a, b) => b.year - a.year);
          setMemberPublications(sortedPublications);
        }
      }
    };

    // Initial data load
    updateMemberData();

    // Listen for project updates
    const handleProjectUpdate = () => {
      updateMemberData();
    };

    // Listen for publication updates too
    const handlePublicationUpdate = () => {
      updateMemberData();
    };

    window.addEventListener('project-updated', handleProjectUpdate);
    window.addEventListener('publication-updated', handlePublicationUpdate);
    
    return () => {
      window.removeEventListener('project-updated', handleProjectUpdate);
      window.removeEventListener('publication-updated', handlePublicationUpdate);
    };
  }, [id, getTeamMemberById, getProjectById, publications]);

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

      {/* Publications section */}
      {memberPublications.length > 0 && (
        <div className="team-member-publications-section">
          <h2>Publications</h2>
          <div className="publications-list">
            {memberPublications.map(publication => (
              <div key={publication.id} className="publication-item">
                <h3>{publication.title}</h3>
                <p className="publication-authors">{publication.authors.join(', ')}</p>
                <p className="publication-journal">
                  <span className="journal-name">{publication.journal}</span>, {publication.year}
                </p>
                {publication.doi && (
                  <p className="publication-doi">
                    DOI: <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                      {publication.doi}
                    </a>
                  </p>
                )}
                {publication.url && !publication.doi && (
                  <p className="publication-url">
                    <a href={publication.url} target="_blank" rel="noopener noreferrer">
                      View Publication
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberDetail;
