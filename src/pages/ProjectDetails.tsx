import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import Layout from '../components/Layout';
import { generateTopicColor } from '../utils/colorUtils';
import '../styles/styles.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, getTeamMemberById } = useContent();
  const [project, setProject] = useState<any>(null);
  const [projectTeamMembers, setProjectTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        
        // Get team member details for each name in the project's team array
        const teamMembers = foundProject.team.map((memberName: string) => {
          // Find the team member by name from all team members
          const memberInfo = projects.flatMap(p => p.team)
            .map(name => getTeamMemberById(name))
            .find(m => m?.name === memberName);
          
          return {
            id: memberInfo?.id || `unknown-${memberName}`,
            name: memberName,
            color: memberInfo?.color || "#CCCCCC"
          };
        });
        
        setProjectTeamMembers(teamMembers);
      }
      setLoading(false);
    }
  }, [id, projects, getTeamMemberById]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  // Generate topic colors if they don't exist
  const projectTopics = project.topics || [];
  const topicColors = projectTopics.map((topic: string, index: number) => {
    // Check if we have colors already defined in topicsWithColors
    const existingColor = project.topicsWithColors?.find((t: any) => t.name === topic)?.color;
    return {
      name: topic,
      color: existingColor || generateTopicColor('#00AAFF', index, projectTopics.length)
    };
  });

  return (
    <Layout>
      <div className="project-details">
        <div 
          className="project-color-header"
          style={{ background: project.color || 'radial-gradient(circle at center, #FF5733, #00AAFF)' }}
        >
          {/* Color gradient background */}
        </div>

        <h1 className="project-title-standalone">{project.title}</h1>
        
        <div className="project-section">
          <p>{project.description}</p>
          
          {project.category && (
            <div className="project-category">
              {project.category}
            </div>
          )}

          {projectTopics.length > 0 && (
            <div className="project-detail-topics">
              {topicColors.map((topic: any) => (
                <div key={topic.name} className="project-detail-topic">
                  <div 
                    className="project-detail-topic-color" 
                    style={{ backgroundColor: topic.color }}
                  ></div>
                  <span className="project-detail-topic-name">{topic.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {projectTeamMembers.length > 0 && (
          <div className="project-section">
            <h2>Team</h2>
            <div className="project-team-list">
              {projectTeamMembers.map(member => (
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
        
        {project.status && (
          <div className="project-section">
            <h2>Status</h2>
            <p>
              <span className={`project-status ${project.status}`}>{project.status}</span>
              {project.startDate && <span> - Started: {new Date(project.startDate).toLocaleDateString()}</span>}
              {project.endDate && <span> - Completed: {new Date(project.endDate).toLocaleDateString()}</span>}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetails;
