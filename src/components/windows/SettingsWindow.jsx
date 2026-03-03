import { useState } from "react";

export default function SettingsWindow({ darkMode, onToggleDarkMode }) {
    const [activeTab, setActiveTab] = useState("appearance");

    return (
        <div>
            <div className="win-toolbar">
                <button
                    className={`win-toolbar-btn ${activeTab === "appearance" ? "active" : ""}`}
                    onClick={() => setActiveTab("appearance")}
                    style={activeTab === "appearance" ? { background: "#e5e5e5", borderColor: "#ccc" } : {}}
                >
                    🎨 Appearance
                </button>
                <button
                    className={`win-toolbar-btn ${activeTab === "system" ? "active" : ""}`}
                    onClick={() => setActiveTab("system")}
                    style={activeTab === "system" ? { background: "#e5e5e5", borderColor: "#ccc" } : {}}
                >
                    ⚙️ System
                </button>
            </div>

            <div className="win-content">
                {activeTab === "appearance" && (
                    <div>
                        <h2>🎨 Appearance Settings</h2>

                        {/* Theme toggle */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "16px",
                                background: darkMode ? "#2d2d2d" : "#f8f8f8",
                                border: `1px solid ${darkMode ? "#444" : "#ddd"}`,
                                borderRadius: 8,
                                marginBottom: 16,
                            }}
                        >
                            <div>
                                <h3 style={{ margin: 0, color: darkMode ? "#fff" : "#333" }}>
                                    {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                                </h3>
                                <p style={{ fontSize: 12, color: darkMode ? "#aaa" : "#666", margin: "4px 0 0" }}>
                                    {darkMode
                                        ? "Switch to light mode for a classic Windows look"
                                        : "Switch to dark mode for a modern feel"}
                                </p>
                            </div>
                            <button
                                onClick={onToggleDarkMode}
                                style={{
                                    width: 56,
                                    height: 28,
                                    borderRadius: 14,
                                    border: "none",
                                    background: darkMode
                                        ? "linear-gradient(135deg, #245ED8, #1941A5)"
                                        : "#ccc",
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "background 0.3s",
                                }}
                            >
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        background: "#fff",
                                        position: "absolute",
                                        top: 3,
                                        left: darkMode ? 31 : 3,
                                        transition: "left 0.3s",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                    }}
                                />
                            </button>
                        </div>

                        {/* Current theme info */}
                        <div style={{
                            padding: 12,
                            background: darkMode ? "#1e1e1e" : "#fff",
                            border: `1px solid ${darkMode ? "#333" : "#eee"}`,
                            borderRadius: 6,
                            fontSize: 12,
                        }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: darkMode ? "#aaa" : "#666" }}>Theme</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: darkMode ? "#fff" : "#333" }}>
                                            {darkMode ? "AryanOS Dark" : "AryanOS Classic"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: darkMode ? "#aaa" : "#666" }}>Wallpaper</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: darkMode ? "#fff" : "#333" }}>
                                            Auto-rotating (10s)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "4px 8px", color: darkMode ? "#aaa" : "#666" }}>Sounds</td>
                                        <td style={{ padding: "4px 8px", fontWeight: 600, color: darkMode ? "#fff" : "#333" }}>
                                            Enabled
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "system" && (
                    <div>
                        <h2>⚙️ System Information</h2>
                        <div style={{
                            padding: 12,
                            background: darkMode ? "#1e1e1e" : "#fff",
                            border: `1px solid ${darkMode ? "#333" : "#eee"}`,
                            borderRadius: 6,
                            fontSize: 12,
                        }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    {[
                                        ["OS", "AryanOS v1.0"],
                                        ["Developer", "Aryan Sahu"],
                                        ["Built With", "React + Vite"],
                                        ["Architecture", "Component-based"],
                                        ["Resolution", `${window.innerWidth} × ${window.innerHeight}`],
                                        ["User Agent", navigator.userAgent.slice(0, 60) + "..."],
                                    ].map(([key, val], i) => (
                                        <tr key={i} style={{ borderBottom: `1px solid ${darkMode ? "#333" : "#f0f0f0"}` }}>
                                            <td style={{ padding: "6px 8px", color: darkMode ? "#aaa" : "#666", width: "35%" }}>{key}</td>
                                            <td style={{ padding: "6px 8px", fontWeight: 500, color: darkMode ? "#ddd" : "#333" }}>{val}</td>
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
