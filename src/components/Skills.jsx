import React from 'react'
import { motion } from 'framer-motion'
import {
  FaPython,
  FaDocker,
  FaGitAlt,
  FaDatabase,
} from 'react-icons/fa'
import {
  SiCplusplus,
  SiMysql,
  SiFastapi,
  SiTensorflow,
  SiPandas,
  SiScikitlearn,
  SiGooglecloud,
  SiNumpy,
  SiPlotly,
} from 'react-icons/si'
import { TbMathFunction } from 'react-icons/tb'
import './Skills.css'

const Skills = () => {
  const allSkills = [
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'C / C++', icon: <SiCplusplus />, color: '#00599C' },
    { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
    { name: 'PostgreSQL', icon: <FaDatabase />, color: '#336791' },
    { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'pgvector', icon: <FaDatabase />, color: '#336791' },
    { name: 'FAISS', icon: <TbMathFunction />, color: '#00A8E8' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'GCP', icon: <SiGooglecloud />, color: '#4285F4' },
    { name: 'Scikit-learn', icon: <SiScikitlearn />, color: '#F7931E' },
    { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
    { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
    { name: 'NumPy', icon: <SiNumpy />, color: '#013243' },
    { name: 'Seaborn', icon: <SiPlotly />, color: '#3776AB' },
    { name: 'Matplotlib', icon: <SiPlotly />, color: '#11557C' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="skills" id="skills">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills & Technologies
      </motion.h2>

      <motion.div
        className="skills-grid-horizontal"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {allSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card-horizontal"
            variants={itemVariants}
            whileHover={{
              scale: 1.15,
              y: -10,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            style={{ '--skill-color': skill.color }}
          >
            <div className="skill-icon-horizontal">{skill.icon}</div>
            <span className="skill-name-horizontal">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills
