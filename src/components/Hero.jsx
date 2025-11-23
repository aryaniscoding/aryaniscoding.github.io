import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import './Hero.css'

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/aryaniscoding', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/aryan-sahu-131928277/', label: 'LinkedIn' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/aryan_sahu27/', label: 'LeetCode' },
    { icon: <FaEnvelope />, url: 'mailto:aryansahu2705@gmail.com', label: 'Email' },
  ]

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm
          </motion.p>
          
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Aryan Sahu
          </motion.h1>

          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            GenAi Developer & ML Engineer
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Electronics & Telecommunications student at PICT with expertise in building
            advanced GenAi systems ,Ml/Dl models and embedded systems.
          </motion.p>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#contact"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="/aryan_sahu_resume.pdf"
              download
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="image-container">
            <img src="/images/profile.jpg" alt="Aryan Sahu" />
          </div>
          <div className="floating-elements">
            <div className="float-item">PYTHON</div>
            <div className="float-item">DSA</div>
            <div className="float-item">OOP</div>
            <div className="float-item">DBMS</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
