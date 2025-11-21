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
  SiFlask,
  SiFastapi,
  SiTensorflow,
  SiPandas,
  SiScikitlearn,
  SiPostgresql,
  SiJavascript,
  SiTailwindcss,
} from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', icon: <FaPython />, level: 95 },
        { name: 'C / C++', icon: <SiCplusplus />, level: 85 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 80 },
      ],
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'FastAPI', icon: <SiFastapi />, level: 90 },
        { name: 'Flask', icon: <SiFlask />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
      ],
    },
    {
      title: 'AI/ML & Data',
      skills: [
        { name: 'Pandas', icon: <SiPandas />, level: 90 },
        { name: 'TensorFlow', icon: <SiTensorflow />, level: 80 },
        { name: 'Scikit-learn', icon: <SiScikitlearn />, level: 85 },
      ],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Docker', icon: <FaDocker />, level: 80 },
        { name: 'Git', icon: <FaGitAlt />, level: 90 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 85 },
      ],
    },
  ]

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

      <div className="skills-container">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="skill-category"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="skill-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
