import { useState } from "react";

export default function NotepadWindow() {
    const [text, setText] = useState(
        "Welcome to Notepad!\n\nThis is AryanOS Notepad.\nYou can type anything here.\n\n— Aryan Sahu"
    );
    const [fileName, setFileName] = useState("Untitled.txt");

    const handleSave = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Menu bar */}
            <div style={{
                display: "flex", gap: 2, padding: "2px 4px",
                background: "#f0f0f0", borderBottom: "1px solid #ccc",
                fontSize: 11,
            }}>
                <button onClick={handleSave} style={menuBtn}>File ▸ Save</button>
                <button onClick={() => setText("")} style={menuBtn}>Edit ▸ Clear</button>
                <button onClick={() => {
                    const words = text.split(/\s+/).filter(Boolean).length;
                    const chars = text.length;
                    alert(`Words: ${words}\nCharacters: ${chars}\nLines: ${text.split("\n").length}`);
                }} style={menuBtn}>View ▸ Word Count</button>
            </div>

            {/* Text area */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck={false}
                style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    resize: "none",
                    padding: 8,
                    fontSize: 12,
                    fontFamily: "'Silkscreen', monospace",
                    lineHeight: 1.6,
                    background: "#fff",
                    color: "#1a1a1a",
                }}
            />

            {/* Status bar */}
            <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "2px 8px", background: "#f0f0f0",
                borderTop: "1px solid #ccc", fontSize: 10, color: "#666",
            }}>
                <span>Ln {text.substring(0, text.length).split("\n").length}</span>
                <span>{text.length} chars</span>
            </div>
        </div>
    );
}

const menuBtn = {
    background: "none", border: "none", cursor: "pointer",
    padding: "2px 8px", fontSize: 11, fontFamily: "'Silkscreen', monospace",
    borderRadius: 2, color: "#333",
};
