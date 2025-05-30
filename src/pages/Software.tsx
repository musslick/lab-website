import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import Layout from '../components/Layout';
import '../styles/styles.css';
import { Software as SoftwareType } from '../data/software';
import { Project } from '../data/projects';
import { Publication } from '../data/publications';
import { TeamMember } from '../data/team';

const Software: React.FC = () => {
  const { software, getProjectById, getPublicationById, teamMembers } = useContent();
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Get unique technologies
  const allTechnologies = software.flatMap(item => item.technologies || []);
  const uniqueTechnologies = ['All', ...Array.from(new Set(allTechnologies))];

  // Filter software by selected technology
  const filteredSoftware = selectedTech === 'All'
    ? software
    : software.filter(item => item.technologies?.includes(selectedTech));

  // Helper function to get related projects for a software item
  const getRelatedProjects = (item: SoftwareType): Project[] => {
    // Check if it has projectIds array
    if (item.projectIds && item.projectIds.length > 0) {
      return item.projectIds
        .map((id: string) => getProjectById(id))
        .filter((project): project is Project => project !== undefined);
    }
    // Backward compatibility: check single projectId
    else if (item.projectId) {
      const project = getProjectById(item.projectId);
      return project ? [project] : [];
    }
    return [];
  };

  // Helper function to get related publications for a software item
  const getRelatedPublications = (item: SoftwareType): Publication[] => {
    if (item.publicationIds && item.publicationIds.length > 0) {
      return item.publicationIds
        .map((id: string) => getPublicationById(id))
        .filter((publication): publication is Publication => publication !== undefined);
    }
    return [];
  };

  // Helper function to find a team member by name
  const findTeamMemberByName = (name: string): TeamMember | undefined => {
    return teamMembers.find(member => member.name === name);
  };

  // Helper function to render developer names with links if they're team members
  const renderDevelopers = (developers: string[]) => {
    return developers.map((developer, index) => {
      const teamMember = findTeamMemberByName(developer);
      
      // If developer is a team member, render a link; otherwise render plain text
      const developerElement = teamMember ? (
        <Link key={teamMember.id} to={`/team/${teamMember.id}`} className="team-member-link">
          {developer}
        </Link>
      ) : (
        <span key={`dev-${index}`}>{developer}</span>
      );

      // Add comma separator if not the last item
      return (
        <React.Fragment key={`dev-fragment-${index}`}>
          {developerElement}
          {index < developers.length - 1 ? ', ' : ''}
        </React.Fragment>
      );
    });
  };

  return (
    <Layout>
      <div className="projects-page">
        <div className="projects-header">
          <h1>Scientific Software</h1>
          <p>We co-develop and maintain several open-source Python (pip) packages for automating various aspects of empirical research.</p>
        </div>

        <div className="tag-filter">
          <h3>Filter by Technology</h3>
          <div className="tag-list">
            {uniqueTechnologies.map(tech => (
              <button
                key={tech}
                className={`tag-button ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="software-grid">
          {filteredSoftware.length > 0 ? (
            filteredSoftware.map(item => {
              // Get related projects and publications for this software
              const relatedProjects = getRelatedProjects(item);
              const relatedPublications = getRelatedPublications(item);

              return (
                <div key={item.id} className="software-card">
                  <div className="software-header">
                    <h3 className="software-name">{item.name}</h3>
                    {item.featured && <span className="software-featured">Featured</span>}
                  </div>

                  {item.imageUrl && (
                    <div className="software-image">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                        onError={(e) => {
                          console.error(`Failed to load software image: ${item.imageUrl}`);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <p className="software-description">{item.description}</p>

                  <div className="software-tech-tags">
                    {item.technologies.map(tech => (
                      <span
                        key={tech}
                        className="software-tech-tag"
                        onClick={() => setSelectedTech(tech)}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="software-developed-by">
                    <strong>Contributing Lab Members:</strong> {renderDevelopers(item.developers)}
                  </div>

                  <div className="software-meta">
                    {item.releaseDate && (
                      <span className="software-date">
                        Released: {new Date(item.releaseDate).toLocaleDateString()}
                      </span>
                    )}
                    {item.lastUpdate && (
                      <span className="software-date">
                        Last Updated: {new Date(item.lastUpdate).toLocaleDateString()}
                      </span>
                    )}
                    <span className="software-license">License: {item.license}</span>
                  </div>

                  <div className="software-links">
                    <a
                      href={item.repoUrl}
                      className="software-link repo-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repository
                    </a>

                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        className="software-link demo-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </a>
                    )}

                    {item.documentationUrl && (
                      <a
                        href={item.documentationUrl}
                        className="software-link docs-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documentation
                      </a>
                    )}
                  </div>

                  {relatedProjects.length > 0 && (
                    <div className="software-related-project">
                      <div className="software-relation-label">
                        Related Research {relatedProjects.length > 1 ? 'Areas' : 'Area'}:
                      </div>
                      <ul className="related-projects-list">
                        {relatedProjects.map((project: Project) => (
                          <li key={project.id} className="related-project-item">
                            <Link to={`/projects/${project.id}`} className="related-project-link">
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {relatedPublications.length > 0 && (
                    <div className="software-related-publication">
                      <div className="software-relation-label">
                        Related {relatedPublications.length > 1 ? 'Publications' : 'Publication'}:
                      </div>
                      <ul className="related-publications-list">
                        {relatedPublications.map((publication: Publication) => (
                          <li key={publication.id} className="related-publication-item">
                            {publication.url ? (
                              <a 
                                href={publication.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="related-publication-link"
                              >
                                {publication.title}
                              </a>
                            ) : (
                              <span className="related-publication-title">{publication.title}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-software">
              <p>No software found for the selected technology.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Software;
