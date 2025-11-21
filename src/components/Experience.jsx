import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const experiences = [
    {
      company: 'Shoption Pvt. Ltd.',
      position: 'IT Intern',
      duration: 'September 2025 - Present',
      location: 'Hybrid',
      description: [
        'Developing multilingual advanced RAG backend layer for customer facing chatbots',
        'Integrating APIs with frontend, CRM, marketing automation platforms, and internal tools',
      ],
      color: '#2563eb',
    },
    {
      company: 'Aeronica Advance Technologies Pvt. Ltd.',
      position: 'Control Systems Intern',
      duration: 'June 2025 - August 2025',
      location: 'Hybrid',
      description: [
        'Worked on advanced automation algorithms, including PID, MPC, and LQR',
        'Implemented algorithms on STM32 microcontroller with MPU6050 sensor for real-time feedback control',
      ],
      color: '#3b82f6',
    },
    {
      company: 'NxTechWorks Consulting Pvt. Ltd.',
      position: 'Data Science Intern',
      duration: 'May 2025 - June 2025',
      location: 'Remote',
      description: [
        'Engineered RAG chatbot with advanced features like crossencoder reranking and summarization',
        'Developed n8n workflows for personalized event suggestions and Google Calendar sync',
      ],
      color: '#60a5fa',
    },
  ]

  return (
    <section className="experience" id="experience">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.div
              className="experience-card"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ '--accent-color': exp.color }}
            >
              <div className="experience-header">
                <FaBriefcase className="experience-icon" />
                <div>
                  <h3 className="experience-position">{exp.position}</h3>
                  <h4 className="experience-company">{exp.company}</h4>
                </div>
              </div>

              <div className="experience-meta">
                <span className="experience-duration">
                  <FaCalendar /> {exp.duration}
                </span>
                <span className="experience-location">
                  <FaMapMarkerAlt /> {exp.location}
                </span>
              </div>

              <ul className="experience-description">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
