import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import Layout from '../components/Layout';
import { TeamMember } from '../data/team';
import { Publication } from '../data/publications';
import { Project } from '../data/projects';

const TeamMemberPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    getTeamMemberById, 
    projects, 
    publications,
    getPublicationById 
  } = useContent();
  
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [memberPublications, setMemberPublications] = useState<Publication[]>([]);
  const [memberProjects, setMemberProjects] = useState<Project[]>([]);

  // Debug flag
  const [debug, setDebug] = useState(false);

  // Function to load publications - moved to separate function for reuse
  const loadPublications = useCallback(() => {
    if (!teamMember) return;
    
    const memberPubs: Publication[] = [];
    console.log(`Reloading publications for ${teamMember.name}`);
    
    // 1. Direct matching by publication IDs in member.publications array
    if (teamMember.publications && teamMember.publications.length > 0) {
      console.log(`Found ${teamMember.publications.length} direct publication references:`, teamMember.publications);
      teamMember.publications.forEach(pubId => {
        const pub = publications.find(p => p.id === pubId);
        if (pub) {
          memberPubs.push(pub);
          console.log(`Added publication by direct reference: ${pub.title}`);
        } else {
          console.warn(`Referenced publication ${pubId} not found`);
        }
      });
    }
    
    // 2. Name-based matching using author list
    const nameParts = teamMember.name.split(' ');
    const lastName = nameParts[nameParts.length - 1];
    const firstInitial = nameParts[0][0];
    const expectedAuthorFormats = [
      `${lastName}, ${firstInitial}`,       // "Smith, J"
      `${lastName}, ${firstInitial}.`,      // "Smith, J."
      `${firstInitial}. ${lastName}`,       // "J. Smith"
      `${nameParts[0]} ${lastName}`,        // "John Smith"
      lastName                              // Just the last name
    ];
    
    publications.forEach(pub => {
      // Skip if we already have this publication
      if (memberPubs.some(p => p.id === pub.id)) return;
      
      // Check if any author name matches expected formats
      const isAuthor = pub.authors.some(author => {
        return expectedAuthorFormats.some(format => 
          author.toLowerCase().includes(format.toLowerCase())
        );
      });
      
      if (isAuthor) {
        memberPubs.push(pub);
      }
    });
    
    // 3. Get publications from projects the member is part of
    memberProjects.forEach(project => {
      const projectPubs = publications.filter(pub => pub.projectId === project.id);
      projectPubs.forEach(pub => {
        if (!memberPubs.some(p => p.id === pub.id)) {
          memberPubs.push(pub);
        }
      });
    });
    
    // Sort publications by year (newest first)
    memberPubs.sort((a, b) => b.year - a.year);
    
    // Force component to re-render with the publications
    setMemberPublications([...memberPubs]);
    
  }, [teamMember, publications, memberProjects]);

  // Initial data load
  useEffect(() => {
    if (id) {
      const member = getTeamMemberById(id);
      if (member) {
        setTeamMember(member);
        
        // Get projects the team member is part of
        const relatedProjects = projects.filter(project => 
          project.team.includes(member.name)
        );
        setMemberProjects(relatedProjects);
      }
    }
  }, [id, getTeamMemberById, projects]);
  
  // Load publications whenever member or publications change
  useEffect(() => {
    loadPublications();
  }, [teamMember, publications, loadPublications]);
  
  // Add effect for publication update events
  useEffect(() => {
    // Refresh data when publications are updated elsewhere
    const handlePublicationUpdate = () => {
      console.log("Publication update detected, refreshing data");
      loadPublications();
    };
    
    window.addEventListener('publication-updated', handlePublicationUpdate);
    return () => {
      window.removeEventListener('publication-updated', handlePublicationUpdate);
    };
  }, [loadPublications]);
  
  if (!teamMember) {
    return (
      <Layout>
        <div className="container">
          <h1>Team Member Not Found</h1>
          <p>Sorry, we couldn't find the team member you're looking for.</p>
          <Link to="/team" className="button">Back to Team</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="team-member-profile">
        <div className="profile-header" style={{ borderColor: teamMember.color }}>
          <div className="profile-image-container">
            {teamMember.imageUrl && (
              <img 
                src={teamMember.imageUrl} 
                alt={teamMember.name} 
                className="profile-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            {(!teamMember.imageUrl || teamMember.imageUrl === '') && (
              <div 
                className="profile-image-placeholder"
                style={{ backgroundColor: teamMember.color }}
              >
                {teamMember.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{teamMember.name}</h1>
            <h2>{teamMember.role}</h2>
            {teamMember.email && (
              <p className="profile-email">
                <strong>Email:</strong> <a href={`mailto:${teamMember.email}`}>{teamMember.email}</a>
              </p>
            )}
          </div>
        </div>
        
        <div className="profile-content">
          <section className="profile-bio">
            <h2>Biography</h2>
            <p>{teamMember.bio}</p>
          </section>
          
          {/* Toggle debug button */}
          <button 
            onClick={() => setDebug(!debug)} 
            style={{ 
              padding: '5px 10px', 
              margin: '10px 0', 
              fontSize: '12px', 
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {debug ? 'Hide Debug' : 'Show Debug'}
          </button>
          
          {/* Debug info */}
          {debug && (
            <div style={{background: '#f5f5f5', padding: '10px', margin: '10px 0', fontSize: '12px', border: '1px solid #ddd', borderRadius: '4px'}}>
              <p>Debug: Found {memberPublications.length} publications for {teamMember.name}</p>
              <p>Team member ID: {id}</p>
              <p>Publications array: {memberPublications.map(p => p.title).join(", ")}</p>
              {teamMember.publications && (
                <p>Direct publication references: {teamMember.publications.join(', ')}</p>
              )}
            </div>
          )}
          
          {memberProjects.length > 0 && (
            <section className="profile-projects">
              <h2>Projects</h2>
              <div className="projects-grid">
                {memberProjects.map(project => (
                  <Link 
                    to={`/projects/${project.id}`} 
                    key={project.id}
                    className="project-card-mini"
                    style={{ borderLeft: `4px solid ${project.color}` }}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description.substring(0, 100)}...</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Always render publications section, even if empty */}
          <section className="profile-publications">
            <h2>Publications ({memberPublications.length})</h2>
            {memberPublications.length > 0 ? (
              <ul className="publications-list">
                {memberPublications.map(publication => (
                  <li key={publication.id} className="publication-item">
                    <div className="publication-year">{publication.year}</div>
                    <div className="publication-details">
                      <h3 className="publication-title">
                        {publication.url ? (
                          <a href={publication.url} target="_blank" rel="noopener noreferrer">
                            {publication.title}
                          </a>
                        ) : (
                          publication.title
                        )}
                      </h3>
                      <p className="publication-authors">{publication.authors.join(', ')}</p>
                      <p className="publication-journal">{publication.journal}</p>
                      {publication.doi && (
                        <p className="publication-doi">
                          DOI: <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                            {publication.doi}
                          </a>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No publications found for this team member.</p>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMemberPage;
