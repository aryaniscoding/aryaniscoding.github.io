import { useState, useEffect } from "react";

export default function Taskbar({
    windows,
    activeWindow,
    onWindowClick,
    onStartClick,
    startOpen,
    darkMode,
    searchQuery,
    onSearchChange,
    searchResults,
    onSearchResultClick,
    minimizedWindows,
}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeStr = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const dateStr = time.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="taskbar">
            {/* Start button */}
            <button
                className={`start-button ${startOpen ? "active" : ""}`}
                onClick={onStartClick}
                title="Start"
            >
                ⊞
            </button>

            {/* Search box */}
            <div className="taskbar-search">
                <span className="taskbar-search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Search results dropdown */}
            {searchQuery && searchResults && searchResults.length > 0 && (
                <div className="taskbar-search-results">
                    {searchResults.map((result, i) => (
                        <div
                            key={i}
                            className="taskbar-search-result"
                            onClick={() => onSearchResultClick(result)}
                        >
                            <span className="taskbar-search-result-icon">{result.icon}</span>
                            <span>{result.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Open windows */}
            <div className="taskbar-windows">
                {windows.map((win) => {
                    const isMinimized = minimizedWindows && minimizedWindows.has(win.id);
                    return (
                        <button
                            key={win.id}
                            className={`taskbar-window-btn ${activeWindow === win.id && !isMinimized ? "active" : ""} ${isMinimized ? "minimized" : ""}`}
                            onClick={() => onWindowClick(win.id)}
                            title={win.title}
                        >
                            <span style={{ fontSize: 14 }}>{win.icon}</span>
                            {win.title}
                        </button>
                    );
                })}
            </div>

            {/* System tray */}
            <div className="taskbar-tray">
                <span style={{ cursor: "pointer", fontSize: 13 }} title="WiFi: Connected">📶</span>
                <span style={{ cursor: "pointer", fontSize: 13 }} title="Battery: 87%">🔋</span>
                <span style={{ cursor: "pointer", fontSize: 13 }} title="Volume">🔊</span>
                <div className="taskbar-clock">
                    <div style={{ fontWeight: 700 }}>{timeStr}</div>
                    <div style={{ fontSize: 9, opacity: 0.7 }}>{dateStr}</div>
                </div>
            </div>
        </div>
    );
}
