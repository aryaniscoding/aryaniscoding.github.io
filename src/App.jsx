import { useState, useCallback } from "react";
import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [shutdown, setShutdown] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const handleShutdown = useCallback(() => {
    setShutdown(true);
  }, []);

  // Show shutdown screen
  if (shutdown) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#dde6f0",
          fontFamily: "var(--ui-font)",
          animation: "fadeIn 0.5s ease-in",
        }}
      >
        <p style={{ fontSize: 18, marginBottom: 16 }}>Shutting down...</p>
        <p style={{ fontSize: 12, color: "#666" }}>
          Thanks for visiting! Refresh to restart.
        </p>
      </div>
    );
  }

  // Boot screen
  if (!booted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  // Desktop
  return <Desktop onShutdown={handleShutdown} />;
}
