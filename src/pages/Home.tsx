import React from 'react';
import { ProjectCard } from '../components/Components';
import '../styles/styles.css';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// Import the SVG directly when using Create React App or similar bundler
import { ReactComponent as BrainLogo } from '../assets/logo.svg';

const Home: React.FC = () => {
    const { projects, collaborators } = useContent();
    const { isAuthenticated } = useAuth();
    // Select featured projects (first 3)
    const featuredProjects = projects.slice(0, 3);
    
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-title-wrapper">
                        <BrainLogo className="hero-logo" />
                        <h1 className="hero-title">
                            Automated<br />
                            Scientific Discovery<br />
                            of <span className="highlight-text">Mind</span> and <span className="highlight-text">Brain</span>
                        </h1>
                    </div>
                </div>
            </section>
            
            <section className="featured-projects">
                <h2>Featured Projects</h2>
                {/* Use the same projects-grid class as in Projects.tsx */}
                <div className="projects-grid">
                    {featuredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
            
            <section className="collaborators">
                <div className="collaborators-header">
                    <h2>Our Collaborators</h2>
                    {isAuthenticated && (
                        <Link to="/admin/collaborators" className="add-button">
                            Manage Collaborators
                        </Link>
                    )}
                </div>
                
                <div className="collaborator-list">
                    {collaborators.map(collaborator => (
                        <a 
                            href={collaborator.url} 
                            key={collaborator.id} 
                            className="collaborator-tag"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {collaborator.logo && (
                                <img 
                                    src={collaborator.logo} 
                                    alt={`${collaborator.name} logo`}
                                    className="collaborator-logo"
                                />
                            )}
                            <span>{collaborator.name}</span>
                        </a>
                    ))}
                    
                    {/* "Become a Collaborator" card with plus sign in the text */}
                    <Link to="/contact" className="collaborator-tag collaborate-cta">
                        <span>+ Become a Collaborator</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;