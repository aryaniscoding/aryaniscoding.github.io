import { useState, useCallback } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function createBoard() {
    const board = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            mine: false, revealed: false, flagged: false, count: 0,
        }))
    );

    // Place mines
    let placed = 0;
    while (placed < MINES) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        if (!board[r][c].mine) {
            board[r][c].mine = true;
            placed++;
        }
    }

    // Count neighbors
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
                }
            }
            board[r][c].count = count;
        }
    }
    return board;
}

const NUM_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000", "#808080"];

export default function MinesweeperWindow() {
    const [board, setBoard] = useState(() => createBoard());
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const reveal = useCallback((r, c, b) => {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
        if (b[r][c].revealed || b[r][c].flagged) return;
        b[r][c].revealed = true;
        if (b[r][c].count === 0 && !b[r][c].mine) {
            for (let dr = -1; dr <= 1; dr++)
                for (let dc = -1; dc <= 1; dc++)
                    reveal(r + dr, c + dc, b);
        }
    }, []);

    const checkWin = (b) => {
        for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLS; c++)
                if (!b[r][c].mine && !b[r][c].revealed) return false;
        return true;
    };

    const handleClick = (r, c) => {
        if (gameOver || won) return;
        const b = board.map(row => row.map(cell => ({ ...cell })));
        if (b[r][c].flagged) return;
        if (b[r][c].mine) {
            // Reveal all mines
            b.forEach(row => row.forEach(cell => { if (cell.mine) cell.revealed = true; }));
            setBoard(b);
            setGameOver(true);
            return;
        }
        reveal(r, c, b);
        setBoard(b);
        if (checkWin(b)) setWon(true);
    };

    const handleRightClick = (e, r, c) => {
        e.preventDefault();
        if (gameOver || won || board[r][c].revealed) return;
        const b = board.map(row => row.map(cell => ({ ...cell })));
        b[r][c].flagged = !b[r][c].flagged;
        setBoard(b);
    };

    const reset = () => {
        setBoard(createBoard());
        setGameOver(false);
        setWon(false);
    };

    const flagCount = board.flat().filter(c => c.flagged).length;

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", height: "100%", background: "#c0c0c0", padding: 8,
        }}>
            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: COLS * 28 + 4, marginBottom: 6, padding: "4px 8px",
                background: "#e0e0e0", border: "2px inset #fff",
            }}>
                <span style={{ fontSize: 14, fontFamily: "Consolas, monospace", color: "#c00" }}>
                    💣 {MINES - flagCount}
                </span>
                <button onClick={reset} style={{
                    fontSize: 18, cursor: "pointer", background: "#e0e0e0",
                    border: "2px outset #fff", padding: "0 6px", lineHeight: 1.2,
                }}>
                    {gameOver ? "😵" : won ? "😎" : "🙂"}
                </button>
                <span style={{ fontSize: 11, fontFamily: "Consolas, monospace", color: "#333" }}>
                    {won ? "WIN!" : gameOver ? "BOOM" : ""}
                </span>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, 28px)`,
                gridTemplateRows: `repeat(${ROWS}, 28px)`,
                gap: 0,
                border: "3px inset #888",
                background: "#c0c0c0",
            }}>
                {board.map((row, r) => row.map((cell, c) => (
                    <div
                        key={`${r}-${c}`}
                        onClick={() => handleClick(r, c)}
                        onContextMenu={(e) => handleRightClick(e, r, c)}
                        style={{
                            width: 28, height: 28,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700,
                            fontFamily: "Consolas, monospace",
                            cursor: "pointer",
                            userSelect: "none",
                            border: cell.revealed ? "1px solid #999" : "2px outset #fff",
                            background: cell.revealed
                                ? (cell.mine ? "#ffcccc" : "#d0d0d0")
                                : "#c0c0c0",
                            color: cell.mine ? "#000" : NUM_COLORS[cell.count] || "#000",
                        }}
                    >
                        {cell.revealed
                            ? (cell.mine ? "💣" : (cell.count > 0 ? cell.count : ""))
                            : (cell.flagged ? "🚩" : "")
                        }
                    </div>
                )))}
            </div>

            <div style={{ marginTop: 8, fontSize: 9, color: "#666", fontFamily: "Consolas, monospace" }}>
                Left-click: reveal · Right-click: flag
            </div>
        </div>
    );
}
