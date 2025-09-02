import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About Us</h1>
        <div className="about-content">
          <div className="profile-section">
            <div className="profile-image">
              <img 
                src="https://i.postimg.cc/3ysPCJPs/Whats-App-Image-2025-08-09-at-19-37-19-06727dd9.jpg" 
                alt="Developer Profile" 
              />
            </div>
            <h2>Sainath K</h2>
            <p className="title">Full Stack Developer</p>
            <p className="description">
              Passionate developer creating amazing e-commerce experiences with modern web technologies.
              Specialized in React, Node.js, and MongoDB development.
            </p>
          </div>

          <div className="social-links">
            <h3>Connect With Me</h3>
            <div className="social-buttons">
              <a 
                href="https://www.instagram.com/0_._sai_editz_._0?igsh=aGV0b3k5d3RyeGJ1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn instagram"
              >
                📸 Instagram
              </a>
              <a 
                href="https://github.com/Sainath-K-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn github"
              >
                💻 GitHub
              </a>
            </div>
          </div>

          <div className="skills-section">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">Git</span>
            </div>
          </div>

          <div className="project-info">
            <h3>About This Project</h3>
            <p>
              MegaMart is a full-stack e-commerce platform built with modern web technologies. 
              It features user authentication, admin dashboard, product management, shopping cart, 
              and a responsive design that works across all devices.
            </p>
            <div className="tech-stack">
              <h4>Tech Stack:</h4>
              <ul>
                <li><strong>Frontend:</strong> React.js, CSS3, Context API</li>
                <li><strong>Backend:</strong> Node.js, Express.js</li>
                <li><strong>Database:</strong> MongoDB with Mongoose</li>
                <li><strong>Authentication:</strong> JWT, bcrypt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
