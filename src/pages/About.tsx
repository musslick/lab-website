import React from 'react';
import './About.css'; // Create this file if it doesn't exist

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Our Lab</h1>
        <p>Learn about our mission, vision, and research focus</p>
      </div>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
        Our lab is dedicated to uncovering the fundamental computational principles that underlie the capabilities and limitations of human cognition. Ironically, as human scientists, we are constrained by the very cognitive limitations we aim to understand: The complexity of the brain, its behaviors, and its interactions with the environment is often too vast for human minds to fully grasp. To overcome this, we harness artificial intelligence and other automated scientific discovery techniques to efficiently explore spaces of experiments, models, and theories that exceed our cognitive reach. Our AI-driven systems are designed to autonomously investigate brain function and behavior, offering insights and perspectives that might otherwise remain hidden for human scientists. By partnering with intelligent systems, we aim gain an integrative understanding of the capabilities and limitations of mind and brain. 
        </p>
      </section>
      
      <section className="about-section">
        <h2>Research Focus</h2>
        <p>
          At the Automated Scientific Discovery of Mind and Brain lab, we focus on several key areas:
        </p>
        <ul>
          <li>Neural network mapping and analysis</li>
          <li>Cognitive process modeling</li>
          <li>Brain-computer interfaces</li>
          <li>Machine learning applications in neuroscience</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2>Our Approach</h2>
        <p>
          We combine cutting-edge technology with rigorous scientific methodology to explore the 
          complex relationships between brain structure, cognitive function, and human behavior.
          Our interdisciplinary team brings together expertise from neuroscience, computer science,
          psychology, and data analysis.
        </p>
      </section>
    </div>
  );
};

export default About;