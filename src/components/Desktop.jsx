import { useReducer, useCallback, useEffect, useRef } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import { AppIcon } from "./Icons";
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

const TASKBAR_H = 40;

// Selectable wallpapers (all live in /public/wallpapers)
export const WALLPAPERS = [
    { id: "bliss", label: "Bliss", path: "/wallpapers/download.jpg" },
    { id: "win7", label: "Windows 7", path: "/wallpapers/black-aesthetic-windows-7-logo-hd-6wnoc34anmiz3ftn.jpg" },
    { id: "characters", label: "Characters", path: "/wallpapers/windows-7-turtle-art-bbd84op2wz46jq8o.jpg" },
];

// Window definitions — `icon` is now an Icons.jsx key
const WINDOW_DEFS = {
    about: { title: "About Me", icon: "about", component: AboutWindow, defaultPos: { x: 110, y: 44 }, defaultSize: { w: 560, h: 500 } },
    projects: { title: "Projects", icon: "projects", component: ProjectsWindow, defaultPos: { x: 170, y: 64 }, defaultSize: { w: 620, h: 470 } },
    experience: { title: "Experience", icon: "experience", component: ExperienceWindow, defaultPos: { x: 210, y: 52 }, defaultSize: { w: 650, h: 500 } },
    contact: { title: "Contact Me", icon: "contact", component: ContactWindow, defaultPos: { x: 250, y: 70 }, defaultSize: { w: 560, h: 520 } },
    settings: { title: "Control Panel", icon: "settings", component: SettingsWindow, defaultPos: { x: 180, y: 80 }, defaultSize: { w: 520, h: 460 }, passProps: true },
    recycle: { title: "Recycle Bin", icon: "recycle", component: RecycleBinWindow, defaultPos: { x: 130, y: 100 }, defaultSize: { w: 700, h: 450 } },
    chrome: { title: "Internet", icon: "chrome", component: ChromeWindow, defaultPos: { x: 150, y: 50 }, defaultSize: { w: 820, h: 560 } },
    clock: { title: "Clock", icon: "clock", component: ClockWidget, defaultPos: { x: 300, y: 80 }, defaultSize: { w: 300, h: 380 } },
    calendar: { title: "Calendar", icon: "calendar", component: CalendarWidget, defaultPos: { x: 280, y: 60 }, defaultSize: { w: 290, h: 350 } },
    notepad: { title: "Untitled - Notepad", icon: "notepad", component: NotepadWindow, defaultPos: { x: 200, y: 44 }, defaultSize: { w: 520, h: 430 } },
    paint: { title: "Untitled - Paint", icon: "paint", component: PaintWindow, defaultPos: { x: 100, y: 32 }, defaultSize: { w: 800, h: 530 } },
    minesweeper: { title: "Minesweeper", icon: "minesweeper", component: MinesweeperWindow, defaultPos: { x: 220, y: 60 }, defaultSize: { w: 320, h: 390 } },
    snake: { title: "Snake", icon: "snake", component: SnakeGame, defaultPos: { x: 240, y: 50 }, defaultSize: { w: 380, h: 440 } },
};

