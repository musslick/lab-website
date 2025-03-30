import React from 'react';
import { ProjectCard } from '../components/Components';
import '../styles/styles.css';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// Import the SVG directly when using Create React App or similar bundler
import { ReactComponent as BrainLogo } from '../assets/logo.svg';

const Home: React.FC = () => {
    const { projects, collaborators, newsItems, publications, getFeaturedItems } = useContent();
    const { isAuthenticated } = useAuth();
    
    // Get featured items from context
    const featuredItems = getFeaturedItems();
    
    // Find the featured items by ID
    const featuredProject = projects.find(p => p.id === featuredItems.projectId) || (projects.length > 0 ? projects[0] : null);
    const featuredNewsItem = newsItems.find(n => n.id === featuredItems.newsItemId) || (newsItems.length > 0 ? newsItems[0] : null);
    const featuredPublication = publications.find(p => p.id === featuredItems.publicationId) || (publications.length > 0 ? publications[0] : null);
    
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
                <div className="projects-grid">
                    {/* News Card */}
                    {featuredNewsItem && (
                        <Link to="/feed" className="project-card">
                            <div className="project-color-block" style={{ background: '#00AAFF' }}>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{featuredNewsItem.title}</h3>
                                <div className="news-meta">
                                    <span className="news-date">{formatDate(featuredNewsItem.date)}</span>
                                    <span className="news-author">By {featuredNewsItem.author}</span>
                                </div>
                                <p className="project-excerpt">
                                    {featuredNewsItem.content.length > 115 
                                        ? `${featuredNewsItem.content.slice(0, 115)}...` 
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
                    
                    {/* Project Card */}
                    {featuredProject && <ProjectCard key={featuredProject.id} project={featuredProject} />}
                    
                    {/* Publication Card */}
                    {featuredPublication && (
                        <Link to="/publications" className="project-card">
                            <div 
                                className="project-color-block"
                                style={{ background: '#00AAFF' }}
                            >
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{featuredPublication.title}</h3>
                                <p className="project-excerpt">
                                    {featuredPublication.authors.join(", ")}
                                </p>
                                {featuredPublication.abstract && (
                                    <p className="project-excerpt">
                                        {featuredPublication.abstract.length > 115 
                                            ? `${featuredPublication.abstract.slice(0, 115)}...` 
                                            : featuredPublication.abstract}
                                    </p>
                                )}
                                <div className="project-metadata">
                                    <span className="project-category">
                                        {featuredPublication.journal} ({featuredPublication.year})
                                    </span>
                                </div>
                                {featuredPublication.keywords && featuredPublication.keywords.length > 0 && (
                                    <div className="news-tags">
                                        {featuredPublication.keywords.slice(0, 3).map(keyword => (
                                            <span key={keyword} className="news-tag">{keyword}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}
                </div>
                
                {/* Update see all links container */}
                <div className="see-all-links-container">
                    <Link to="/feed" className="see-more-link">
                        See all news <span className="arrow-icon">→</span>
                    </Link>
                    <Link to="/projects" className="see-more-link">
                        See all projects <span className="arrow-icon">→</span>
                    </Link>
                    <Link to="/publications" className="see-more-link">
                        See all publications <span className="arrow-icon">→</span>
                    </Link>
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