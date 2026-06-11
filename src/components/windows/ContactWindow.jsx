import { useState } from "react";
import { AppIcon } from "../Icons";

export default function ContactWindow() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div>
            <div className="win-toolbar">
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                    <AppIcon name="mail" size={16} /> New Message
                </span>
            </div>
            <div className="win-content">
                {sent ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: 40,
                            color: "#2e7d32",
                        }}
                    >
                        <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
                            <circle cx="26" cy="26" r="24" fill="#2e9e4e" />
                            <path d="M15 27l8 8 15-16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 style={{ color: "#2e7d32", border: "none" }}>Message Sent!</h2>
                        <p>Thanks for reaching out. I'll get back to you soon!</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        {/* To field */}
                        <div
                            style={{
                                padding: "6px 0",
                                borderBottom: "1px solid #eee",
                                marginBottom: 12,
                                fontSize: 12,
                                color: "#555",
                            }}
                        >
                            <strong>To:</strong>{" "}
                            <a
                                href="mailto:aryansahu2705@gmail.com"
                                style={{ color: "#245edb", textDecoration: "none" }}
                            >
                                aryansahu2705@gmail.com
                            </a>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-name">Your Name</label>
                            <input id="contact-name" type="text" placeholder="John Doe" required />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-email">Your Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                type="text"
                                placeholder="Let's collaborate!"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                placeholder="Write your message here..."
                                required
                            />
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                            <button type="submit" className="contact-send-btn">
                                Send
                            </button>
                        </div>
                    </form>
                )}

                {/* Quick links */}
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #eee" }}>
                    <h3>Quick Contact</h3>
                    <div className="social-grid" style={{ marginTop: 8 }}>
                        <a href="mailto:aryansahu2705@gmail.com" className="social-link">
                            <span className="social-link-icon"><AppIcon name="mail" size={16} /></span>
                            aryansahu2705@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/aryan-sahu-131928277/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <span className="social-link-icon"><AppIcon name="linkedin" size={16} /></span>
                            LinkedIn
                        </a>
                        <a href="https://github.com/aryaniscoding" target="_blank" rel="noopener noreferrer" className="social-link">
                            <span className="social-link-icon"><AppIcon name="github" size={16} /></span>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