// Desktop icons (order = column fill)
const DESKTOP_ICONS = [
    { id: "about", icon: "about", label: "About Me" },
    { id: "projects", icon: "projects", label: "Projects" },
    { id: "experience", icon: "experience", label: "Experience" },
    { id: "contact", icon: "contact", label: "Contact Me" },
    { id: "settings", icon: "settings", label: "Control Panel" },
    { id: "github", icon: "github", label: "GitHub", url: "https://github.com/aryaniscoding" },
    { id: "linkedin", icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/aryan-sahu-131928277/" },
    { id: "resume", icon: "resume", label: "Resume.pdf", file: "/aryan_sahu_resume.pdf" },
    { id: "recycle", icon: "recycle", label: "Recycle Bin" },
    { id: "chrome", icon: "chrome", label: "Internet" },
    { id: "notepad", icon: "notepad", label: "Notepad" },
    { id: "paint", icon: "paint", label: "Paint" },
    { id: "minesweeper", icon: "minesweeper", label: "Minesweeper" },
    { id: "snake", icon: "snake", label: "Snake" },
    { id: "clock", icon: "clock", label: "Clock" },
    { id: "calendar", icon: "calendar", label: "Calendar" },
];

// Pinned quick-launch apps (taskbar, next to Start orb)
const QUICK_LAUNCH = ["chrome", "notepad", "paint"];

// Start-menu program list (left column)
const START_PROGRAMS = ["about", "experience", "projects", "contact", "settings", "notepad", "paint", "minesweeper", "snake"];

// Start-menu links (right column)
const START_LINKS = [
    { icon: "github", label: "GitHub", url: "https://github.com/aryaniscoding" },
    { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/aryan-sahu-131928277/" },
    { icon: "mail", label: "Email", url: "mailto:aryansahu2705@gmail.com" },
    { icon: "leetcode", label: "LeetCode", url: "https://leetcode.com/u/aryan_sahu27/" },
    { icon: "resume", label: "Resume", file: "/aryan_sahu_resume.pdf" },
];

// Items reachable from Start-menu search
const SEARCHABLE = DESKTOP_ICONS.filter((i) => i.id !== "recycle");

// ─── Shell store ────────────────────────────────────────
const initialState = () => {
    let wallpaper = WALLPAPERS[0].path;
    let darkMode = false;
    try {
        const w = localStorage.getItem("aryanos.wallpaper");
        if (w && WALLPAPERS.some((x) => x.path === w)) wallpaper = w;
        darkMode = localStorage.getItem("aryanos.dark") === "1";
    } catch { /* localStorage unavailable */ }
    return {
        windows: [],
        activeId: null,
        zTop: 100,
        idSeq: 0,
        startOpen: false,
        contextMenu: null,
        selectedIcon: null,
        wallpaper,
        darkMode,
        refreshing: false,
    };
};

function topVisibleId(windows, excludeId) {
    let best = null;
    for (const w of windows) {
        if (w.id === excludeId || w.minimized) continue;
        if (!best || w.z > best.z) best = w;
    }
    return best ? best.id : null;
}

function reducer(state, action) {
    switch (action.type) {
        case "OPEN": {
            const def = WINDOW_DEFS[action.id];
            if (!def) return state;
            const existing = state.windows.find((w) => w.defId === action.id);
            const z = state.zTop + 1;
            if (existing) {
                return {
                    ...state,
                    zTop: z,
                    activeId: existing.id,
                    startOpen: false,
                    windows: state.windows.map((w) =>
                        w.id === existing.id ? { ...w, minimized: false, z } : w
                    ),
                };
            }
            const newId = `${action.id}-${state.idSeq}`;
            return {
                ...state,
                idSeq: state.idSeq + 1,
                zTop: z,
                activeId: newId,
                startOpen: false,
                windows: [
                    ...state.windows,
                    { id: newId, defId: action.id, title: def.title, icon: def.icon, minimized: false, maximized: false, z },
                ],
            };
        }
        case "CLOSE": {
            const windows = state.windows.filter((w) => w.id !== action.winId);
            return {
                ...state,
                windows,
                activeId: state.activeId === action.winId ? topVisibleId(windows) : state.activeId,
            };
        }
        case "FOCUS": {
            if (state.activeId === action.winId) return state;
            const z = state.zTop + 1;
            return {
                ...state,
                zTop: z,
                activeId: action.winId,
                windows: state.windows.map((w) => (w.id === action.winId ? { ...w, z } : w)),
            };
        }
        case "MINIMIZE": {
            const windows = state.windows.map((w) =>
                w.id === action.winId ? { ...w, minimized: true } : w
            );
            return {
                ...state,
                windows,
                activeId: state.activeId === action.winId ? topVisibleId(windows) : state.activeId,
            };
        }
        case "TASKBAR_CLICK": {
            const win = state.windows.find((w) => w.id === action.winId);
            if (!win) return state;
            // active + visible → minimize; otherwise restore + focus
            if (state.activeId === action.winId && !win.minimized) {
                const windows = state.windows.map((w) => (w.id === action.winId ? { ...w, minimized: true } : w));
                return { ...state, windows, activeId: topVisibleId(windows) };
            }
            const z = state.zTop + 1;
            return {
                ...state,
                zTop: z,
                activeId: action.winId,
                windows: state.windows.map((w) => (w.id === action.winId ? { ...w, minimized: false, z } : w)),
            };
        }
        case "TOGGLE_MAX": {
            const z = state.zTop + 1;
            return {
                ...state,
                zTop: z,
                activeId: action.winId,
                windows: state.windows.map((w) =>
                    w.id === action.winId ? { ...w, maximized: !w.maximized, minimized: false, z } : w
                ),
            };
        }
        case "MINIMIZE_ALL": {
            const anyVisible = state.windows.some((w) => !w.minimized);
            return {
                ...state,
                startOpen: false,
                activeId: anyVisible ? null : state.activeId,
                windows: state.windows.map((w) => ({ ...w, minimized: anyVisible })),
            };
        }
        case "TOGGLE_START":
            return { ...state, startOpen: !state.startOpen, contextMenu: null };
        case "SET_START":
            return { ...state, startOpen: action.open };
        case "SET_CONTEXT":
            return { ...state, contextMenu: action.menu, startOpen: false };
        case "SELECT_ICON":
            return { ...state, selectedIcon: action.id };
        case "CLEAR_TRANSIENT":
            return { ...state, startOpen: false, contextMenu: null, selectedIcon: null };
        case "SET_WALLPAPER":
            return { ...state, wallpaper: action.path, contextMenu: null };
        case "CYCLE_WALLPAPER": {
            const i = WALLPAPERS.findIndex((w) => w.path === state.wallpaper);
            return { ...state, wallpaper: WALLPAPERS[(i + 1) % WALLPAPERS.length].path, contextMenu: null };
        }
        case "TOGGLE_DARK":
            return { ...state, darkMode: !state.darkMode };
        case "SET_REFRESHING":
            return { ...state, refreshing: action.value, contextMenu: null };
        default:
            return state;
    }
}

export default function Desktop({ onShutdown }) {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    const refreshTimer = useRef(null);

    // Persist theme + wallpaper
    useEffect(() => {
        try { localStorage.setItem("aryanos.dark", state.darkMode ? "1" : "0"); } catch { /* ignore */ }
    }, [state.darkMode]);
    useEffect(() => {
        try { localStorage.setItem("aryanos.wallpaper", state.wallpaper); } catch { /* ignore */ }
    }, [state.wallpaper]);

    useEffect(() => () => clearTimeout(refreshTimer.current), []);

    const openWindow = useCallback((id) => { playOpenSound(); dispatch({ type: "OPEN", id }); }, []);
    const closeWindow = useCallback((winId) => { playCloseSound(); dispatch({ type: "CLOSE", winId }); }, []);
    const focusWindow = useCallback((winId) => dispatch({ type: "FOCUS", winId }), []);
    const minimizeWindow = useCallback((winId) => { playMinimizeSound(); dispatch({ type: "MINIMIZE", winId }); }, []);
    const toggleMaximize = useCallback((winId) => dispatch({ type: "TOGGLE_MAX", winId }), []);
    const toggleDarkMode = useCallback(() => { playClickSound(); dispatch({ type: "TOGGLE_DARK" }); }, []);
    const setWallpaper = useCallback((path) => { playClickSound(); dispatch({ type: "SET_WALLPAPER", path }); }, []);

    const handleTaskbarWindowClick = useCallback((winId) => { playClickSound(); dispatch({ type: "TASKBAR_CLICK", winId }); }, []);
    const handleStartClick = useCallback(() => { playMenuSound(); dispatch({ type: "TOGGLE_START" }); }, []);

    const handleIconActivate = useCallback((icon) => {
        playClickSound();
        if (icon.url) { window.open(icon.url, "_blank", "noopener"); return; }
        if (icon.file) { window.open(icon.file, "_blank", "noopener"); return; }
        dispatch({ type: "OPEN", id: icon.id });
    }, []);

    const handleDesktopMouseDown = (e) => {
        if (e.target === e.currentTarget) dispatch({ type: "CLEAR_TRANSIENT" });
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        const x = Math.min(e.clientX, window.innerWidth - 200);
        const y = Math.min(e.clientY, window.innerHeight - 200);
        dispatch({ type: "SET_CONTEXT", menu: { x, y } });
    };

    const triggerRefresh = () => {
        dispatch({ type: "SET_REFRESHING", value: true });
        clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(() => dispatch({ type: "SET_REFRESHING", value: false }), 220);
    };

    const { windows, activeId, startOpen, contextMenu, selectedIcon, wallpaper, darkMode, refreshing } = state;

    return (
        <div
            className={`desktop ${darkMode ? "dark-mode" : "light-mode"}`}
            onMouseDown={handleDesktopMouseDown}
            onContextMenu={handleContextMenu}
        >
            {/* Wallpaper */}
            <div className="desktop-wallpaper" style={{ backgroundImage: `url(${wallpaper})` }} />
            {darkMode && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 0, pointerEvents: "none" }} />
            )}

            {/* Desktop icons */}
            <div
                className={`desktop-icons ${refreshing ? "refreshing" : ""}`}
                style={refreshing ? { animation: "fadeIn 0.22s ease" } : undefined}
                onMouseDown={handleDesktopMouseDown}
            >
                {DESKTOP_ICONS.map((icon) => (
                    <div
                        key={icon.id}
                        className={`desktop-icon ${selectedIcon === icon.id ? "selected" : ""}`}
                        onMouseDown={(e) => { e.stopPropagation(); dispatch({ type: "SELECT_ICON", id: icon.id }); }}
                        onDoubleClick={() => handleIconActivate(icon)}
                    >
                        <div className="desktop-icon-img"><AppIcon name={icon.icon} size={34} /></div>
                        <div className="desktop-icon-label">{icon.label}</div>
                    </div>
                ))}
            </div>

            {/* Windows */}
            {windows.map((win) => {
                const def = WINDOW_DEFS[win.defId];
                if (!def) return null;
                const ContentComponent = def.component;
                const extraProps = def.passProps
                    ? { darkMode, onToggleDarkMode: toggleDarkMode, wallpaper, wallpapers: WALLPAPERS, onSetWallpaper: setWallpaper }
                    : {};
                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        icon={win.icon}
                        zIndex={win.z}
                        isActive={activeId === win.id}
                        isMinimized={win.minimized}
                        isMaximized={win.maximized}
                        onFocus={focusWindow}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onToggleMaximize={toggleMaximize}
                        defaultPosition={def.defaultPos}
                        defaultSize={def.defaultSize}
                        taskbarHeight={TASKBAR_H}
                    >
                        <ContentComponent {...extraProps} />
                    </Window>
                );
            })}

            {/* Start menu */}
            {startOpen && (
                <StartMenu
                    programs={START_PROGRAMS.map((id) => ({ id, icon: WINDOW_DEFS[id].icon, label: WINDOW_DEFS[id].title }))}
                    links={START_LINKS}
                    searchable={SEARCHABLE}
                    onOpen={(id) => dispatch({ type: "OPEN", id })}
                    onClose={() => dispatch({ type: "SET_START", open: false })}
                    onShutdown={onShutdown}
                />
            )}

            {/* Taskbar */}
            <Taskbar
                windows={windows}
                activeId={activeId}
                quickLaunch={QUICK_LAUNCH.map((id) => ({ id, icon: WINDOW_DEFS[id].icon, title: WINDOW_DEFS[id].title }))}
                onQuickLaunch={openWindow}
                onWindowClick={handleTaskbarWindowClick}
                onStartClick={handleStartClick}
                startOpen={startOpen}
                onShowDesktop={() => { playClickSound(); dispatch({ type: "MINIMIZE_ALL" }); }}
            />

            {/* Context menu */}
            {contextMenu && (
                <div
                    className="context-menu"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <div className="context-menu-item" onClick={triggerRefresh}>Refresh</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={() => dispatch({ type: "CYCLE_WALLPAPER" })}>Next desktop background</div>
                    <div className="context-menu-item" onClick={() => { dispatch({ type: "OPEN", id: "settings" }); }}>Personalize</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={() => { dispatch({ type: "OPEN", id: "settings" }); }}>Screen resolution</div>
                </div>
            )}
        </div>
    );
}
