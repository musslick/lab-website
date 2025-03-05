import React from 'react';
import { ProjectCard } from '../components/Components';
import { projects } from '../data/projects';
import '../styles/styles.css';
// Import the SVG directly when using Create React App or similar bundler
import { ReactComponent as BrainLogo } from '../assets/logo.svg';

const Home: React.FC = () => {
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
                <h2 style={{ textAlign: 'left' }}>Featured Projects</h2>
                {/* Use the same projects-grid class as in Projects.tsx */}
                <div className="projects-grid">
                    {featuredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
            
            <section className="collaborators">
                <h2 style={{ textAlign: 'left' }}>Our Collaborators</h2>
                <div className="collaborator-logos" style={{ textAlign: 'left' }}>
                    <div className="collaborator-logo">University of Science</div>
                    <div className="collaborator-logo">National Research Lab</div>
                    <div className="collaborator-logo">Tech Institute</div>
                </div>
            </section>
        </div>
    );
};

export default Home;