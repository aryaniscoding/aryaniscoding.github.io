import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaTrophy, FaCode } from 'react-icons/fa'
import './About.css'

const About = () => {
  const stats = [
    { icon: <FaGraduationCap />, value: '9.68', label: 'CGPA' },
    { icon: <FaCode />, value: '400+', label: 'DSA Problems' },
    { icon: <FaTrophy />, value: 'Top 45', label: 'Dream11 Gameathon' },
  ]

  return (
    <section className="about" id="about">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>
            I'm a passionate <strong>GenAi Developer and AI/ML Engineer</strong> currently
            pursuing my Bachelor's in Electronics & Telecommunications with AIML Honours at
            <strong> Pune Institute of Computer Technology (PICT)</strong>.
          </p>

          <p>
            With a <strong>CGPA of 9.68/10</strong>, I specialize in building advanced
            <strong> Dl models</strong>, backend
            applications, and embedded control systems. My expertise spans across Python, C/C++,
            FastAPI, and modern AI/ML technologies.
          </p>

          <p>
            I've worked with leading companies like <strong>Shoption Pvt. Ltd.</strong>,
            <strong> Aeronica Advance Technologies</strong>, and
            <strong> NxTechWorks Consulting</strong>, where I've developed multilingual RAG
            chatbots, implemented advanced control algorithms on STM32 microcontrollers, and
            created automated workflows.
          </p>

          <p>
            Beyond academics and work, I'm an active competitive programmer with over
            <strong> 400 solved DSA problems</strong> on LeetCode and GeeksforGeeks, and I ranked
            in the <strong>top 45 out of 650+ teams</strong> in the Dream11 Gameathon.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About


