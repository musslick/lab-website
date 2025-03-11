import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { ProjectCard } from '../components/Components';
import { Project } from '../data/projects';
import '../styles/styles.css';

const Projects: React.FC = () => {
  const { projects } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  
  // Get unique categories
  const allCategories = projects.map(project => project.category);
  const uniqueCategories = ['All', ...Array.from(new Set(allCategories))];
  
  // Get unique topics across all projects
  const allTopics = projects.flatMap(project => project.topics || []);
  const uniqueTopics = ['All', ...Array.from(new Set(allTopics))];

  // Filter projects by selected category and topic
  const filteredProjects = projects
    .filter(project => selectedCategory === 'All' || project.category === selectedCategory)
    .filter(project => selectedTopic === 'All' || project.topics?.includes(selectedTopic));

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Our Research Projects</h1>
        <p>Explore the cutting-edge research happening in our lab</p>
      </div>

      <div className="filter-container">
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
        
        <div className="tag-filter">
          <h3>Filter by Topic</h3>
          <div className="tag-list">
            {uniqueTopics.map(topic => (
              <button 
                key={topic} 
                className={`tag-button ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
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