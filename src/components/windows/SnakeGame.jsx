import { useState, useEffect, useCallback, useRef } from "react";

const GRID = 20;
const CELL = 16;
const SPEED = 120;

const DIR = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };

export default function SnakeGame() {
    const [snake, setSnake] = useState([[5, 5], [4, 5], [3, 5]]);
    const [food, setFood] = useState([10, 10]);
    const [dir, setDir] = useState([1, 0]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const dirRef = useRef(dir);
    const gameRef = useRef(null);

    const spawnFood = useCallback((snk) => {
        let f;
        do {
            f = [Math.floor(Math.random() * GRID), Math.floor(Math.random() * GRID)];
        } while (snk.some(([x, y]) => x === f[0] && y === f[1]));
        return f;
    }, []);

    const reset = () => {
        const s = [[5, 5], [4, 5], [3, 5]];
        setSnake(s);
        setFood(spawnFood(s));
        setDir([1, 0]);
        dirRef.current = [1, 0];
        setGameOver(false);
        setScore(0);
        setStarted(true);
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (DIR[e.key]) {
                e.preventDefault();
                const [dx, dy] = DIR[e.key];
                // Prevent reversing
                if (dx !== -dirRef.current[0] || dy !== -dirRef.current[1]) {
                    dirRef.current = [dx, dy];
                    setDir([dx, dy]);
                }
                if (!started) setStarted(true);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [started]);

    useEffect(() => {
        if (!started || gameOver) return;
        gameRef.current = setInterval(() => {
            setSnake((prev) => {
                const [dx, dy] = dirRef.current;
                const head = [prev[0][0] + dx, prev[0][1] + dy];

                // Wall collision
                if (head[0] < 0 || head[0] >= GRID || head[1] < 0 || head[1] >= GRID) {
                    setGameOver(true);
                    return prev;
                }
                // Self collision
                if (prev.some(([x, y]) => x === head[0] && y === head[1])) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [head, ...prev];
                if (head[0] === food[0] && head[1] === food[1]) {
                    setScore((s) => s + 10);
                    setFood(spawnFood(newSnake));
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, SPEED);
        return () => clearInterval(gameRef.current);
    }, [started, gameOver, food, spawnFood]);

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            height: "100%", background: "#0a1628", padding: 10,
        }}>
            {/* Score */}
            <div style={{
                display: "flex", justifyContent: "space-between", width: GRID * CELL,
                marginBottom: 6, color: "#6BA4E8", fontSize: 12,
                fontFamily: "'Silkscreen', monospace",
            }}>
                <span>🐍 Score: {score}</span>
                <span>Best: {Math.max(score, 0)}</span>
            </div>

            {/* Game board */}
            <div style={{
                width: GRID * CELL, height: GRID * CELL,
                border: "2px solid #3b82f6", position: "relative",
                background: "#0f1e36",
            }}>
                {/* Grid lines */}
                {Array.from({ length: GRID - 1 }, (_, i) => (
                    <div key={`h${i}`} style={{
                        position: "absolute", left: 0, right: 0,
                        top: (i + 1) * CELL, height: 1,
                        background: "rgba(59,130,246,0.06)",
                    }} />
                ))}
                {Array.from({ length: GRID - 1 }, (_, i) => (
                    <div key={`v${i}`} style={{
                        position: "absolute", top: 0, bottom: 0,
                        left: (i + 1) * CELL, width: 1,
                        background: "rgba(59,130,246,0.06)",
                    }} />
                ))}

                {/* Snake */}
                {snake.map(([x, y], i) => (
                    <div key={i} style={{
                        position: "absolute",
                        left: x * CELL, top: y * CELL,
                        width: CELL - 1, height: CELL - 1,
                        background: i === 0 ? "#4ade80" : "#22c55e",
                        borderRadius: i === 0 ? 3 : 1,
                        border: "1px solid rgba(0,0,0,0.2)",
                    }} />
                ))}

                {/* Food */}
                <div style={{
                    position: "absolute",
                    left: food[0] * CELL + 2, top: food[1] * CELL + 2,
                    width: CELL - 4, height: CELL - 4,
                    background: "#ef4444", borderRadius: "50%",
                    boxShadow: "0 0 6px #ef4444",
                }} />

                {/* Game over overlay */}
                {gameOver && (
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.7)",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{ color: "#ef4444", fontSize: 16, fontFamily: "'Silkscreen', monospace", marginBottom: 8 }}>
                            GAME OVER
                        </div>
                        <div style={{ color: "#6BA4E8", fontSize: 12, fontFamily: "'Silkscreen', monospace", marginBottom: 12 }}>
                            Score: {score}
                        </div>
                        <button onClick={reset} style={{
                            background: "#245ED8", color: "#fff", border: "none",
                            padding: "6px 16px", borderRadius: 3, cursor: "pointer",
                            fontFamily: "'Silkscreen', monospace", fontSize: 11,
                        }}>
                            Play Again
                        </button>
                    </div>
                )}

                {/* Start prompt */}
                {!started && (
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{ color: "#4ade80", fontSize: 14, fontFamily: "'Silkscreen', monospace", marginBottom: 8 }}>
                            🐍 SNAKE
                        </div>
                        <button onClick={reset} style={{
                            background: "#22c55e", color: "#fff", border: "none",
                            padding: "6px 16px", borderRadius: 3, cursor: "pointer",
                            fontFamily: "'Silkscreen', monospace", fontSize: 11,
                        }}>
                            Start Game
                        </button>
                        <div style={{ color: "#666", fontSize: 9, marginTop: 8, fontFamily: "'Silkscreen', monospace" }}>
                            Arrow keys to move
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
