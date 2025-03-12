import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { TopNav, Footer } from '../components/Components';
import { createProjectGradient } from '../utils/colorUtils';
import '../styles/styles.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers } = useContent();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectTeam, setProjectTeam] = useState<any[]>([]);
  
  // Store the current gradient for consistency
  const [gradient, setGradient] = useState<string>('');

  useEffect(() => {
    // Find the project by ID
    const currentProject = projects.find(p => p.id === id);
    
    if (currentProject) {
      // Generate the gradient when project is loaded to ensure consistency
      const projectGradient = createProjectGradient(currentProject, '#00AAFF');
      setGradient(projectGradient);
      
      setProject(currentProject);
      
      // Get team member details for this project
      const team = currentProject.team
        .map((memberName: string) => 
          teamMembers.find(tm => tm.name === memberName))
        .filter(Boolean); // Remove undefined entries
        
      setProjectTeam(team);
    }
    
    setLoading(false);
  }, [id, projects, teamMembers]);

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

  return (
    <>
      <TopNav />
      <div className="project-details">
        {/* Use the stored gradient for the header to ensure consistency */}
        <div className="project-color-header" style={{ background: gradient }}></div>
        
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
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;
