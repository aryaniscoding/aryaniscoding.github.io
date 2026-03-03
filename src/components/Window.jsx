import { useState, useCallback, useRef, useEffect } from "react";

export default function Window({
    id,
    title,
    icon,
    children,
    isActive,
    onFocus,
    onClose,
    onMinimize,
    isMinimized,
    onRestore,
    defaultPosition,
    defaultSize,
    darkMode,
}) {
    const [pos, setPos] = useState(defaultPosition || { x: 120, y: 60 });
    const [size] = useState(defaultSize || { w: 650, h: 450 });
    const [maximized, setMaximized] = useState(false);
    const dragRef = useRef(null);
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = useCallback(
        (e) => {
            if (maximized) return;
            isDragging.current = true;
            dragOffset.current = {
                x: e.clientX - pos.x,
                y: e.clientY - pos.y,
            };
            onFocus();

            const handleMouseMove = (e) => {
                if (!isDragging.current) return;
                setPos({
                    x: e.clientX - dragOffset.current.x,
                    y: Math.max(0, e.clientY - dragOffset.current.y),
                });
            };

            const handleMouseUp = () => {
                isDragging.current = false;
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [pos, onFocus, maximized]
    );

    const toggleMaximize = () => {
        setMaximized((m) => !m);
    };

    // If minimized, hide the window but keep it in the DOM
    if (isMinimized) return null;

    return (
        <div
            ref={dragRef}
            className={`window ${isActive ? "active" : ""} ${maximized ? "maximized" : ""}`}
            style={
                maximized
                    ? {}
                    : {
                        left: pos.x,
                        top: pos.y,
                        width: size.w,
                        height: size.h,
                    }
            }
            onMouseDown={onFocus}
        >
            {/* Title bar */}
            <div className="window-titlebar" onMouseDown={handleMouseDown}>
                <span className="window-titlebar-icon">{icon}</span>
                <span className="window-titlebar-text">{title}</span>
                <div className="window-controls">
                    <button
                        className="window-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize(id);
                        }}
                        title="Minimize"
                    >
                        &minus;
                    </button>
                    <button
                        className="window-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMaximize();
                        }}
                        title={maximized ? "Restore" : "Maximize"}
                    >
                        {maximized ? "\u2750" : "\u25A1"}
                    </button>
                    <button
                        className="window-btn window-btn-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(id);
                        }}
                        title="Close"
                    >
                        &times;
                    </button>
                </div>
            </div>

            {/* Window body */}
            <div className="window-body">{children}</div>
        </div>
    );
}
