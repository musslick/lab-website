import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Publication } from '../data/publications';
import { useContent } from '../contexts/ContentContext';
import '../styles/styles.css';

const Publications: React.FC = () => {
  const { projects, publications } = useContent();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<string>('All');
  
  // Get unique years
  const years = Array.from(new Set(publications.map(pub => pub.year.toString())));
  years.sort((a, b) => parseInt(b) - parseInt(a)); // Sort in descending order
  
  // Get unique publication types
  const pubTypes = Array.from(new Set(publications.map(pub => pub.type)));
  
  // Get projects that have publications
  const projectsWithPublications = projects.filter(project => 
    publications.some(pub => pub.projectId === project.id)
  );
  
  // Filter publications
  const filteredPublications = publications.filter(publication => {
    const matchesYear = selectedYear === 'All' || publication.year.toString() === selectedYear;
    const matchesType = selectedType === 'All' || publication.type === selectedType;
    const matchesProject = selectedProject === 'All' || publication.projectId === selectedProject;
    return matchesYear && matchesType && matchesProject;
  });
  
  // Sort publications by year (newest first)
  const sortedPublications = [...filteredPublications].sort((a, b) => b.year - a.year);
  
  // Function to get project title by ID
  const getProjectTitle = (projectId: string): string => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.title : '';
  };

  return (
    <div className="publications-page">
      <div className="projects-header">
        <h1>Publications</h1>
        <p>Research papers, conference proceedings, and other scholarly works from our lab</p>
      </div>

      <div className="filter-container">
        <div className="tag-filter">
          <h3>Filter by Year</h3>
          <div className="tag-list">
            <button 
              className={`tag-button ${selectedYear === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedYear('All')}
            >
              All
            </button>
            {years.map(year => (
              <button 
                key={year} 
                className={`tag-button ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        <div className="tag-filter">
          <h3>Filter by Type</h3>
          <div className="tag-list">
            <button 
              className={`tag-button ${selectedType === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedType('All')}
            >
              All
            </button>
            {pubTypes.map(type => (
              <button 
                key={type} 
                className={`tag-button ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {projectsWithPublications.length > 0 && (
          <div className="tag-filter">
            <h3>Filter by Project</h3>
            <div className="tag-list">
              <button 
                className={`tag-button ${selectedProject === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedProject('All')}
              >
                All Projects
              </button>
              {projectsWithPublications.map(project => (
                <button 
                  key={project.id} 
                  className={`tag-button ${selectedProject === project.id ? 'active' : ''}`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  {project.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="publications-list">
        {sortedPublications.length > 0 ? (
          sortedPublications.map(publication => (
            <div key={publication.id} className="publication-item">
              <h3 className="publication-title">
                {publication.url ? (
                  <a href={publication.url} target="_blank" rel="noopener noreferrer">
                    {publication.title}
                  </a>
                ) : (
                  publication.title
                )}
              </h3>
              
              <p className="publication-authors">{publication.authors.join(", ")}</p>
              
              <div className="publication-meta">
                <span className="publication-journal">{publication.journal}</span>
                <span className="publication-year">{publication.year}</span>
                <span className="publication-type">{publication.type}</span>
              </div>
              
              {publication.abstract && (
                <div className="publication-abstract">
                  <p>{publication.abstract}</p>
                </div>
              )}
              
              {publication.keywords && (
                <div className="publication-keywords">
                  {publication.keywords.map(keyword => (
                    <span key={keyword} className="publication-keyword">{keyword}</span>
                  ))}
                </div>
              )}
              
              {publication.projectId && (
                <div className="publication-project">
                  <span>Related Project: </span>
                  <Link to={`/projects/${publication.projectId}`}>
                    {getProjectTitle(publication.projectId)}
                  </Link>
                </div>
              )}
              
              {publication.doi && (
                <div className="publication-doi">
                  <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                    DOI: {publication.doi}
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-publications">
            <p>No publications found with the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
