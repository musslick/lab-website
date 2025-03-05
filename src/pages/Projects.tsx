import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { ProjectCard } from '../components/Components';
import { Project } from '../data/projects';
import '../styles/styles.css';

const Projects: React.FC = () => {
  const { projects } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Get unique categories
  const allCategories = projects.map(project => project.category);
  const uniqueCategories = ['All', ...Array.from(new Set(allCategories))];

  // Filter projects by selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Our Research Projects</h1>
        <p>Explore the cutting-edge research happening in our lab</p>
      </div>

      <div className="tag-filter">
        <h3>Filter by Category</h3>
        <div className="tag-list">
          {uniqueCategories.map(category => (
            <button 
              key={category} 
              className={`tag-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;