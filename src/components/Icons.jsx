// ─────────────────────────────────────────────────────────────
// Windows 7-style SVG icon set.
// Hand-built (no proprietary assets) — glossy, gradient-filled,
// free-form icons that replace the emoji used across the shell.
// All icons draw inside a 0 0 48 48 viewBox and scale via `size`.
// ─────────────────────────────────────────────────────────────

const svgProps = (size) => ({
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    style: { display: "block" },
});

// Subtle gloss overlay reused by several icons
const Gloss = ({ id, rx = 6 }) => (
    <rect x="6" y="6" width="36" height="14" rx={rx} fill={`url(#${id})`} opacity="0.5" />
);

function AboutIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-about" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7fc0ff" />
                    <stop offset="1" stopColor="#2f74d0" />
                </linearGradient>
            </defs>
            <circle cx="24" cy="14" r="9" fill="url(#ic-about)" stroke="#1b4f96" strokeWidth="1.2" />
            <ellipse cx="20" cy="11" rx="4" ry="3" fill="#fff" opacity="0.35" />
            <path d="M8 42c0-9 7-15 16-15s16 6 16 15z" fill="url(#ic-about)" stroke="#1b4f96" strokeWidth="1.2" />
        </svg>
    );
}

function FolderIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-folder-b" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffd87a" />
                    <stop offset="1" stopColor="#e7a838" />
                </linearGradient>
                <linearGradient id="ic-folder-f" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff0c2" />
                    <stop offset="1" stopColor="#f5c451" />
                </linearGradient>
            </defs>
            <path d="M5 13c0-1.5 1-2.5 2.5-2.5H18l3.5 4H40c1.5 0 2.5 1 2.5 2.5v6H5z" fill="url(#ic-folder-b)" stroke="#b9831f" strokeWidth="1" />
            <path d="M5 19c0-1.4 1-2.4 2.5-2.4h33c1.5 0 2.5 1 2.5 2.4l-3 18c-.2 1.4-1.2 2.2-2.6 2.2H10.6c-1.4 0-2.4-.8-2.6-2.2z" fill="url(#ic-folder-f)" stroke="#cf9b2c" strokeWidth="1" />
            <path d="M8 20h32l-.5 4H8.5z" fill="#fff" opacity="0.4" />
        </svg>
    );
}

function BriefcaseIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-brief" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#a9743f" />
                    <stop offset="1" stopColor="#6e451f" />
                </linearGradient>
            </defs>
            <rect x="18" y="9" width="12" height="7" rx="2" fill="none" stroke="#5b3a1a" strokeWidth="2.4" />
            <rect x="6" y="15" width="36" height="25" rx="3" fill="url(#ic-brief)" stroke="#4d3016" strokeWidth="1.2" />
            <rect x="6" y="22" width="36" height="4" fill="#3b2611" opacity="0.55" />
            <rect x="21" y="21" width="6" height="6" rx="1" fill="#d9b27a" stroke="#4d3016" strokeWidth="0.8" />
            <rect x="9" y="17" width="30" height="3" rx="1.5" fill="#fff" opacity="0.18" />
        </svg>
    );
}

function MailIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-mail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#dfe7f0" />
                </linearGradient>
            </defs>
            <rect x="5" y="11" width="38" height="26" rx="3" fill="url(#ic-mail)" stroke="#7a93b5" strokeWidth="1.2" />
            <path d="M6 13l18 14 18-14" fill="none" stroke="#2f74d0" strokeWidth="2" />
            <path d="M6 13l18 14 18-14" fill="none" stroke="#a9c2e6" strokeWidth="0.6" />
            <path d="M5 12l19 15L43 12" fill="#eaf1fb" opacity="0.6" />
        </svg>
    );
}

function GearIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-gear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e9edf2" />
                    <stop offset="1" stopColor="#9aa6b4" />
                </linearGradient>
            </defs>
            <g fill="url(#ic-gear)" stroke="#5f6b79" strokeWidth="1">
                <path d="M24 5l3 5 6-1 1 6 5 3-3 5 3 5-5 3-1 6-6-1-3 5-3-5-6 1-1-6-5-3 3-5-3-5 5-3 1-6 6 1z" />
            </g>
            <circle cx="24" cy="24" r="7.5" fill="#3a8adf" stroke="#1b4f96" strokeWidth="1.2" />
            <circle cx="24" cy="24" r="3.4" fill="#0f1e36" />
            <ellipse cx="21" cy="21" rx="2.5" ry="1.6" fill="#fff" opacity="0.4" />
        </svg>
    );
}

function RecycleIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-bin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#dfeaf5" />
                    <stop offset="1" stopColor="#aebfd2" />
                </linearGradient>
            </defs>
            <path d="M12 16h24l-2.5 24c-.1 1.2-1 2-2.2 2H16.7c-1.2 0-2.1-.8-2.2-2z" fill="url(#ic-bin)" stroke="#6f8197" strokeWidth="1.2" opacity="0.92" />
            <rect x="10" y="12" width="28" height="5" rx="2.5" fill="#c3d2e3" stroke="#6f8197" strokeWidth="1" />
            <g fill="none" stroke="#2faa4a" strokeWidth="2.4" strokeLinejoin="round">
                <path d="M24 22l3 5h-6z" fill="#2faa4a" />
                <path d="M30 26l3 5-5 .6" fill="#2faa4a" />
                <path d="M18 26l-3 5 5 .6" fill="#2faa4a" />
            </g>
        </svg>
    );
}

function GlobeIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <radialGradient id="ic-globe" cx="0.35" cy="0.3" r="0.8">
                    <stop offset="0" stopColor="#7ec8ff" />
                    <stop offset="1" stopColor="#1f6fcc" />
                </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="18" fill="url(#ic-globe)" stroke="#15528f" strokeWidth="1.4" />
            <g fill="none" stroke="#eaf4ff" strokeWidth="1.4" opacity="0.85">
                <ellipse cx="24" cy="24" rx="8" ry="18" />
                <ellipse cx="24" cy="24" rx="18" ry="8" />
                <line x1="6" y1="24" x2="42" y2="24" />
            </g>
            <ellipse cx="18" cy="15" rx="6" ry="3.5" fill="#fff" opacity="0.3" />
        </svg>
    );
}

function ClockIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <radialGradient id="ic-clock" cx="0.4" cy="0.35" r="0.8">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#c7d2de" />
                </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="18" fill="url(#ic-clock)" stroke="#5f6b79" strokeWidth="2" />
            <circle cx="24" cy="24" r="14.5" fill="none" stroke="#9aa6b4" strokeWidth="0.8" />
            <line x1="24" y1="24" x2="24" y2="13" stroke="#1a2330" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="24" y1="24" x2="32" y2="27" stroke="#1a2330" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="24" cy="24" r="1.8" fill="#c0392b" />
        </svg>
    );
}

function CalendarIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-cal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e3e9f0" />
                </linearGradient>
            </defs>
            <rect x="7" y="9" width="34" height="33" rx="3" fill="url(#ic-cal)" stroke="#8090a3" strokeWidth="1.2" />
            <path d="M7 12c0-1.6 1.2-3 3-3h28c1.8 0 3 1.4 3 3v6H7z" fill="#c0392b" />
            <path d="M7 12c0-1.6 1.2-3 3-3h28c1.8 0 3 1.4 3 3v3H7z" fill="#fff" opacity="0.18" />
            <rect x="14" y="6" width="3.5" height="8" rx="1.7" fill="#5f6b79" />
            <rect x="30.5" y="6" width="3.5" height="8" rx="1.7" fill="#5f6b79" />
            <text x="24" y="36" textAnchor="middle" fontFamily="Segoe UI, Tahoma, sans-serif" fontSize="16" fontWeight="700" fill="#2f3a48">11</text>
        </svg>
    );
}

function NotepadIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-note" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e7edf3" />
                </linearGradient>
            </defs>
            <path d="M12 6h17l9 9v26c0 1.2-.9 2-2 2H12c-1.1 0-2-.8-2-2V8c0-1.2.9-2 2-2z" fill="url(#ic-note)" stroke="#8090a3" strokeWidth="1.2" />
            <path d="M29 6v8c0 1 .8 1.6 1.7 1.6H38z" fill="#cdd6e0" stroke="#8090a3" strokeWidth="1" />
            <g stroke="#3a8adf" strokeWidth="1.6" strokeLinecap="round">
                <line x1="16" y1="22" x2="32" y2="22" />
                <line x1="16" y1="27" x2="32" y2="27" />
                <line x1="16" y1="32" x2="27" y2="32" />
            </g>
        </svg>
    );
}

function PaintIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <radialGradient id="ic-paint" cx="0.4" cy="0.35" r="0.8">
                    <stop offset="0" stopColor="#fff7e6" />
                    <stop offset="1" stopColor="#e0c79a" />
                </radialGradient>
            </defs>
            <path d="M24 7C13 7 6 14 6 23c0 7 5 11 11 11 3 0 3-2 3-3 0-2 1-3 3-3 4 0 8-3 8-9 0-7-3-12-7-12z" fill="url(#ic-paint)" stroke="#9c8456" strokeWidth="1.2" />
            <circle cx="16" cy="16" r="2.4" fill="#e74c3c" />
            <circle cx="24" cy="13" r="2.4" fill="#f1c40f" />
            <circle cx="31" cy="18" r="2.4" fill="#27ae60" />
            <circle cx="13" cy="24" r="2.4" fill="#2f74d0" />
            <path d="M30 30l8 8 4-4-8-8z" fill="#8b5a2b" stroke="#5b3a1a" strokeWidth="1" />
        </svg>
    );
}

function MineIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <radialGradient id="ic-mine" cx="0.38" cy="0.32" r="0.75">
                    <stop offset="0" stopColor="#6b7480" />
                    <stop offset="1" stopColor="#1a1f26" />
                </radialGradient>
            </defs>
            <g stroke="#1a1f26" strokeWidth="3" strokeLinecap="round">
                <line x1="24" y1="9" x2="24" y2="39" />
                <line x1="9" y1="24" x2="39" y2="24" />
                <line x1="13" y1="13" x2="35" y2="35" />
                <line x1="35" y1="13" x2="13" y2="35" />
            </g>
            <circle cx="24" cy="24" r="11" fill="url(#ic-mine)" stroke="#000" strokeWidth="1" />
            <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.5" />
            <path d="M30 14l4-4" stroke="#e67e22" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="35" cy="9" r="2.2" fill="#f1c40f" />
        </svg>
    );
}

function SnakeIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-snake" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5be08a" />
                    <stop offset="1" stopColor="#1e9e52" />
                </linearGradient>
            </defs>
            <path d="M12 38c0-6 6-7 6-12s-7-5-7-11c0-4 3-8 9-8 7 0 11 5 11 11"
                fill="none" stroke="url(#ic-snake)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="33" cy="20" r="6" fill="url(#ic-snake)" stroke="#157a3e" strokeWidth="1" />
            <circle cx="35" cy="18.5" r="1.4" fill="#0f1e36" />
            <path d="M38 22l4 1-4 1" fill="none" stroke="#e74c3c" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="14" cy="40" r="3" fill="#e74c3c" stroke="#a82a1c" strokeWidth="0.8" />
        </svg>
    );
}

function GithubIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <radialGradient id="ic-gh" cx="0.4" cy="0.3" r="0.85">
                    <stop offset="0" stopColor="#3a4048" />
                    <stop offset="1" stopColor="#1b1f24" />
                </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="19" fill="url(#ic-gh)" stroke="#0d0f12" strokeWidth="1.2" />
            <path d="M24 11c-7.2 0-13 5.8-13 13 0 5.7 3.7 10.6 8.9 12.3.65.12.9-.28.9-.62v-2.2c-3.6.78-4.4-1.74-4.4-1.74-.6-1.5-1.45-1.9-1.45-1.9-1.2-.8.09-.79.09-.79 1.3.09 2 1.35 2 1.35 1.16 2 3.05 1.42 3.8 1.08.12-.84.45-1.42.82-1.75-2.88-.33-5.9-1.44-5.9-6.4 0-1.42.5-2.57 1.34-3.48-.14-.33-.58-1.65.12-3.44 0 0 1.1-.35 3.6 1.32a12.5 12.5 0 0 1 6.55 0c2.5-1.67 3.6-1.32 3.6-1.32.7 1.79.26 3.11.13 3.44.84.91 1.34 2.06 1.34 3.48 0 4.97-3.03 6.06-5.92 6.38.47.4.88 1.19.88 2.4v3.56c0 .34.24.75.9.62A13 13 0 0 0 37 24c0-7.2-5.8-13-13-13z" fill="#fff" />
        </svg>
    );
}

function LinkedinIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-li" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3b9dd6" />
                    <stop offset="1" stopColor="#0a66c2" />
                </linearGradient>
            </defs>
            <rect x="6" y="6" width="36" height="36" rx="6" fill="url(#ic-li)" stroke="#075299" strokeWidth="1" />
            <circle cx="15" cy="16" r="3.2" fill="#fff" />
            <rect x="12" y="21" width="6" height="15" fill="#fff" />
            <path d="M21 21h6v2.2c1-1.6 2.8-2.6 5-2.6 4.2 0 6 2.6 6 7.2V36h-6v-7.4c0-2-.7-3.3-2.5-3.3-1.5 0-2.4 1-2.8 2-.15.36-.2.86-.2 1.36V36h-6c.08-13.6 0-15 0-15z" fill="#fff" />
        </svg>
    );
}

function ResumeIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <defs>
                <linearGradient id="ic-doc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e7edf3" />
                </linearGradient>
            </defs>
            <path d="M12 5h17l9 9v27c0 1.2-.9 2-2 2H12c-1.1 0-2-.8-2-2V7c0-1.2.9-2 2-2z" fill="url(#ic-doc)" stroke="#8090a3" strokeWidth="1.2" />
            <path d="M29 5v8c0 1 .8 1.6 1.7 1.6H38z" fill="#cdd6e0" stroke="#8090a3" strokeWidth="1" />
            <g stroke="#9aa6b4" strokeWidth="1.4" strokeLinecap="round">
                <line x1="15" y1="20" x2="33" y2="20" />
                <line x1="15" y1="24" x2="33" y2="24" />
                <line x1="15" y1="28" x2="27" y2="28" />
            </g>
            <rect x="22" y="33" width="18" height="9" rx="1.5" fill="#c0392b" />
            <text x="31" y="40" textAnchor="middle" fontFamily="Segoe UI, Tahoma, sans-serif" fontSize="6.5" fontWeight="700" fill="#fff">PDF</text>
        </svg>
    );
}

function DefaultIcon({ size }) {
    return (
        <svg {...svgProps(size)}>
            <rect x="9" y="7" width="30" height="34" rx="3" fill="#e7edf3" stroke="#8090a3" strokeWidth="1.2" />
        </svg>
    );
}

const ICONS = {
    about: AboutIcon,
    projects: FolderIcon,
    folder: FolderIcon,
    experience: BriefcaseIcon,
    contact: MailIcon,
    mail: MailIcon,
    settings: GearIcon,
    recycle: RecycleIcon,
    chrome: GlobeIcon,
    globe: GlobeIcon,
    clock: ClockIcon,
    calendar: CalendarIcon,
    notepad: NotepadIcon,
    paint: PaintIcon,
    minesweeper: MineIcon,
    snake: SnakeIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
    resume: ResumeIcon,
    leetcode: DefaultIcon,
};

