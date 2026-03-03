import { useState, useCallback, useMemo } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import ContactWindow from "./windows/ContactWindow";
import SettingsWindow from "./windows/SettingsWindow";
import RecycleBinWindow from "./windows/RecycleBinWindow";
import ChromeWindow from "./windows/ChromeWindow";
import ClockWidget from "./windows/ClockWidget";
import CalendarWidget from "./windows/CalendarWidget";
import NotepadWindow from "./windows/NotepadWindow";
import PaintWindow from "./windows/PaintWindow";
import MinesweeperWindow from "./windows/MinesweeperWindow";
import SnakeGame from "./windows/SnakeGame";
import {
    playOpenSound,
    playCloseSound,
    playClickSound,
    playMenuSound,
    playMinimizeSound,
} from "@/lib/sounds";

// Single wallpaper
const WALLPAPER = "/wallpapers/download.jpg";

// Window definitions
const WINDOW_DEFS = {
    about: {
        title: "About Me",
        icon: "👤",
        component: AboutWindow,
        defaultPos: { x: 100, y: 40 },
        defaultSize: { w: 550, h: 500 },
    },
    projects: {
        title: "Projects",
        icon: "📁",
        component: ProjectsWindow,
        defaultPos: { x: 160, y: 60 },
        defaultSize: { w: 620, h: 470 },
    },
    experience: {
        title: "Experience",
        icon: "💼",
        component: ExperienceWindow,
        defaultPos: { x: 200, y: 50 },
        defaultSize: { w: 640, h: 500 },
    },
    contact: {
        title: "Contact Me",
        icon: "✉️",
        component: ContactWindow,
        defaultPos: { x: 250, y: 70 },
        defaultSize: { w: 550, h: 520 },
    },
    settings: {
        title: "Settings",
        icon: "⚙️",
        component: SettingsWindow,
        defaultPos: { x: 180, y: 80 },
        defaultSize: { w: 480, h: 420 },
        passProps: true,
    },
    recycle: {
        title: "Recycle Bin",
        icon: "🗑️",
        component: RecycleBinWindow,
        defaultPos: { x: 120, y: 100 },
        defaultSize: { w: 700, h: 450 },
    },
    chrome: {
        title: "Google Chrome",
        icon: "🌐",
        component: ChromeWindow,
        defaultPos: { x: 150, y: 50 },
        defaultSize: { w: 800, h: 550 },
    },
    clock: {
        title: "Clock",
        icon: "🕰️",
        component: ClockWidget,
        defaultPos: { x: 300, y: 80 },
        defaultSize: { w: 300, h: 380 },
    },
    calendar: {
        title: "Calendar",
        icon: "📅",
        component: CalendarWidget,
        defaultPos: { x: 280, y: 60 },
        defaultSize: { w: 280, h: 340 },
    },
    notepad: {
        title: "Notepad",
        icon: "📝",
        component: NotepadWindow,
        defaultPos: { x: 200, y: 40 },
        defaultSize: { w: 500, h: 420 },
    },
    paint: {
        title: "Paint",
        icon: "🎨",
        component: PaintWindow,
        defaultPos: { x: 100, y: 30 },
        defaultSize: { w: 780, h: 520 },
    },
    minesweeper: {
        title: "Minesweeper",
        icon: "💣",
        component: MinesweeperWindow,
        defaultPos: { x: 220, y: 60 },
        defaultSize: { w: 310, h: 380 },
    },
    snake: {
        title: "Snake",
        icon: "🐍",
        component: SnakeGame,
        defaultPos: { x: 240, y: 50 },
        defaultSize: { w: 370, h: 430 },
    },
};

// Desktop icons
const DESKTOP_ICONS = [
    { id: "about", icon: "👤", label: "About Me" },
    { id: "projects", icon: "📁", label: "Projects" },
    { id: "experience", icon: "💼", label: "Experience" },
    { id: "contact", icon: "✉️", label: "Contact Me" },
    { id: "settings", icon: "⚙️", label: "Settings" },
    { id: "github", icon: "🐙", label: "GitHub", url: "https://github.com/aryaniscoding" },
    { id: "linkedin", icon: "🔗", label: "LinkedIn", url: "https://www.linkedin.com/in/aryan-sahu-131928277/" },
    { id: "resume", icon: "📄", label: "Resume.pdf", file: "/aryan_sahu_resume.pdf" },
    { id: "recycle", icon: "🗑️", label: "Recycle Bin" },
    { id: "chrome", icon: "🌐", label: "Chrome" },
    { id: "notepad", icon: "📝", label: "Notepad" },
    { id: "paint", icon: "🎨", label: "Paint" },
    { id: "minesweeper", icon: "💣", label: "Minesweeper" },
    { id: "snake", icon: "🐍", label: "Snake" },
    { id: "clock", icon: "🕰️", label: "Clock" },
    { id: "calendar", icon: "📅", label: "Calendar" },
];

// All searchable items
const SEARCHABLE_ITEMS = DESKTOP_ICONS.filter((i) => i.id !== "recycle").map((i) => ({
    id: i.id,
    icon: i.icon,
    label: i.label,
    url: i.url,
    file: i.file,
}));

