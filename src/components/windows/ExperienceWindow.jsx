import { experienceData } from "@/lib/data";
import { AppIcon } from "../Icons";

export default function ExperienceWindow() {
    return (
        <div>
            <div className="win-toolbar">
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                    <AppIcon name="experience" size={16} /> Experience
                </span>
                <span style={{ color: "#aac", margin: "0 4px" }}>|</span>
                <span style={{ fontSize: 11, color: "#777" }}>
                    {experienceData.length} positions
                </span>
            </div>
            <div className="win-content">
                {experienceData.map((exp, i) => (
                    <div key={i} className="exp-card">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 8,
                            }}
                        >
                            <div>
                                <h3 style={{ margin: 0 }}>
                                    {exp.role}
                                </h3>
                                <p style={{ color: "#245edb", fontWeight: 600, fontSize: 13, margin: "2px 0" }}>
                                    {exp.company}
                                </p>
                            </div>
                            <span
                                style={{
                                    fontSize: 11,
                                    color: "#666",
                                    background: "#f0f0f0",
                                    padding: "2px 10px",
                                    borderRadius: 10,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {exp.period}
                            </span>
                        </div>

                        <div style={{ marginBottom: 4 }}>
                            <span
                                className="exp-badge"
                                style={{
                                    background: exp.type === "Internship" ? "#e8f5e9" : "#e3f2fd",
                                    color: exp.type === "Internship" ? "#2e7d32" : "#1565c0",
                                }}
                            >
                                {exp.type}
                            </span>
                        </div>

                        <ul
                            style={{
                                paddingLeft: 18,
                                margin: "8px 0",
                                color: "#555",
                                fontSize: 12,
                                lineHeight: 1.7,
                            }}
                        >
                            {exp.description.map((point, j) => (
                                <li key={j}>{point}</li>
                            ))}
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 4,
                                marginTop: 8,
                            }}
                        >
                            {exp.technologies.map((tech, j) => (
                                <span key={j} className="exp-badge exp-badge-tech">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
