import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/aryaniscoding' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/aryan-sahu-131928277/' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/aryan_sahu27/' },
    { icon: <FaEnvelope />, url: 'mailto:aryansahu2705@gmail.com' },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="footer-text">
          Designed & Built by Aryan Sahu
        </p>

        <p className="footer-copyright">© {currentYear} Aryan Sahu. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
