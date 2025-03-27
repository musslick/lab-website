import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { ProjectCard } from '../components/Components';
import { Project } from '../data/projects';
import '../styles/styles.css';

const Projects: React.FC = () => {
  const { projects } = useContent();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  
  // Get unique disciplines
  const allDisciplines = projects.flatMap(project => 
    Array.isArray(project.category) 
      ? project.category 
      : [project.category]
  );
  const uniqueDisciplines = ['All', ...Array.from(new Set(allDisciplines))];
  
  // Get unique methods across all projects
  const allMethods = projects.flatMap(project => project.topics || []);
  const uniqueMethods = ['All', ...Array.from(new Set(allMethods))];

  // Filter projects by selected discipline and method
  const filteredProjects = projects
    .filter(project => 
      selectedDiscipline === 'All' || 
      (typeof project.category === 'string' && project.category === selectedDiscipline) ||
      (Array.isArray(project.category) && project.category.includes(selectedDiscipline))
    )
    .filter(project => selectedMethod === 'All' || project.topics?.includes(selectedMethod));

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Our Research Projects</h1>
        <p>Explore the cutting-edge research happening in our lab</p>
      </div>

      <div className="filter-container">
        <div className="tag-filter">
          <h3>Filter by Discipline</h3>
          <div className="tag-list">
            {uniqueDisciplines.map(discipline => (
              <button 
                key={discipline} 
                className={`tag-button ${selectedDiscipline === discipline ? 'active' : ''}`}
                onClick={() => setSelectedDiscipline(discipline)}
              >
                {discipline}
              </button>
            ))}
          </div>
        </div>
        
        <div className="tag-filter">
          <h3>Filter by Method</h3>
          <div className="tag-list">
            {uniqueMethods.map(method => (
              <button 
                key={method} 
                className={`tag-button ${selectedMethod === method ? 'active' : ''}`}
                onClick={() => setSelectedMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found with the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;