import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import Layout from '../components/Layout';
import '../styles/styles.css';

const Software: React.FC = () => {
  const { software } = useContent();
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Get unique technologies
  const allTechnologies = software.flatMap(item => item.technologies || []);
  const uniqueTechnologies = ['All', ...Array.from(new Set(allTechnologies))];

  // Filter software by selected technology
  const filteredSoftware = selectedTech === 'All'
    ? software
    : software.filter(item => item.technologies?.includes(selectedTech));

  return (
    <Layout>
      <div className="projects-page">
        <div className="projects-header">
          <h1>Software</h1>
          <p>We develop and maintain several open-source Python (pip) packages for automating various aspects of empirical research.</p>
        </div>

        <div className="tag-filter">
          <h3>Filter by Technology</h3>
          <div className="tag-list">
            {uniqueTechnologies.map(tech => (
              <button
                key={tech}
                className={`tag-button ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="software-grid">
          {filteredSoftware.length > 0 ? (
            filteredSoftware.map(item => (
              <div key={item.id} className="software-card">
                <div className="software-header">
                  <h3 className="software-name">{item.name}</h3>
                  {item.featured && <span className="software-featured">Featured</span>}
                </div>

                <p className="software-description">{item.description}</p>

                <div className="software-tech-tags">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="software-tech-tag"
                      onClick={() => setSelectedTech(tech)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="software-developed-by">
                  <strong>Developing Team Members:</strong> {item.developers.join(', ')}
                </div>

                <div className="software-meta">
                  {item.releaseDate && (
                    <span className="software-date">
                      Released: {new Date(item.releaseDate).toLocaleDateString()}
                    </span>
                  )}
                  {item.lastUpdate && (
                    <span className="software-date">
                      Last Updated: {new Date(item.lastUpdate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="software-license">License: {item.license}</span>
                </div>

                <div className="software-links">
                  <a
                    href={item.repoUrl}
                    className="software-link repo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository
                  </a>

                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      className="software-link demo-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo
                    </a>
                  )}

                  {item.documentationUrl && (
                    <a
                      href={item.documentationUrl}
                      className="software-link docs-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Documentation
                    </a>
                  )}
                </div>

                {item.projectId && (
                  <div className="software-related-project">
                    <Link to={`/projects/${item.projectId}`} className="project-link">
                      Related Project
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-software">
              <p>No software found for the selected technology.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Software;
