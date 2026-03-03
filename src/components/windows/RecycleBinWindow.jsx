export default function RecycleBinWindow() {
    const deletedFiles = [
        {
            name: "old_resume_v1.docx",
            icon: "📄",
            location: "C:\\Users\\Aryan\\Documents",
            deleted: "3 days ago",
            size: "42 KB",
        },
        {
            name: "screenshot_2009.png",
            icon: "🖼️",
            location: "C:\\Users\\Aryan\\Pictures",
            deleted: "1 week ago",
            size: "1.2 MB",
        },
        {
            name: "notes_todo.txt",
            icon: "📝",
            location: "C:\\Users\\Aryan\\Desktop",
            deleted: "2 days ago",
            size: "8 KB",
        },
        {
            name: "setup_installer.exe",
            icon: "⚙️",
            location: "C:\\Users\\Aryan\\Downloads",
            deleted: "5 days ago",
            size: "78 MB",
        },
        {
            name: "my_project_backup.zip",
            icon: "📦",
            location: "C:\\Users\\Aryan\\Documents\\Projects",
            deleted: "1 week ago",
            size: "210 MB",
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Toolbar */}
            <div className="explorer-toolbar">
                <button
                    className="toolbar-btn"
                    onClick={() => alert("Recycle Bin emptied! (just kidding)")}
                >
                    🗑️ Empty Recycle Bin
                </button>
                <button
                    className="toolbar-btn"
                    onClick={() => alert("All items restored! (not really)")}
                >
                    ♻️ Restore all items
                </button>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 11, color: "#666" }}>
                    {deletedFiles.length} items
                </span>
            </div>

            {/* File table */}
            <div style={{ flex: 1, overflow: "auto" }}>
                <table className="explorer-table">
                    <thead>
                        <tr>
                            <th style={{ width: "35%" }}>Name</th>
                            <th style={{ width: "30%" }}>Original Location</th>
                            <th style={{ width: "18%" }}>Date Deleted</th>
                            <th style={{ width: "12%" }}>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedFiles.map((file, idx) => (
                            <tr key={idx}>
                                <td>
                                    <span className="file-icon">{file.icon}</span>
                                    {file.name}
                                </td>
                                <td style={{ color: "#666" }}>{file.location}</td>
                                <td style={{ color: "#666" }}>{file.deleted}</td>
                                <td style={{ color: "#666", textAlign: "right" }}>
                                    {file.size}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
