import { useRef, useState, useEffect, useCallback } from "react";

const COLORS = [
    "#000000", "#808080", "#800000", "#808000", "#008000", "#008080",
    "#000080", "#800080", "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
    "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ff8000", "#ff0080",
    "#80ff00", "#00ff80", "#0080ff", "#8000ff",
];

export default function PaintWindow() {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(3);
    const [tool, setTool] = useState("brush"); // brush | eraser
    const lastPos = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const startDraw = (e) => {
        setDrawing(true);
        lastPos.current = getPos(e);
    };

    const draw = useCallback((e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const pos = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
        ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        lastPos.current = pos;
    }, [drawing, color, brushSize, tool]);

    const stopDraw = () => {
        setDrawing(false);
        lastPos.current = null;
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const saveCanvas = () => {
        const url = canvasRef.current.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "painting.png";
        a.click();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Toolbar */}
            <div style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 6px",
                background: "#f0f0f0", borderBottom: "1px solid #ccc", flexWrap: "wrap",
            }}>
                <button onClick={() => setTool("brush")} style={{
                    ...tbtn, background: tool === "brush" ? "#d0e4f8" : "none",
                    border: tool === "brush" ? "1px solid #80b0d8" : "1px solid transparent",
                }}>Brush</button>
                <button onClick={() => setTool("eraser")} style={{
                    ...tbtn, background: tool === "eraser" ? "#d0e4f8" : "none",
                    border: tool === "eraser" ? "1px solid #80b0d8" : "1px solid transparent",
                }}>Eraser</button>
                <span style={{ fontSize: 10, color: "#666" }}>Size:</span>
                <input type="range" min="1" max="20" value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    style={{ width: 60, height: 14 }} />
                <span style={{ fontSize: 10, color: "#888", width: 16 }}>{brushSize}</span>
                <div style={{ width: 1, height: 20, background: "#ccc" }} />
                <button onClick={clearCanvas} style={tbtn}>Clear</button>
                <button onClick={saveCanvas} style={tbtn}>Save</button>
            </div>

            {/* Canvas area */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative", cursor: "crosshair" }}>
                <canvas
                    ref={canvasRef}
                    width={760}
                    height={440}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                    style={{ display: "block" }}
                />
            </div>

            {/* Color palette */}
            <div style={{
                display: "flex", alignItems: "center", gap: 1, padding: "3px 6px",
                background: "#f0f0f0", borderTop: "1px solid #ccc",
            }}>
                {COLORS.map((c) => (
                    <div key={c} onClick={() => { setColor(c); setTool("brush"); }}
                        style={{
                            width: 16, height: 16, background: c,
                            border: color === c ? "2px solid #316AC5" : "1px solid #999",
                            cursor: "pointer", borderRadius: 1,
                        }} />
                ))}
            </div>
        </div>
    );
}

const tbtn = {
    background: "none", border: "1px solid transparent", padding: "2px 6px",
    cursor: "pointer", fontSize: 11, fontFamily: "var(--ui-font)",
    borderRadius: 2, display: "flex", alignItems: "center", gap: 3,
};
