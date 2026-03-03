export default function StartMenu({ onOpen, onClose, onShutdown }) {
    const folders = [
        { id: "about", icon: "👤", label: "About Me" },
        { id: "experience", icon: "💼", label: "Experience" },
        { id: "projects", icon: "📁", label: "Projects" },
        { id: "contact", icon: "✉️", label: "Contact Me" },
    ];

    const links = [
        { icon: "🐙", label: "GitHub", url: "https://github.com/aryaniscoding" },
        { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/aryan-sahu-131928277/" },
        { icon: "📧", label: "Email", url: "mailto:aryansahu2705@gmail.com" },
        { icon: "🏆", label: "LeetCode", url: "https://leetcode.com/u/aryan_sahu27/" },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                style={{ position: "fixed", inset: 0, zIndex: 550 }}
                onClick={onClose}
            />
            <div className="start-menu">
                {/* Header */}
                <div className="start-menu-header">
                    <div className="start-menu-avatar">AS</div>
                    <div>
                        <div className="start-menu-name">Aryan Sahu</div>
                        <div className="start-menu-role">GenAI Developer & ML Engineer</div>
                    </div>
                </div>

                {/* Body */}
                <div className="start-menu-body">
                    {/* Left: folders */}
                    <div className="start-menu-left">
                        <div className="start-menu-section-label">Folders</div>
                        {folders.map((f) => (
                            <div
                                key={f.id}
                                className="start-menu-item"
                                onClick={() => {
                                    onOpen(f.id);
                                    onClose();
                                }}
                            >
                                <span className="start-menu-item-icon">{f.icon}</span>
                                <span>{f.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right: links */}
                    <div className="start-menu-right">
                        <div className="start-menu-section-label">Links</div>
                        {links.map((l, i) => (
                            <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="start-menu-item"
                                style={{ textDecoration: "none" }}
                            >
                                <span className="start-menu-item-icon">{l.icon}</span>
                                <span>{l.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="start-menu-footer">
                    <button className="start-menu-shutdown" onClick={onShutdown}>
                        ⏻ Shut Down
                    </button>
                </div>
            </div>
        </>
    );
}
