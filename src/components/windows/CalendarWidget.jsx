import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export default function CalendarWidget() {
    const today = new Date();
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
    const goToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const isToday = (d) =>
        d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    return (
        <div style={{ padding: 12, height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 10, padding: "0 4px",
            }}>
                <button onClick={prevMonth} style={navBtn}>◀</button>
                <span style={{ fontSize: 13, fontWeight: 700, cursor: "pointer" }} onClick={goToday}>
                    {MONTHS[month]} {year}
                </span>
                <button onClick={nextMonth} style={navBtn}>▶</button>
            </div>

            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 4 }}>
                {DAYS.map((d) => (
                    <div key={d} style={{
                        textAlign: "center", fontSize: 9, fontWeight: 700,
                        color: "#888", padding: 2,
                    }}>{d}</div>
                ))}
            </div>

            {/* Days grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, flex: 1 }}>
                {cells.map((d, i) => (
                    <div key={i} style={{
                        textAlign: "center",
                        padding: "4px 0",
                        fontSize: 11,
                        borderRadius: 3,
                        cursor: d ? "pointer" : "default",
                        background: d && isToday(d) ? "#316AC5" : "transparent",
                        color: d && isToday(d) ? "#fff" : d ? "#333" : "transparent",
                        fontWeight: d && isToday(d) ? 700 : 400,
                        transition: "background 0.1s",
                    }}
                        onMouseEnter={(e) => { if (d && !isToday(d)) e.target.style.background = "#e8f0fe"; }}
                        onMouseLeave={(e) => { if (d && !isToday(d)) e.target.style.background = "transparent"; }}
                    >
                        {d || ""}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{
                borderTop: "1px solid #ddd", paddingTop: 6, marginTop: 6,
                fontSize: 10, color: "#666", textAlign: "center",
            }}>
                Today: {today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </div>
        </div>
    );
}

const navBtn = {
    background: "none", border: "1px solid #ccc", borderRadius: 2,
    cursor: "pointer", padding: "2px 8px", fontSize: 10,
};
