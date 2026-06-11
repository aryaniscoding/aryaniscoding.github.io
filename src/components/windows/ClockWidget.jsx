import { useState, useEffect } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minDeg = minutes * 6;
    const secDeg = seconds * 6;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            padding: 20,
        }}>
            {/* Analog clock */}
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Clock face */}
                <circle cx="100" cy="100" r="95" fill="#0f1629" stroke="#245ED8" strokeWidth="3" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />

                {/* Hour markers */}
                {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 100 + 75 * Math.cos(angle);
                    const y1 = 100 + 75 * Math.sin(angle);
                    const x2 = 100 + 85 * Math.cos(angle);
                    const y2 = 100 + 85 * Math.sin(angle);
                    return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="#245ED8" strokeWidth={i % 3 === 0 ? 3 : 1} />
                    );
                })}

                {/* Hour numbers */}
                {Array.from({ length: 12 }, (_, i) => {
                    const num = i === 0 ? 12 : i;
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 100 + 65 * Math.cos(angle);
                    const y = 100 + 65 * Math.sin(angle);
                    return (
                        <text key={`n${i}`} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                            fill="#6BA4E8" fontSize="12" fontFamily="Consolas, monospace">
                            {num}
                        </text>
                    );
                })}

                {/* Hour hand */}
                <line x1="100" y1="100"
                    x2={100 + 45 * Math.cos((hourDeg - 90) * Math.PI / 180)}
                    y2={100 + 45 * Math.sin((hourDeg - 90) * Math.PI / 180)}
                    stroke="#fff" strokeWidth="4" strokeLinecap="round" />

                {/* Minute hand */}
                <line x1="100" y1="100"
                    x2={100 + 62 * Math.cos((minDeg - 90) * Math.PI / 180)}
                    y2={100 + 62 * Math.sin((minDeg - 90) * Math.PI / 180)}
                    stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round" />

                {/* Second hand */}
                <line x1="100" y1="100"
                    x2={100 + 70 * Math.cos((secDeg - 90) * Math.PI / 180)}
                    y2={100 + 70 * Math.sin((secDeg - 90) * Math.PI / 180)}
                    stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />

                {/* Center dot */}
                <circle cx="100" cy="100" r="4" fill="#245ED8" />
            </svg>

            {/* Digital display */}
            <div style={{
                marginTop: 16,
                color: "#6BA4E8",
                fontSize: 24,
                fontFamily: "Consolas, monospace",
                letterSpacing: 2,
            }}>
                {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
            </div>
            <div style={{ color: "#555", fontSize: 11, marginTop: 4, fontFamily: "Consolas, monospace" }}>
                {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
        </div>
    );
}
