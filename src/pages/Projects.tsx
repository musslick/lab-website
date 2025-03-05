import React, { useState } from 'react';
import { ProjectCard } from '../components/Components';
import { Project, projects } from '../data/projects';
import '../styles/styles.css';

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Get unique categories
    const uniqueCategories = Array.from(new Set(projects.map((project: Project) => project.category)));
    const categories = ['All', ...uniqueCategories];

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All' 
        ? projects 
        : projects.filter((project: Project) => project.category === selectedCategory);

    return (
        <div className="projects-page">
            <div className="projects-header">
                <h1>Our Research Projects</h1>
                <p>Explore our cutting-edge research in neuroscience and cognitive technologies</p>
            </div>
            
            <div className="filter">
                <h3>Filter by Category</h3>
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map((category: string) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            
            {filteredProjects.length === 0 ? (
                <div className="no-projects">
                    <p>No projects found in this category.</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {filteredProjects.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;