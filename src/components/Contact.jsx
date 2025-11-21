import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  // ✅ ADD THIS - You were missing this function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    const formDataWeb3 = new FormData()
    formDataWeb3.append('access_key', '468d201d-4aec-4300-8d8c-655a39d390bd') // Replace with your actual key
    formDataWeb3.append('name', formData.name)
    formDataWeb3.append('email', formData.email)
    formDataWeb3.append('subject', formData.subject)
    formDataWeb3.append('message', formData.message)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataWeb3,
      })
      const data = await response.json()
      
      if (data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'aryansahu2705@gmail.com',
      link: 'mailto:aryansahu2705@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Pune, Maharashtra, India'
    },
  ]

  return (
    <section className="contact" id="contact">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>

      <div className="contact-container">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="contact-subtitle">Let's Work Together</h3>
          <p className="contact-description">
            I'm always interested in hearing about new projects and opportunities. Whether you have
            a question or just want to say hi, feel free to reach out!
          </p>

          <div className="contact-details">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                className="contact-detail-item"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-text">
                  <h4>{info.title}</h4>
                  <p>{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'} <FaPaperPlane />
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
