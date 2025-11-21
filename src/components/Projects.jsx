import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'AquaMitra: Hybrid RAG + Text-to-SQL',
      duration: 'August 2025 - Present',
      description:
        'Built a Hybrid RAG QA assistant with LlamaIndex routing and Text-to-SQL capabilities on DuckDB. Delivered FastAPI + Uvicorn backend with SQLAlchemy, exposing /api/chat, /api/health, and /api/history endpoints.',
      tech: ['Python', 'FastAPI', 'LlamaIndex', 'HuggingFace', 'DuckDB', 'SQLAlchemy'],
      image: '/images/projects/project1.jpg',
      github: 'https://github.com/aryaniscoding/aquamitra',
    },
    {
      title: 'FareFlow: Smart Parking System',
      duration: 'Feb 2025 - May 2025',
      description:
        'Built an end-to-end parking solution with ESP32-CAM video feed and Flask backend. Achieved 98% accuracy in license plate recognition using Plate Recognizer API. Developed dynamic fare logic based on parking duration.',
      tech: ['Python', 'Flask', 'ESP32-CAM', 'Plate Recognizer API', 'SQLite', 'OpenCV'],
      image: '/images/projects/project2.jpg',
      github: 'https://github.com/aryaniscoding/fareflow',
    },
    {
      title: 'The Gladiators: Fantasy Cricket Selector',
      duration: 'May 2025 - July 2025',
      description:
        'Built an automated fantasy-cricket selection engine using scikit-learn Pipelines with RandomForestRegressor tuned via RandomizedSearchCV. Containerized workflow with Docker for reproducible data pipeline.',
      tech: ['Python', 'pandas', 'scikit-learn', 'Docker', 'numpy'],
      image: '/images/projects/project3.jpg',
      github: 'https://github.com/aryaniscoding/gladiators',
    },
  ]

  return (
    <section className="projects" id="projects">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a 
                  href={project.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link" 
                  aria-label="View on GitHub"
                >
                  <FaGithub />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>

            <div className="project-content">
              <span className="project-duration">{project.duration}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-button"
              >
                <FaGithub /> View Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects
