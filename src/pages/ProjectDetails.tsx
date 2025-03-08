import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { PageHeader } from '../components/Components';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, teamMembers } = useContent();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Add event listener for project updates
  useEffect(() => {
    const handleProjectUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.projectId === id) {
        console.log("Project update detected, refreshing...");
        setRefreshKey(prev => prev + 1); // Force refresh
      }
    };

    window.addEventListener('project-updated', handleProjectUpdate);
    
    return () => {
      window.removeEventListener('project-updated', handleProjectUpdate);
    };
  }, [id]);

  // Load project data with cache busting
  useEffect(() => {
    const loadProject = () => {
      setLoading(true);
      
      // Add small delay to ensure we get latest data
      setTimeout(() => {
        const foundProject = projects.find(p => p.id === id);
        
        if (foundProject) {
          console.log("Project loaded:", foundProject.title);
          
          // Add class for animation if this is a refresh
          if (refreshKey > 0) {
            setProject({...foundProject, isRefreshed: true});
          } else {
            setProject(foundProject);
          }
        } else {
          console.error("Project not found:", id);
        }
        
        setLoading(false);
      }, 50);
    };
    
    loadProject();
    
  }, [id, projects, refreshKey]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  // Find team members for this project
  const projectTeamMembers = teamMembers.filter(member => 
    project.team.includes(member.name)
  );

  const projectClass = project.isRefreshed ? 'project-details project-edited' : 'project-details';

  return (
    <div className={projectClass}>
      <div 
        className="project-color-header"
        style={{ background: project.color }}
      >
        {/* No heading in the banner */}
      </div>

      {/* Project title as h1, using the standardized class */}
      <h1 className="project-title-standalone">{project.title}</h1>

      <div className="project-section">
        <h2>About This Project</h2>
        <p>{project.description}</p>
      </div>

      <div className="project-section">
        <h2>Team</h2>
        <div className="project-team-grid">
          {projectTeamMembers.map(member => (
            <Link 
              key={member.id} 
              to={`/team/${member.id}`}
              className="project-team-member"
            >
              <div 
                className="team-color-indicator"
                style={{ backgroundColor: member.color }}
              ></div>
              <span>{member.name}</span>
            </Link>
          ))}
        </div>
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
      
      {isAuthenticated && (
        <div className="admin-actions" style={{marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px"}}>
          <Link 
            to={`/admin/projects/edit/${project.id}`}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#00AAFF",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none"
            }}
          >
            Edit this project
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