export default function Desktop({ onShutdown }) {
    const [openWindows, setOpenWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const [minimizedWindows, setMinimizedWindows] = useState(new Set());
    const [startOpen, setStartOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [windowCounter, setWindowCounter] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [contextMenu, setContextMenu] = useState(null);

    // Search results
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return SEARCHABLE_ITEMS.filter((item) =>
            item.label.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const toggleDarkMode = useCallback(() => {
        setDarkMode((d) => !d);
        playClickSound();
    }, []);

    const openWindow = useCallback(
        (id) => {
            // If already open, restore it if minimized and focus
            const existing = openWindows.find((w) => w.defId === id);
            if (existing) {
                setMinimizedWindows((prev) => {
                    const next = new Set(prev);
                    next.delete(existing.id);
                    return next;
                });
                setActiveWindow(existing.id);
                return;
            }

            const def = WINDOW_DEFS[id];
            if (!def) return;

            playOpenSound();

            const newId = `${id}-${windowCounter}`;
            setWindowCounter((c) => c + 1);
            setOpenWindows((prev) => [
                ...prev,
                {
                    id: newId,
                    defId: id,
                    title: def.title,
                    icon: def.icon,
                },
            ]);
            setActiveWindow(newId);
        },
        [openWindows, windowCounter]
    );

    const closeWindow = useCallback(
        (winId) => {
            playCloseSound();
            setOpenWindows((prev) => prev.filter((w) => w.id !== winId));
            setMinimizedWindows((prev) => {
                const next = new Set(prev);
                next.delete(winId);
                return next;
            });
            if (activeWindow === winId) {
                setActiveWindow(null);
            }
        },
        [activeWindow]
    );

    const minimizeWindow = useCallback(
        (winId) => {
            playMinimizeSound();
            setMinimizedWindows((prev) => {
                const next = new Set(prev);
                next.add(winId);
                return next;
            });
            if (activeWindow === winId) {
                setActiveWindow(null);
            }
        },
        [activeWindow]
    );

    const handleTaskbarWindowClick = useCallback(
        (winId) => {
            playClickSound();
            // If already active and not minimized, minimize it
            if (activeWindow === winId && !minimizedWindows.has(winId)) {
                minimizeWindow(winId);
                return;
            }
            // Otherwise restore and focus
            setMinimizedWindows((prev) => {
                const next = new Set(prev);
                next.delete(winId);
                return next;
            });
            setActiveWindow(winId);
        },
        [activeWindow, minimizedWindows, minimizeWindow]
    );

    const handleIconDoubleClick = (icon) => {
        playClickSound();
        if (icon.url) {
            window.open(icon.url, "_blank");
            return;
        }
        if (icon.file) {
            window.open(icon.file, "_blank");
            return;
        }
        if (icon.id === "recycle") {
            openWindow("recycle");
            return;
        }
        openWindow(icon.id);
    };

    const handleDesktopClick = (e) => {
        setContextMenu(null);
        if (e.target === e.currentTarget) {
            setSelectedIcon(null);
            setStartOpen(false);
            setSearchQuery("");
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleStartClick = () => {
        playMenuSound();
        setStartOpen((o) => !o);
    };

    const handleSearchResultClick = (result) => {
        if (result.url) {
            window.open(result.url, "_blank");
        } else if (result.file) {
            window.open(result.file, "_blank");
        } else {
            openWindow(result.id);
        }
        setSearchQuery("");
    };

    return (
        <div
            className={`desktop ${darkMode ? "dark-mode" : "light-mode"}`}
            onClick={handleDesktopClick}
            onContextMenu={handleContextMenu}
        >
            {/* Wallpaper */}
            <div
                className="desktop-wallpaper"
                style={{
                    backgroundImage: `url(${WALLPAPER})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Dark mode overlay */}
            {darkMode && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                        zIndex: 0,
                    }}
                />
            )}

            {/* Desktop icons - vertical columns */}
            <div className="desktop-icons" onClick={handleDesktopClick}>
                {DESKTOP_ICONS.map((icon) => (
                    <div
                        key={icon.id}
                        className={`desktop-icon ${selectedIcon === icon.id ? "selected" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            setSelectedIcon(icon.id);
                        }}
                        onDoubleClick={() => handleIconDoubleClick(icon)}
                    >
                        <div className="desktop-icon-img">{icon.icon}</div>
                        <div className="desktop-icon-label">{icon.label}</div>
                    </div>
                ))}
            </div>

            {/* Windows */}
            {openWindows.map((win) => {
                const def = WINDOW_DEFS[win.defId];
                if (!def) return null;
                const ContentComponent = def.component;
                const extraProps = def.passProps
                    ? { darkMode, onToggleDarkMode: toggleDarkMode }
                    : {};
                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        icon={win.icon}
                        isActive={activeWindow === win.id}
                        isMinimized={minimizedWindows.has(win.id)}
                        onFocus={() => setActiveWindow(win.id)}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        defaultPosition={def.defaultPos}
                        defaultSize={def.defaultSize}
                        darkMode={darkMode}
                    >
                        <ContentComponent {...extraProps} />
                    </Window>
                );
            })}

            {/* Start menu */}
            {startOpen && (
                <StartMenu
                    onOpen={(id) => {
                        openWindow(id);
                        setStartOpen(false);
                    }}
                    onClose={() => setStartOpen(false)}
                    onShutdown={onShutdown}
                    darkMode={darkMode}
                />
            )}

            {/* Taskbar */}
            <Taskbar
                windows={openWindows}
                activeWindow={activeWindow}
                minimizedWindows={minimizedWindows}
                onWindowClick={handleTaskbarWindowClick}
                onStartClick={handleStartClick}
                startOpen={startOpen}
                darkMode={darkMode}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchResults={searchResults}
                onSearchResultClick={handleSearchResultClick}
            />

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="context-menu"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>View</div>
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>Sort by</div>
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>Refresh</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>Paste</div>
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>Paste shortcut</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={() => { setContextMenu(null); }}>New</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={() => { setDarkMode(!darkMode); setContextMenu(null); }}>Personalize</div>
                </div>
            )}
        </div>
    );
}
