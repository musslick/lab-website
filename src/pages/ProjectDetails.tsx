import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { TopNav, Footer } from '../components/Components';
import { createProjectGradient, getTopicColorsFromProject } from '../utils/colorUtils';
import '../styles/styles.css';

// Function to render categories, handling both string and array formats
const renderCategories = (categories: string | string[]) => {
  if (Array.isArray(categories)) {
    return categories.join(', ');
  }
  return categories;
};

// Function to render disciplines, handling both string and array formats
const renderDisciplines = (disciplines: string | string[]) => {
  if (Array.isArray(disciplines)) {
    return disciplines.join(', ');
  }
  return disciplines;
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers, publications, software } = useContent();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectTeam, setProjectTeam] = useState<any[]>([]);
  const [projectSoftware, setProjectSoftware] = useState<any[]>([]);

  // Store the colors for creating dynamic gradients
  const [topicColors, setTopicColors] = useState<string[]>([]);
  const [baseColor] = useState<string>('#00AAFF'); // Lab blue color

  // Mouse interaction states
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isFrozen, setIsFrozen] = useState(false);
  const colorHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the project by ID
    const currentProject = projects.find(p => p.id === id);

    if (currentProject) {
      setProject(currentProject);

      // Extract or generate topic colors for the dynamic gradient
      let colors: string[] = [];

      // If the project has topicsWithColors, use those
      if (currentProject.topicsWithColors && currentProject.topicsWithColors.length > 0) {
        colors = currentProject.topicsWithColors.map((t: any) => t.color);
      }
      // Otherwise, extract colors from the gradient string
      else if (currentProject.color && typeof currentProject.color === 'string') {
        const gradientMatch = currentProject.color.match(/rgba?\([\d\s,.]+\)|#[a-f\d]+/gi) || [];
        if (gradientMatch.length > 0) {
          colors = gradientMatch;
        }
      }

      // Always make sure we have at least the base color
      if (colors.length === 0) {
        colors = [baseColor];
      }

      // Add lab blue if not already included
      if (!colors.includes(baseColor)) {
        colors.push(baseColor);
      }

      setTopicColors(colors);

      // Get team member details for this project
      const team = currentProject.team
        .map((memberName: string) =>
          teamMembers.find(tm => tm.name === memberName))
        .filter(Boolean); // Remove undefined entries

      setProjectTeam(team);

      // Find software related to this project
      const relatedSoftware = software.filter(sw => sw.projectId === id);
      setProjectSoftware(relatedSoftware);
    }

    setLoading(false);
  }, [id, projects, teamMembers, software, baseColor]);

  // Handle mouse movement over the header
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorHeaderRef.current && !isFrozen) {
      const rect = colorHeaderRef.current.getBoundingClientRect();
      // Calculate relative position in percentage
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Reset frozen state when entering the header
  const handleMouseEnter = () => {
    setIsFrozen(false);
  };

  // Freeze gradient when leaving the header
  const handleMouseLeave = () => {
    setIsFrozen(true);
  };

  // Update the gradient generation based on topics
  const generateDynamicGradient = () => {
    // If no topics, return the pure lab color
    if (!project.topics || project.topics.length === 0) {
      return baseColor;
    }

    // Get mouse position as percentage of card dimension
    const { x, y } = mousePosition;

    // Create a dynamic position based on mouse
    const position = `circle at ${x}% ${y}%`;

    // Get topic colors from the project
    const topicColors = getTopicColorsFromProject(project);

    // Create a gradient with the unified function
    return createProjectGradient(topicColors, position);
  };

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (!project) {
    return (
      <>
        <TopNav />
        <div className="project-details">
          <h1>Project not found</h1>
          <p>The requested project could not be found.</p>
          <Link to="/projects">Return to Projects</Link>
        </div>
        <Footer />
      </>
    );
  }

  // Get publications related to this project
  const projectPublications = publications.filter(pub => pub.projectId === id);

  // Group publications by year
  const publicationsByYear = projectPublications.reduce((acc, publication) => {
    const year = publication.year.toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(publication);
    return acc;
  }, {} as Record<string, typeof projectPublications>);

  return (
    <>
      <TopNav />
      <div className="project-details">
        {/* Show project image if available, otherwise use interactive gradient header */}
        {project.image ? (
          <div className="project-main-image-container">
            <img 
              src={project.image} 
              alt={project.title}
              className="project-main-image"
              onError={(e) => {
                // If image fails to load, fallback to gradient
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (colorHeaderRef.current) {
                  colorHeaderRef.current.style.display = 'flex';
                }
              }}
            />
          </div>
        ) : (
          <div
            ref={colorHeaderRef}
            className="project-color-header"
            style={{ background: generateDynamicGradient() }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></div>
        )}

        <h1 className="project-title-standalone">{project.title}</h1>

        <div className="project-section">
          {/* Split description into paragraphs on line breaks */}
          {project.description.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Display methods with their colors */}
          {project.topics && project.topics.length > 0 && (
            <div className="project-detail-topics">
              {project.topics.map((method: string, index: number) => {
                // Find color from topicsWithColors if available
                const methodWithColor = project.topicsWithColors?.find(
                  (t: any) => t.name === method
                );
                const methodColor = methodWithColor ? methodWithColor.color : '#CCCCCC';

                return (
                  <div key={method} className="project-detail-topic">
                    <div
                      className="project-detail-topic-color"
                      style={{ backgroundColor: methodColor }}
                    ></div>
                    <span className="project-detail-topic-name">{method}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="project-metadata-container">
            <div className="project-metadata-item">
              <h4>Topics:</h4>
              <p>{project.category && renderDisciplines(project.category)}</p>
            </div>

          </div>
        </div>

        {projectTeam.length > 0 && (
          <div className="project-section">
            <h2>Team Members Working in This Research Area</h2>
            <div className="project-team-list">
              {projectTeam.map((member: any) => (
                <Link
                  key={member.id}
                  to={`/team/${member.id}`}
                  className="project-team-member"
                >
                  <div
                    className="team-color-indicator"
                    style={{ backgroundColor: member.color }}
                  ></div>
                  {member.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Software section - updated to match existing software design */}
        {projectSoftware.length > 0 && (
          <div className="project-section">
            <h2>Software</h2>
            <div className="software-grid">
              {projectSoftware.map(sw => (
                <div key={sw.id} className="software-card">
                  <div className="software-header">
                    <h3 className="software-name">{sw.name}</h3>
                    {sw.featured && <span className="software-featured">Featured</span>}
                  </div>

                  <p className="software-description">{sw.description}</p>

                  {sw.technologies && sw.technologies.length > 0 && (
                    <div className="software-tech-tags">
                      {sw.technologies.map((tech: string) => (
                        <span key={tech} className="software-tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}

                  {sw.developers && sw.developers.length > 0 && (
                    <p className="software-developed-by">
                      Developed by: {sw.developers.join(', ')}
                    </p>
                  )}

                  <div className="software-meta">
                    {sw.license && (
                      <span className="software-license">{sw.license}</span>
                    )}
                    {sw.releaseDate && (
                      <p className="software-date">
                        Released: {new Date(sw.releaseDate).toLocaleDateString()}
                      </p>
                    )}
                    {sw.lastUpdate && (
                      <p className="software-date">
                        Updated: {new Date(sw.lastUpdate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="software-links">
                    <a href={sw.repoUrl} target="_blank" rel="noopener noreferrer" className="software-link repo-link">
                      Repository
                    </a>
                    {sw.demoUrl && (
                      <a href={sw.demoUrl} target="_blank" rel="noopener noreferrer" className="software-link demo-link">
                        Demo
                      </a>
                    )}
                    {sw.documentationUrl && (
                      <a href={sw.documentationUrl} target="_blank" rel="noopener noreferrer" className="software-link docs-link">
                        Docs
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications section - updated to match existing publications design */}
        {projectPublications.length > 0 && (
          <div className="project-section">
            <h2>Publications</h2>
            <div className="publications-list">
              {projectPublications.map((publication) => (
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
                  <div className="publication-meta">
                    <span className="publication-journal">
                      <em>{publication.journal}</em>
                    </span>
                    <span className="publication-year">{publication.year}</span>
                    {publication.type && (
                      <span className="publication-type">{publication.type}</span>
                    )}
                  </div>
                  {publication.abstract && (
                    <div className="publication-abstract">
                      <p>{publication.abstract}</p>
                    </div>
                  )}
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;
