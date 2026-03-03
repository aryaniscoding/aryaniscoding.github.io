import { useState } from "react";
import { projectsData } from "@/lib/data";

export default function ProjectsWindow() {
    const [selected, setSelected] = useState(null);

    if (selected !== null) {
        const project = projectsData[selected];
        return (
            <div>
                <div className="win-breadcrumb">
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelected(null)}
                    >
                        📁 Projects
                    </span>
                    <span style={{ color: "#999" }}> › </span>
                    <span>{project.title}</span>
                </div>
                <div className="win-content">
                    <h2>{project.title}</h2>
                    <p style={{ marginBottom: 16, color: "#444" }}>{project.description}</p>

                    <h3>🔧 Technologies</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, marginTop: 6 }}>
                        {project.technologies.map((tech, i) => (
                            <span key={i} className="exp-badge exp-badge-tech">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {project.github && (
                        <div style={{ marginTop: 8 }}>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                style={{ display: "inline-flex" }}
                            >
                                <span className="social-link-icon">🐙</span>
                                View on GitHub
                            </a>
                        </div>
                    )}

                    {project.live && (
                        <div style={{ marginTop: 8 }}>
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                style={{ display: "inline-flex" }}
                            >
                                <span className="social-link-icon">🌐</span>
                                Live Demo
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="win-toolbar">
                <button className="win-toolbar-btn">📁 Projects</button>
                <span style={{ color: "#aaa" }}>|</span>
                <span style={{ fontSize: 11, color: "#777" }}>
                    {projectsData.length} items
                </span>
            </div>
            <div className="file-list">
                {projectsData.map((project, i) => (
                    <div
                        key={i}
                        className="file-item"
                        onDoubleClick={() => setSelected(i)}
                        onClick={() => setSelected(i)}
                    >
                        <span className="file-item-icon">
                            {project.featured ? "📂" : "📄"}
                        </span>
                        <span className="file-item-name">{project.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
