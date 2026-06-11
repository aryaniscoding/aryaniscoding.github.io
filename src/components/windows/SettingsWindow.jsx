import { useState } from "react";

export default function SettingsWindow({ darkMode, onToggleDarkMode, wallpaper, wallpapers = [], onSetWallpaper }) {
    const [activeTab, setActiveTab] = useState("appearance");
    const currentWp = wallpapers.find((w) => w.path === wallpaper);

    const cardBg = darkMode ? "#2b3037" : "#f7fafd";
    const cardBorder = darkMode ? "#3a4048" : "#dbe4ee";
    const subText = darkMode ? "#aab3bd" : "#5a708c";
    const mainText = darkMode ? "#eef3fa" : "#1f3a5c";

    return (
        <div>
            <div className="win-toolbar">
                <button
                    className="win-toolbar-btn"
                    onClick={() => setActiveTab("appearance")}
                    style={activeTab === "appearance" ? { background: "linear-gradient(180deg,#f4faff,#dcecff)", borderColor: "#a9cbeb" } : {}}
                >
                    Appearance
                </button>
                <button
                    className="win-toolbar-btn"
                    onClick={() => setActiveTab("system")}
                    style={activeTab === "system" ? { background: "linear-gradient(180deg,#f4faff,#dcecff)", borderColor: "#a9cbeb" } : {}}
                >
                    System
                </button>
            </div>

            <div className="win-content">
                {activeTab === "appearance" && (
                    <div>
                        <h2>Personalization</h2>

                        {/* Theme toggle */}
                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: 14, background: cardBg, border: `1px solid ${cardBorder}`,
                            borderRadius: 6, marginBottom: 16,
                        }}>
                            <div>
                                <h3 style={{ margin: 0, color: mainText }}>
                                    {darkMode ? "Dark theme" : "Aero theme"}
                                </h3>
                                <p style={{ fontSize: 11.5, color: subText, margin: "4px 0 0" }}>
                                    {darkMode
                                        ? "Switch back to the classic light Aero look"
                                        : "Switch to a darkened graphite theme"}
                                </p>
                            </div>
                            <button
                                onClick={onToggleDarkMode}
                                aria-label="Toggle theme"
                                style={{
                                    width: 56, height: 26, borderRadius: 13, border: "none",
                                    background: darkMode ? "linear-gradient(135deg,#4f9be8,#1f6fcc)" : "#c2ccd6",
                                    cursor: "pointer", position: "relative", transition: "background 0.3s",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
                                }}
                            >
                                <div style={{
                                    width: 20, height: 20, borderRadius: "50%", background: "#fff",
                                    position: "absolute", top: 3, left: darkMode ? 33 : 3,
                                    transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
                                }} />
                            </button>
                        </div>

                        {/* Wallpaper picker */}
                        <h3 style={{ marginBottom: 8 }}>Desktop background</h3>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                            {wallpapers.map((wp) => {
                                const selected = wp.path === wallpaper;
                                return (
                                    <button
                                        key={wp.id}
                                        onClick={() => onSetWallpaper(wp.path)}
                                        title={wp.label}
                                        style={{
                                            width: 116, padding: 0, cursor: "pointer",
                                            border: `2px solid ${selected ? "#2f74d0" : cardBorder}`,
                                            borderRadius: 5, overflow: "hidden", background: "none",
                                            boxShadow: selected ? "0 0 0 2px rgba(47,116,208,0.3)" : "none",
                                        }}
                                    >
                                        <div style={{
                                            width: "100%", height: 70,
                                            backgroundImage: `url(${wp.path})`, backgroundSize: "cover", backgroundPosition: "center",
                                        }} />
                                        <div style={{
                                            fontSize: 11, padding: "3px 4px", textAlign: "center",
                                            background: selected ? "#2f74d0" : (darkMode ? "#23272d" : "#eef3fa"),
                                            color: selected ? "#fff" : (darkMode ? "#cdd6e0" : "#3a4858"),
                                        }}>
                                            {wp.label}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Current settings */}
                        <div style={{ padding: 12, background: darkMode ? "#1e2227" : "#fff", border: `1px solid ${cardBorder}`, borderRadius: 5, fontSize: 12 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: subText }}>Theme</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: mainText }}>
                                            {darkMode ? "AryanOS Graphite" : "AryanOS Aero"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: subText }}>Background</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: mainText }}>
                                            {currentWp ? currentWp.label : "Custom"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: subText }}>System sounds</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: mainText }}>Enabled</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "system" && (
                    <div>
                        <h2>System</h2>
                        <div style={{ padding: 12, background: darkMode ? "#1e2227" : "#fff", border: `1px solid ${cardBorder}`, borderRadius: 5, fontSize: 12 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    {[
                                        ["Edition", "AryanOS v1.0 — Portfolio Edition"],
                                        ["Developer", "Aryan Sahu"],
                                        ["Built with", "React 18 + Vite"],
                                        ["Architecture", "Component-based shell"],
                                        ["Resolution", `${window.innerWidth} × ${window.innerHeight}`],
                                        ["User agent", navigator.userAgent.slice(0, 58) + "…"],
                                    ].map(([key, val], i) => (
                                        <tr key={i} style={{ borderBottom: `1px solid ${darkMode ? "#3a4048" : "#f0f3f7"}` }}>
                                            <td style={{ padding: "6px 8px", color: subText, width: "35%" }}>{key}</td>
                                            <td style={{ padding: "6px 8px", fontWeight: 500, color: darkMode ? "#dde2e8" : "#2a2a2a" }}>{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
