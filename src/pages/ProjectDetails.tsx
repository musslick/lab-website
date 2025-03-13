import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { TopNav, Footer } from '../components/Components';
import { createProjectGradient } from '../utils/colorUtils';
import '../styles/styles.css';
import { publications } from '../data/publications';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers } = useContent();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectTeam, setProjectTeam] = useState<any[]>([]);
  
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
    }
    
    setLoading(false);
  }, [id, projects, teamMembers, baseColor]);

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

  // Generate dynamic gradient based on mouse position
  const generateDynamicGradient = () => {
    if (topicColors.length === 0) return `radial-gradient(circle at center, ${baseColor} 0%, ${baseColor} 100%)`;
    
    // Get mouse position as percentage of header dimension
    const { x, y } = mousePosition;
    
    // Create a dynamic position based on mouse
    const position = `circle at ${x}% ${y}%`;
    
    // Generate gradient stops with percentages
    const stops = topicColors.map((color, index) => {
      if (index === topicColors.length - 1) {
        return `${color} 100%`;
      }
      // Adjust distribution to make the gradient more dynamic and responsive to mouse
      const percentage = Math.round(Math.pow(index / (topicColors.length - 1), 0.8) * 85);
      return `${color} ${percentage}%`;
    }).join(', ');
    
    return `radial-gradient(${position}, ${stops})`;
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

  return (
    <>
      <TopNav />
      <div className="project-details">
        {/* Interactive header with dynamic gradient */}
        <div 
          ref={colorHeaderRef}
          className="project-color-header"
          style={{ background: generateDynamicGradient() }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
        
        <h1 className="project-title-standalone">{project.title}</h1>
        
        <div className="project-section">
          <p>{project.description}</p>
          
          {/* Display topics with their colors */}
          {project.topics && project.topics.length > 0 && (
            <div className="project-detail-topics">
              {project.topics.map((topic: string, index: number) => {
                // Find color from topicsWithColors if available
                const topicWithColor = project.topicsWithColors?.find(
                  (t: any) => t.name === topic
                );
                const topicColor = topicWithColor ? topicWithColor.color : '#CCCCCC';
                
                return (
                  <div key={topic} className="project-detail-topic">
                    <div 
                      className="project-detail-topic-color"
                      style={{ backgroundColor: topicColor }}
                    ></div>
                    <span className="project-detail-topic-name">{topic}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="project-metadata-container">
            <div className="project-metadata-item">
              <h4>Category:</h4>
              <p>{project.category}</p>
            </div>
            
            {project.status && (
              <div className="project-metadata-item">
                <h4>Status:</h4>
                <p>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</p>
              </div>
            )}
            
            {project.startDate && (
              <div className="project-metadata-item">
                <h4>Started:</h4>
                <p>{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
        
        {projectTeam.length > 0 && (
          <div className="project-section">
            <h2>Project Team</h2>
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
        
        {project.publications && project.publications.length > 0 && (
          <div className="project-section">
            <h2>Related Publications</h2>
            <ul>
              {project.publications.map((pub: string, index: number) => (
                <li key={index}>{pub}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Add publications section */}
        {projectPublications.length > 0 && (
          <div className="project-section">
            <h2>Publications</h2>
            <div className="project-publications">
              {projectPublications.map(publication => (
                <div key={publication.id} className="publication-item">
                  <h3 className="publication-title">
                    {publication.url ? (
                      <a href={publication.url} target="_blank" rel="noopener noreferrer">
                        {publication.title}
                      </a>
                    ) : (
                      publication.title
                    )}
                  </h3>
                  
                  <p className="publication-authors">{publication.authors.join(", ")}</p>
                  
                  <div className="publication-meta">
                    <span className="publication-journal">{publication.journal}</span>
                    <span className="publication-year">{publication.year}</span>
                    <span className="publication-type">{publication.type}</span>
                  </div>
                  
                  {publication.doi && (
                    <div className="publication-doi">
                      <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                        DOI: {publication.doi}
                      </a>
                    </div>
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
