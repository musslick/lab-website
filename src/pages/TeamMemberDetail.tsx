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
  const [publicationsByYear, setPublicationsByYear] = useState<Record<string, any[]>>({});

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
          
          // Group publications by year
          const publicationsByYear = sortedPublications.reduce((acc, publication) => {
            const year = publication.year.toString();
            if (!acc[year]) {
              acc[year] = [];
            }
            acc[year].push(publication);
            return acc;
          }, {} as Record<string, typeof sortedPublications>);
          
          setPublicationsByYear(publicationsByYear);
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
          
          {/* Contact information section */}
          <div className="team-member-contact">
            {member.email && (
              <div className="contact-item">
                <span className="contact-icon">✉️ </span>
                <a href={`mailto:${member.email}`} className="team-member-email">
                  Mail
                </a>
              </div>
            )}
            
            {member.github && (
              <div className="contact-item">
                <span className="contact-icon">🐙 </span>
                <a 
                  href={`https://github.com/${member.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="team-member-github"
                >
                  GitHub
                </a>
              </div>
            )}
            
            {member.cvUrl && (
              <div className="contact-item">
                <span className="contact-icon">📄 </span>
                <a 
                  href={member.cvUrl.startsWith('data:') 
                    ? URL.createObjectURL(dataURLtoBlob(member.cvUrl)) 
                    : member.cvUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="team-member-cv"
                  download={member.cvUrl.startsWith('data:') ? `${member.name.replace(/\s+/g, '_')}_CV.pdf` : false}
                >
                  CV
                </a>
              </div>
            )}
          </div>
          
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
      {Object.keys(publicationsByYear).length > 0 && (
        <div className="team-member-publications-section">
          <h2>Publications</h2>
          <div className="publications-by-year">
            {Object.entries(publicationsByYear)
              .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
              .map(([year, yearPublications]) => (
                <div key={year} className="publication-year-group">
                  <h3 className="year-heading">{year}</h3>
                  <div className="publications-list">
                    {yearPublications.map((publication) => (
                      <div key={publication.id} className="publication-item">
                        <h4 className="publication-title">
                          {publication.url ? (
                            <a 
                              href={publication.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {publication.title}
                            </a>
                          ) : (
                            publication.title
                          )}
                        </h4>
                        <p className="publication-authors">{publication.authors.join(', ')}</p>
                        <p className="publication-journal">
                          <em>{publication.journal}</em>, {publication.year}
                        </p>
                        {publication.doi && (
                          <p className="publication-doi">
                            DOI: <a 
                              href={`https://doi.org/${publication.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {publication.doi}
                            </a>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to convert data URL to a Blob
function dataURLtoBlob(dataURL: string): Blob {
  // Split the data URL at the comma to separate the MIME type from the base64 data
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const base64 = parts[1];
  
  // Convert base64 to raw binary data
  const binaryString = atob(base64);
  
  // Create an array buffer of the right size
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  
  // Fill the array buffer with the binary data
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Create a Blob from the array buffer with the correct MIME type
  return new Blob([bytes], { type: mime });
}

export default TeamMemberDetail;
