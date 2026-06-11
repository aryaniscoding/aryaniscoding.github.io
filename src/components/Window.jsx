import { useState, useCallback, useRef, useEffect } from "react";
import { AppIcon, MinimizeGlyph, MaximizeGlyph, RestoreGlyph, CloseGlyph } from "./Icons";

const MIN_W = 300;
const MIN_H = 190;
const EDGE_VISIBLE = 120; // px of window kept on-screen horizontally

export default function Window({
    id,
    title,
    icon,
    children,
    zIndex,
    isActive,
    isMinimized,
    isMaximized,
    onFocus,
    onClose,
    onMinimize,
    onToggleMaximize,
    defaultPosition,
    defaultSize,
    taskbarHeight = 40,
}) {
    const [pos, setPos] = useState(() => defaultPosition || { x: 120, y: 60 });
    const [size, setSize] = useState(() => defaultSize || { w: 640, h: 460 });
    const winRef = useRef(null);
    const gesture = useRef(null);

    // Keep window inside the viewport on mount and when the viewport resizes
    useEffect(() => {
        const fit = () => {
            setSize((s) => ({
                w: Math.min(s.w, window.innerWidth - 8),
                h: Math.min(s.h, window.innerHeight - taskbarHeight - 8),
            }));
            setPos((p) => ({
                x: Math.min(Math.max(p.x, -(size.w - EDGE_VISIBLE)), window.innerWidth - EDGE_VISIBLE),
                y: Math.min(Math.max(p.y, 0), Math.max(0, window.innerHeight - taskbarHeight - 30)),
            }));
        };
        fit();
        window.addEventListener("resize", fit);
        return () => window.removeEventListener("resize", fit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskbarHeight]);

    // Single stable move handler — reads everything from the gesture ref
    const handleMove = useCallback((e) => {
        const g = gesture.current;
        if (!g) return;
        if (g.mode === "drag") {
            const maxX = window.innerWidth - EDGE_VISIBLE;
            const minX = -(g.w - EDGE_VISIBLE);
            const maxY = Math.max(0, window.innerHeight - g.taskbarHeight - 30);
            g.next = {
                x: Math.min(Math.max(g.originX + (e.clientX - g.startX), minX), maxX),
                y: Math.min(Math.max(g.originY + (e.clientY - g.startY), 0), maxY),
            };
        } else {
            g.next = {
                w: Math.max(MIN_W, Math.min(g.originW + (e.clientX - g.startX), window.innerWidth - g.posX - 4)),
                h: Math.max(MIN_H, Math.min(g.originH + (e.clientY - g.startY), window.innerHeight - g.taskbarHeight - g.posY - 4)),
            };
        }
        if (!g.raf) {
            g.raf = requestAnimationFrame(() => {
                const el = winRef.current;
                if (el && gesture.current) {
                    if (gesture.current.mode === "drag") {
                        el.style.left = `${gesture.current.next.x}px`;
                        el.style.top = `${gesture.current.next.y}px`;
                    } else {
                        el.style.width = `${gesture.current.next.w}px`;
                        el.style.height = `${gesture.current.next.h}px`;
                    }
                }
                if (gesture.current) gesture.current.raf = 0;
            });
        }
    }, []);

    const handleEnd = useCallback(() => {
        const g = gesture.current;
        if (!g) return;
        if (g.raf) cancelAnimationFrame(g.raf);
        if (g.mode === "drag") setPos({ x: g.next.x, y: g.next.y });
        else setSize({ w: g.next.w, h: g.next.h });
        winRef.current?.classList.remove("dragging");
        g.controller.abort();
        gesture.current = null;
    }, []);

    const startGesture = useCallback((g) => {
        g.controller = new AbortController();
        const { signal } = g.controller;
        gesture.current = g;
        window.addEventListener("pointermove", handleMove, { signal });
        window.addEventListener("pointerup", handleEnd, { signal });
        window.addEventListener("pointercancel", handleEnd, { signal });
    }, [handleMove, handleEnd]);

    const beginDrag = useCallback((e) => {
        if (e.button !== 0) return;
        if (e.target.closest(".window-controls")) return;
        onFocus(id);
        if (isMaximized) return;
        winRef.current?.classList.add("dragging");
        startGesture({
            mode: "drag", raf: 0, taskbarHeight,
            startX: e.clientX, startY: e.clientY,
            originX: pos.x, originY: pos.y, w: size.w,
            next: { x: pos.x, y: pos.y },
        });
    }, [id, isMaximized, onFocus, startGesture, pos.x, pos.y, size.w, taskbarHeight]);

    const beginResize = useCallback((e) => {
        if (e.button !== 0 || isMaximized) return;
        e.stopPropagation();
        onFocus(id);
        startGesture({
            mode: "resize", raf: 0, taskbarHeight,
            startX: e.clientX, startY: e.clientY,
            originW: size.w, originH: size.h, posX: pos.x, posY: pos.y,
            next: { w: size.w, h: size.h },
        });
    }, [id, isMaximized, onFocus, startGesture, size.w, size.h, pos.x, pos.y, taskbarHeight]);

    if (isMinimized) return null;

    return (
        <div
            ref={winRef}
            className={`window ${isActive ? "active" : ""} ${isMaximized ? "maximized" : ""}`}
            style={isMaximized ? { zIndex } : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex }}
            onMouseDown={() => onFocus(id)}
        >
            <div
                className="window-titlebar"
                onPointerDown={beginDrag}
                onDoubleClick={() => onToggleMaximize(id)}
            >
                <span className="window-titlebar-icon"><AppIcon name={icon} size={16} /></span>
                <span className="window-titlebar-text">{title}</span>
                <div className="window-controls">
                    <button className="window-btn" onClick={(e) => { e.stopPropagation(); onMinimize(id); }} title="Minimize">
                        <MinimizeGlyph />
                    </button>
                    <button className="window-btn" onClick={(e) => { e.stopPropagation(); onToggleMaximize(id); }} title={isMaximized ? "Restore" : "Maximize"}>
                        {isMaximized ? <RestoreGlyph /> : <MaximizeGlyph />}
                    </button>
                    <button className="window-btn window-btn-close" onClick={(e) => { e.stopPropagation(); onClose(id); }} title="Close">
                        <CloseGlyph />
                    </button>
                </div>
            </div>

            <div className="window-body">{children}</div>

            {!isMaximized && <div className="window-resize-handle" onPointerDown={beginResize} />}
        </div>
    );
}
