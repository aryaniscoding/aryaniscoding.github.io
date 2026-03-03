import { aboutData, socialLinks } from "@/lib/data";

export default function AboutWindow() {
    return (
        <div className="win-content">
            {/* System info header */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20, alignItems: "flex-start" }}>
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        background: "linear-gradient(135deg, #245edb, #3b7cf5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 36,
                        color: "#fff",
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    AS
                </div>
                <div>
                    <h2 style={{ marginBottom: 4, borderBottom: "none", paddingBottom: 0 }}>
                        Aryan Sahu
                    </h2>
                    <p style={{ color: "#666", marginBottom: 8 }}>
                        GenAI Developer & ML Engineer
                    </p>
                    <p style={{ fontSize: 12, color: "#888" }}>
                        Electronics & Telecommunications @ PICT, Pune
                    </p>
                </div>
            </div>

            {/* Bio */}
            <div style={{ marginBottom: 20 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    📋 System Information
                </h3>
                {aboutData.bio.map((paragraph, i) => (
                    <p key={i} style={{ marginBottom: 8, color: "#444" }}>
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Stats */}
            <div style={{ marginBottom: 20 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    📊 System Statistics
                </h3>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: 8,
                    }}
                >
                    <tbody>
                        {aboutData.stats.map((stat, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <td
                                    style={{
                                        padding: "8px 12px",
                                        fontWeight: 600,
                                        color: "#333",
                                        width: "40%",
                                    }}
                                >
                                    {stat.label}
                                </td>
                                <td
                                    style={{
                                        padding: "8px 12px",
                                        color: "#245edb",
                                        fontWeight: 700,
                                        fontSize: 16,
                                    }}
                                >
                                    {stat.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Social links */}
            <div>
                <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    🌐 Network Connections
                </h3>
                <div className="social-grid">
                    {socialLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <span className="social-link-icon">
                                {link.name === "GitHub" ? "🐙" : link.name === "LinkedIn" ? "💼" : "📧"}
                            </span>
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
