import { useState, useEffect } from "react";
import { AppIcon, WindowsFlag, TrayNetwork, TraySpeaker, TrayBattery } from "./Icons";

export default function Taskbar({
    windows,
    activeId,
    quickLaunch,
    onQuickLaunch,
    onWindowClick,
    onStartClick,
    startOpen,
    onShowDesktop,
}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeStr = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const dateStr = time.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

    return (
        <div className="taskbar">
            <button
                className={`start-orb ${startOpen ? "active" : ""}`}
                onClick={onStartClick}
                title="Start"
                aria-label="Start"
            >
                <WindowsFlag size={26} />
            </button>

            {quickLaunch && quickLaunch.length > 0 && (
                <div className="taskbar-quicklaunch">
                    {quickLaunch.map((app) => (
                        <button
                            key={app.id}
                            className="quicklaunch-btn"
                            onClick={() => onQuickLaunch(app.id)}
                            title={app.title}
                        >
                            <AppIcon name={app.icon} size={20} />
                        </button>
                    ))}
                </div>
            )}

            <div className="taskbar-windows">
                {windows.map((win) => {
                    const active = activeId === win.id && !win.minimized;
                    return (
                        <button
                            key={win.id}
                            className={`taskbar-window-btn ${active ? "active" : ""} ${win.minimized ? "minimized" : ""}`}
                            onClick={() => onWindowClick(win.id)}
                            title={win.title}
                        >
                            <AppIcon name={win.icon} size={18} />
                            <span className="tw-label">{win.title}</span>
                        </button>
                    );
                })}
            </div>

            <div className="taskbar-tray">
                <span className="taskbar-tray-icon" title="Network: Connected"><TrayNetwork /></span>
                <span className="taskbar-tray-icon" title="Volume"><TraySpeaker /></span>
                <span className="taskbar-tray-icon" title="Battery: 87%"><TrayBattery /></span>
                <div className="taskbar-clock" title={time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}>
                    <div>{timeStr}</div>
                    <div style={{ fontSize: 9, opacity: 0.8 }}>{dateStr}</div>
                </div>
                <div className="show-desktop" title="Show desktop" onClick={onShowDesktop} />
            </div>
        </div>
    );
}
