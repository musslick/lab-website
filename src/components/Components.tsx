import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { teamMembers } from '../data/team';
import { TeamMember as TeamMemberType } from '../data/team';
import { Project } from '../data/projects';
import { createGradient } from '../utils/colorUtils'; // Changed from createTransparentGradient

// Import the combined styles file
import '../styles/styles.css';

// ===============================
// TopNav Component
// ===============================
const TopNav: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav 
            className="top-nav" 
            style={{ 
                background: '#ffffff', // White background
                borderBottom: '1px solid #eee' // Subtle border
            }}
        >
            <div className="nav-container">
                <div className="logo-container">
                    <NavLink to="/" className="logo">
                        <span className="logo-text">University of Osnabrück</span>
                    </NavLink>
                </div>
                
                <button 
                    className="mobile-menu-toggle" 
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                
                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/team" className={({isActive}) => isActive ? 'active' : ''}>
                            Team
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/feed" className={({isActive}) => isActive ? 'active' : ''}>
                            News
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

// ===============================
// TeamMember Component
// ===============================
interface TeamMemberProps {
    name: string;
    bio: string;
    imageUrl: string;
    color: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, bio, imageUrl, color }) => {
    return (
        <div className="team-member">
            <div 
                className="team-member-color" 
                style={{ backgroundColor: color }}
            ></div>
            <img src={imageUrl} alt={name} className="team-member-image" />
            <div className="team-member-info">
                <h3 className="team-member-name">{name}</h3>
                <p className="team-member-bio">{bio}</p>
            </div>
        </div>
    );
};

// ===============================
// TeamGradientBanner Component
// ===============================
interface TeamGradientBannerProps {
    teamMembers: TeamMemberType[];
}

const TeamGradientBanner: React.FC<TeamGradientBannerProps> = ({ teamMembers }) => {
    // Create a gradient from all team member colors mixed with lab blue
    const createTeamGradient = () => {
        const colors = teamMembers.map(member => member.color);
        return createGradient(colors, {
            direction: 'to right',
            includeHighlight: true,
            highlightColor: '#00AAFF',
            mixColors: true,
            mixRatio: 0.35  // Slightly stronger mix for the banner
        });
    };

    return (
        <div 
            className="team-gradient-banner"
            style={{ background: createTeamGradient() }}
        >
            <div className="banner-content">
                <h2 style={{ textAlign: 'left' }}>Our Research Team</h2>
                <p style={{ textAlign: 'left' }}>Meet the people behind our groundbreaking work</p>
            </div>
        </div>
    );
};

// ===============================
// SideNav Component
// ===============================
const SideNav: React.FC = () => {
    return (
        <nav className="side-nav">
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/team" className={({ isActive }) => isActive ? 'active' : ''}>
                        Team
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/feed" className={({ isActive }) => isActive ? 'active' : ''}>
                        News Feed
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

// ===============================
// ProjectCard Component
// ===============================
interface ProjectCardProps {
    project: Project;
}

interface TeamMemberData {
    fullName: string;
    lastName: string;
    color: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    // Track mouse position for gradient effect
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isFrozen, setIsFrozen] = useState(false);
    
    const colorBlockRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);
    
    // Find team members' colors
    const teamData = project.team.map((name: string) => {
        const member = teamMembers.find(m => m.name === name);
        return member ? { 
            fullName: name,
            lastName: name.split(' ')[1], 
            color: member.color 
        } : null;
    }).filter(Boolean) as TeamMemberData[];

    // Handle mouse movement over the entire card
    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (colorBlockRef.current && !isFrozen) {
            const rect = colorBlockRef.current.getBoundingClientRect();
            // Calculate relative position in percentage
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
        }
    };

    // Reset frozen state when entering card
    const handleMouseEnter = () => {
        setIsFrozen(false);
    };

    // Freeze gradient when leaving card
    const handleMouseLeave = () => {
        setIsFrozen(true);
    };

    // Generate dynamic gradient based on mouse position
    const generateDynamicGradient = () => {
        // Extract colors from the gradient string
        const colorMatch = project.color.match(/linear-gradient\(\d+deg,\s*(.*)\)/);
        if (!colorMatch) return project.color;
        
        const colorStops = colorMatch[1].split(',').map(stop => {
            // Extract the color part (ignoring percentages)
            const color = stop.trim().split(' ')[0];
            return color;
        });
        
        // Calculate angle based on mouse position
        const { x, y } = mousePosition;
        const angle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
        
        // Ensure #00AAFF is included
        const highlightColor = '#00AAFF';
        if (!colorStops.includes(highlightColor)) {
            colorStops.splice(1, 0, highlightColor);
        }
        
        // Generate gradient stops with percentages
        const stops = colorStops.map((color, index) => {
            const percentage = (index / (colorStops.length - 1)) * 100;
            return `${color} ${percentage}%`;
        }).join(', ');
        
        return `linear-gradient(${angle}deg, ${stops})`;
    };

    return (
        <Link 
            to={`/projects/${project.id}`} 
            className="project-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                ref={colorBlockRef}
                className="project-color-block"
                style={{ 
                    background: generateDynamicGradient() 
                }}
            >
                {/* No text overlay */}
            </div>
            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-excerpt">
                    {project.description.length > 120 
                        ? `${project.description.slice(0, 120)}...` 
                        : project.description}
                </p>
                
                {/* Wrap category and team info in a metadata div */}
                <div className="project-metadata">
                    <span className="project-category">{project.category}</span>
                    
                    <div className="project-team">
                        {teamData.map((member: TeamMemberData, index: number) => (
                            <div key={index} className="team-member-tag">
                                <div 
                                    className="team-color-dot" 
                                    style={{ backgroundColor: member.color }}
                                    title={member.fullName}
                                />
                                <span className="team-name">{member.lastName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

// ===============================
// PageHeader Component
// ===============================
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <h1 style={{ textAlign: 'left' }}>{title}</h1>
      {subtitle && <p style={{ textAlign: 'left' }}>{subtitle}</p>}
    </div>
  );
};

// ===============================
// Header Component
// ===============================
const Header: React.FC = () => {
    return (
        <header>
            <div className="header-content">
                <h1>Automated Scientific Discovery of Mind and Brain</h1>
                <Link to="/" className="logo-link">
                    <img src="/assets/logo.png" alt="Lab Logo" className="lab-logo" />
                </Link>
            </div>
        </header>
    );
};

// ===============================
// Filter Component
// ===============================
interface FilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  return (
    <div className="filter">
      <h3>Filter by Category</h3>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

// ===============================
// Footer Component
// ===============================
const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <p>&copy; {new Date().getFullYear()} Automated Scientific Discovery of Mind and Brain. All rights reserved.</p>
                <div>
                    <a href="https://twitter.com/yourlab" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://facebook.com/yourlab" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://linkedin.com/company/yourlab" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

// Export all components
export {
    TopNav,
    TeamMember,
    TeamGradientBanner,
    SideNav,
    ProjectCard,
    PageHeader,
    Header,
    Filter,
    Footer
};
