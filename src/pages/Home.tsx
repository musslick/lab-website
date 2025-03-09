import React from 'react';
import { ProjectCard } from '../components/Components';
import '../styles/styles.css';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// Import the SVG directly when using Create React App or similar bundler
import { ReactComponent as BrainLogo } from '../assets/logo.svg';

const Home: React.FC = () => {
    const { projects, collaborators, newsItems, teamMembers } = useContent();
    const { isAuthenticated } = useAuth();
    
    // Select one project, one news item, and one team member
    const featuredProject = projects.length > 0 ? projects[0] : null;
    const featuredNewsItem = newsItems.length > 0 ? newsItems[0] : null;
    const featuredTeamMember = teamMembers.length > 0 ? teamMembers[0] : null;
    
    // Format date for display in news card
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
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
                <h2>Featured Content</h2>
                {/* Display one project, one news, and one team member */}
                <div className="projects-grid">
                    {/* Project Card */}
                    {featuredProject && (
                        <ProjectCard key={featuredProject.id} project={featuredProject} />
                    )}
                    
                    {/* News Card - styled like project card */}
                    {featuredNewsItem && (
                        <Link to="/feed" className="project-card">
                            <div 
                                className="project-color-block"
                                style={{ background: '#00AAFF' }}
                            >
                                {featuredNewsItem.featured && <span className="featured-banner">Featured</span>}
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{featuredNewsItem.title}</h3>
                                <div className="news-meta">
                                    <span className="news-date">{formatDate(featuredNewsItem.date)}</span>
                                    <span className="news-author">By {featuredNewsItem.author}</span>
                                </div>
                                <p className="project-excerpt">
                                    {featuredNewsItem.content.length > 120 
                                        ? `${featuredNewsItem.content.slice(0, 120)}...` 
                                        : featuredNewsItem.content}
                                </p>
                                {featuredNewsItem.tags && featuredNewsItem.tags.length > 0 && (
                                    <div className="news-tags">
                                        {featuredNewsItem.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="news-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}
                    
                    {/* Team Member Card - Styled like project card */}
                    {featuredTeamMember && (
                        <Link to={`/team/${featuredTeamMember.id}`} className="project-card">
                            <div 
                                className="project-color-block"
                                style={{ background: featuredTeamMember.color }}
                            >
                                {/* No content in color block, just the color */}
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{featuredTeamMember.name}</h3>
                                <p className="project-excerpt">
                                    {featuredTeamMember.bio && featuredTeamMember.bio.length > 120 
                                        ? `${featuredTeamMember.bio.slice(0, 120)}...` 
                                        : featuredTeamMember.bio || featuredTeamMember.role}
                                </p>
                                <div className="project-metadata">
                                    <span className="project-category">{featuredTeamMember.role}</span>
                                </div>
                            </div>
                        </Link>
                    )}
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
                        <div className="collaborate-icon">+</div>
                        <span>Become a Collaborator</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;