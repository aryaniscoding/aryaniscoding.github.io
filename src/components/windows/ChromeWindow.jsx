export default function ChromeWindow() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
            {/* Chrome-like toolbar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                background: "#e8eaed",
                borderBottom: "1px solid #d0d0d0",
            }}>
                <span style={{ fontSize: 14 }}>🌐</span>
                <div style={{
                    flex: 1,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 12,
                    padding: "3px 10px",
                    fontSize: 11,
                    color: "#666",
                    fontFamily: "'Silkscreen', monospace",
                }}>
                    google.com
                </div>
            </div>

            {/* Google iframe */}
            <iframe
                src="https://www.google.com/webhp?igu=1"
                title="Chrome Browser"
                style={{
                    flex: 1,
                    border: "none",
                    width: "100%",
                    height: "100%",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
        </div>
    );
}
