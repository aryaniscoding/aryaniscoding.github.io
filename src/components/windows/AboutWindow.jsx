import { aboutData, socialLinks } from "@/lib/data";
import { AppIcon } from "../Icons";

const SOCIAL_ICON = { GitHub: "github", LinkedIn: "linkedin", Email: "mail" };

export default function AboutWindow() {
    return (
        <div className="win-content">
            {/* Identity header */}
            <div style={{ display: "flex", gap: 18, marginBottom: 20, alignItems: "flex-start" }}>
                <div style={{
                    width: 78, height: 78, borderRadius: 8,
                    background: "linear-gradient(135deg, #4f9be8, #1f6fcc)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 34, color: "#fff", fontWeight: 700, flexShrink: 0,
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 4px rgba(0,0,0,0.25)",
                }}>
                    AS
                </div>
                <div>
                    <h2 style={{ marginBottom: 4, borderBottom: "none", paddingBottom: 0 }}>Aryan Sahu</h2>
                    <p style={{ opacity: 0.85, marginBottom: 6 }}>GenAI Developer &amp; ML Engineer</p>
                    <p style={{ fontSize: 11.5, opacity: 0.65 }}>Electronics &amp; Telecommunications @ PICT, Pune</p>
                </div>
            </div>

            {/* Bio */}
            <div style={{ marginBottom: 20 }}>
                <h3>About</h3>
                {aboutData.bio.map((paragraph, i) => (
                    <p key={i} style={{ marginBottom: 8, opacity: 0.9 }}>{paragraph}</p>
                ))}
            </div>

            {/* Stats */}
            <div style={{ marginBottom: 20 }}>
                <h3>At a glance</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
                    <tbody>
                        {aboutData.stats.map((stat, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(128,128,128,0.18)" }}>
                                <td style={{ padding: "8px 12px", fontWeight: 600, width: "40%", opacity: 0.85 }}>{stat.label}</td>
                                <td style={{ padding: "8px 12px", color: "#2f74d0", fontWeight: 700, fontSize: 16 }}>{stat.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Social links */}
            <div>
                <h3>Connect</h3>
                <div className="social-grid">
                    {socialLinks.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                            <span className="social-link-icon"><AppIcon name={SOCIAL_ICON[link.name] || "globe"} size={16} /></span>
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
