import { useState, useMemo } from "react";
import { AppIcon, ShutdownGlyph, SearchGlyph } from "./Icons";

export default function StartMenu({ programs, links, searchable, onOpen, onClose, onShutdown }) {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return searchable.filter((i) => i.label.toLowerCase().includes(q));
    }, [query, searchable]);

    const activate = (item) => {
        if (item.url) window.open(item.url, "_blank", "noopener");
        else if (item.file) window.open(item.file, "_blank", "noopener");
        else onOpen(item.id);
        onClose();
    };

    return (
        <>
            {/* Click-away backdrop (below taskbar, above windows) */}
            <div style={{ position: "fixed", inset: 0, zIndex: 8000 }} onMouseDown={onClose} />

            <div className="start-menu" onMouseDown={(e) => e.stopPropagation()}>
                {/* Left: programs + search */}
                <div className="start-menu-left">
                    <div className="start-programs">
                        {results.length > 0 ? (
                            <>
                                <div className="start-menu-section-label">Results</div>
                                {results.map((r) => (
                                    <div key={r.id} className="start-menu-item" onClick={() => activate(r)}>
                                        <span className="start-menu-item-icon"><AppIcon name={r.icon} size={22} /></span>
                                        <span>{r.label}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="start-menu-section-label">Programs</div>
                                {programs.map((p) => (
                                    <div key={p.id} className="start-menu-item" onClick={() => { onOpen(p.id); onClose(); }}>
                                        <span className="start-menu-item-icon"><AppIcon name={p.icon} size={22} /></span>
                                        <span>{p.label}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="start-search">
                        <SearchGlyph size={14} />
                        <input
                            type="text"
                            placeholder="Search programs and files"
                            value={query}
                            autoFocus
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && results[0]) activate(results[0]);
                                if (e.key === "Escape") onClose();
                            }}
                        />
                    </div>
                </div>

                {/* Right: user + links + power */}
                <div className="start-menu-right">
                    <div className="start-menu-user">
                        <div className="start-menu-avatar">AS</div>
                        <div className="start-menu-name">Aryan Sahu</div>
                        <div className="start-menu-role">GenAI Developer &amp; ML Engineer</div>
                    </div>

                    <div className="start-links">
                        {links.map((l, i) => (
                            <div key={i} className="start-link" onClick={() => activate(l)}>
                                <span className="start-link-icon"><AppIcon name={l.icon} size={20} /></span>
                                <span>{l.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="start-power">
                        <button className="start-menu-shutdown" onClick={onShutdown}>
                            <ShutdownGlyph size={15} color="#fff" />
                            Shut down
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