// Generic app/desktop icon renderer
export function AppIcon({ name, size = 32 }) {
    const Comp = ICONS[name] || DefaultIcon;
    return <Comp size={size} />;
}

// ─── Window caption-button glyphs (white line art, Win7 style) ───
export function MinimizeGlyph() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
            <rect x="2" y="7" width="7" height="1.6" fill="currentColor" />
        </svg>
    );
}

export function MaximizeGlyph() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
            <rect x="1.5" y="1.5" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="1.5" y="1.5" width="8" height="2.2" fill="currentColor" />
        </svg>
    );
}

export function RestoreGlyph() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
            <rect x="3.2" y="1.2" width="6.4" height="6.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <rect x="1.2" y="3.2" width="6.4" height="6.4" fill="#fff" stroke="currentColor" strokeWidth="1.3" />
        </svg>
    );
}

export function CloseGlyph() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
            <path d="M1.6 1.6l7.8 7.8M9.4 1.6L1.6 9.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

// ─── Windows flag (Start orb) ───
export function WindowsFlag({ size = 22 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
            <defs>
                <linearGradient id="wf-r" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff8a80" /><stop offset="1" stopColor="#e8413a" />
                </linearGradient>
                <linearGradient id="wf-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#bff07a" /><stop offset="1" stopColor="#6cbf2f" />
                </linearGradient>
                <linearGradient id="wf-b" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7fd4ff" /><stop offset="1" stopColor="#1f9fe8" />
                </linearGradient>
                <linearGradient id="wf-y" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffe27a" /><stop offset="1" stopColor="#f2b417" />
                </linearGradient>
            </defs>
            <g transform="rotate(-8 24 24)">
                <path d="M7 12l16-3v15H7z" fill="url(#wf-r)" />
                <path d="M25 8.6l16-3v18.4H25z" fill="url(#wf-g)" />
                <path d="M7 25h16v15l-16-3z" fill="url(#wf-b)" />
                <path d="M25 25h16v18.4l-16-3z" fill="url(#wf-y)" />
            </g>
        </svg>
    );
}

// ─── System-tray icons ───
export function TrayNetwork() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <g fill="#eaf2ff">
                <rect x="2" y="9.5" width="2" height="3.5" rx="0.5" opacity="0.9" />
                <rect x="5" y="7.5" width="2" height="5.5" rx="0.5" opacity="0.95" />
                <rect x="8" y="5" width="2" height="8" rx="0.5" />
                <rect x="11" y="2.5" width="2" height="10.5" rx="0.5" />
            </g>
        </svg>
    );
}

export function TraySpeaker() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 6h2.5L8 3v10L4.5 10H2z" fill="#eaf2ff" />
            <path d="M10 5.5a3.5 3.5 0 0 1 0 5M11.7 3.6a6 6 0 0 1 0 8.8" fill="none" stroke="#eaf2ff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}

export function TrayBattery() {
    return (
        <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
            <rect x="1.5" y="5" width="13" height="6" rx="1.2" fill="none" stroke="#eaf2ff" strokeWidth="1.2" />
            <rect x="14.8" y="6.6" width="1.7" height="2.8" rx="0.6" fill="#eaf2ff" />
            <rect x="3" y="6.4" width="8.5" height="3.2" rx="0.6" fill="#8be08a" />
        </svg>
    );
}

export function ShutdownGlyph({ size = 16, color = "#cdd6e0" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2v6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M4.5 4.2a5 5 0 1 0 7 0" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export function SearchGlyph({ size = 14, color = "#8a8a8a" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke={color} strokeWidth="1.6" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
