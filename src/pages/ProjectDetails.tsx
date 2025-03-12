import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { TeamMember } from '../components/Components';
import Layout from '../components/Layout';
import { generateTopicColor } from '../utils/colorUtils';
import '../styles/styles.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers } = useContent();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectTeam, setProjectTeam] = useState<any[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isFrozen, setIsFrozen] = useState(false);
  
  const colorBlockRef = React.useRef<HTMLDivElement>(null);
  const LAB_COLOR = '#00AAFF';

  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      
      // Find team members for this project
      const teamData = teamMembers.filter(member => 
        foundProject.team.includes(member.name)
      );
      setProjectTeam(teamData);
    }
    
    setLoading(false);
  }, [id, projects, teamMembers]);

  // Handle mouse movement over the banner
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorBlockRef.current && !isFrozen) {
      const rect = colorBlockRef.current.getBoundingClientRect();
      // Calculate relative position in percentage
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Generate dynamic gradient based on mouse position and project topics
  const generateDynamicGradient = () => {
    if (!project || !project.topics) return '';
    
    // Generate colors based on project topics
    const topicColors = project.topics.map((topic: string, index: number) => 
      generateTopicColor(LAB_COLOR, index, project.topics.length)
    );
    
    // Always include lab blue in the gradient
    if (!topicColors.includes(LAB_COLOR)) {
      topicColors.push(LAB_COLOR);
    }
    
    // Get mouse position as percentage of card dimension
    const { x, y } = mousePosition;
    
    // Create a dynamic position based on mouse
    const position = `circle at ${x}% ${y}%`;
    
    // Generate gradient stops with percentages
    const stops = topicColors.map((color: string, index: number) => {
      if (index === topicColors.length - 1) {
        return `${color} 100%`;
      }
      // Adjust distribution to make the gradient more dynamic
      const percentage = Math.round(Math.pow(index / (topicColors.length - 1), 0.8) * 85);
      return `${color} ${percentage}%`;
    }).join(', ');
    
    return `radial-gradient(${position}, ${stops})`;
  };

  if (loading) {
    return (
      <Layout>
        <div>Loading project details...</div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div>Project not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="project-details">
        {/* Project color header with same gradient as cards */}
        <div 
          ref={colorBlockRef}
          className="project-color-header"
          style={{ background: generateDynamicGradient() || project.color }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsFrozen(false)}
          onMouseLeave={() => setIsFrozen(true)}
        ></div>

        {/* Project title */}
        <h1 className="project-title-standalone">{project.title}</h1>

        {/* Project category */}
        <div className="project-metadata">
          <span className="project-category">{project.category}</span>
          
          {/* Project topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="project-detail-topics">
              {project.topics.map((topic: string, index: number) => {
                const topicColor = generateTopicColor(LAB_COLOR, index, project.topics.length);
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
        </div>

        {/* Project description */}
        <div className="project-section">
          <p>{project.description}</p>
        </div>

        {/* Team section */}
        {projectTeam.length > 0 && (
          <div className="project-section">
            <h2>Project Team</h2>
            <div className="team-container">
              {projectTeam.map(member => (
                <TeamMember
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  bio={member.role}
                  imageUrl={member.imageUrl}
                  color={member.color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Publications section */}
        {project.publications && project.publications.length > 0 && (
          <div className="project-section">
            <h2>Publications</h2>
            <ul>
              {project.publications.map((pub: string, index: number) => (
                <li key={index}>{pub}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Status and timeline section */}
        <div className="project-section">
          <h2>Status & Timeline</h2>
          <p>
            <strong>Status:</strong> {project.status || 'Ongoing'}
            <br />
            {project.startDate && (
              <>
                <strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}
                <br />
              </>
            )}
            {project.endDate && (
              <>
                <strong>Completed:</strong> {new Date(project.endDate).toLocaleDateString()}
              </>
            )}
          </p>
        </div>

        {/* Back to all projects link */}
        <div className="see-more-container" style={{ marginTop: '40px' }}>
          <Link to="/projects" className="see-more-link">
            Back to all projects <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
