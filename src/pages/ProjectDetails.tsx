import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { generateTopicColor } from '../utils/colorUtils';
import '../styles/styles.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers } = useContent();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectTeam, setProjectTeam] = useState<any[]>([]);
  
  // Add state for mouse position to create dynamic gradient effect
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isFrozen, setIsFrozen] = useState(false);
  const colorHeaderRef = useRef<HTMLDivElement>(null);
  
  // Lab blue color for reference
  const LAB_COLOR = '#00AAFF';
  
  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      
      if (foundProject) {
        setProject(foundProject);
        
        // Find team members for this project
        const team = foundProject.team
          .map(name => teamMembers.find(member => member.name === name))
          .filter(member => member !== undefined);
        
        setProjectTeam(team as any[]);
      }
      
      setLoading(false);
    }
  }, [id, projects, teamMembers]);
  
  // Handle mouse movement for gradient effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorHeaderRef.current && !isFrozen) {
      const rect = colorHeaderRef.current.getBoundingClientRect();
      // Calculate relative position in percentage
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };
  
  const handleMouseEnter = () => {
    setIsFrozen(false);
  };
  
  const handleMouseLeave = () => {
    setIsFrozen(true);
  };
  
  // Generate dynamic gradient based on project topics
  const generateDynamicGradient = () => {
    if (!project || !project.topics) {
      return 'radial-gradient(circle at 50% 50%, #FF5733 0%, #00AAFF 100%)';
    }
    
    // Generate colors based on project topics
    const topicColors = project.topics.map((topic: string, index: number) => 
      generateTopicColor(LAB_COLOR, index, project.topics.length)
    );
    
    // Always include lab blue in the gradient
    if (!topicColors.includes(LAB_COLOR)) {
      topicColors.push(LAB_COLOR);
    }
    
    // Get mouse position
    const { x, y } = mousePosition;
    
    // Create a dynamic position based on mouse
    const position = `circle at ${x}% ${y}%`;
    
    // Generate gradient stops with percentages
    const stops = topicColors.map((color: string, index: number) => {
      if (index === topicColors.length - 1) {
        return `${color} 100%`;
      }
      // Adjust distribution for dynamic gradient
      const percentage = Math.round(Math.pow(index / (topicColors.length - 1), 0.8) * 85);
      return `${color} ${percentage}%`;
    }).join(', ');
    
    return `radial-gradient(${position}, ${stops})`;
  };
  
  if (loading) {
    return <div>Loading project details...</div>;
  }
  
  if (!project) {
    return <div>Project not found</div>;
  }
  
  return (
    <div className="project-details">
      <div 
        ref={colorHeaderRef}
        className="project-color-header"
        style={{ 
          background: generateDynamicGradient(),
          cursor: 'default'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      
      <h1 className="project-title-standalone">{project.title}</h1>
      
      <p className="project-description">{project.description}</p>
      
      {/* Topic tags display */}
      {project.topics && project.topics.length > 0 && (
        <div className="project-detail-topics">
          {project.topics.map((topic: string, index: number) => {
            const topicColor = generateTopicColor(LAB_COLOR, index, project.topics.length);
            return (
              <div key={topic} className="project-detail-topic">
                <div 
                  className="project-detail-topic-color" 
                  style={{ backgroundColor: topicColor }}
                />
                <span className="project-detail-topic-name">{topic}</span>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Other project details */}
      <div className="project-section">
        <h2>Category</h2>
        <p>{project.category}</p>
      </div>
      
      {project.publications && project.publications.length > 0 && (
        <div className="project-section">
          <h2>Publications</h2>
          <ul>
            {project.publications.map((publication: string, index: number) => (
              <li key={index}>{publication}</li>
            ))}
          </ul>
        </div>
      )}
      
      {projectTeam.length > 0 && (
        <div className="project-section">
          <h2>Team Members</h2>
          <div className="project-team-list">
            {projectTeam.map((member: any) => (
              <Link 
                to={`/team/${member.id}`} 
                key={member.id}
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
      
      {project.startDate && (
        <div className="project-section">
          <h2>Timeline</h2>
          <p>
            <strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}
            {project.endDate && (
              <>
                <br />
                <strong>Completed:</strong> {new Date(project.endDate).toLocaleDateString()}
              </>
            )}
            {!project.endDate && project.status === 'ongoing' && (
              <span> (Ongoing)</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
