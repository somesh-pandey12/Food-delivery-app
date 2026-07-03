import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "./Somu.css";
import { StoreContext } from "../../context/StoreContext";

const Somu = () => {
    const { url } = useContext(StoreContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hey! Main Somu hoon 👋 FoodVerse ka assistant. Order, menu, ya kuch bhi puchh sakte ho!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${url}/api/chat/message`, {
                message: input,
                history: updatedMessages.map(m => ({ role: m.role, content: m.content }))
            });

            setMessages(prev => [...prev, { role: "assistant", content: res.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, kuch problem ho gayi. Thodi der baad try karo! 🙏"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <>
            {/* Floating Button */}
            <div className="somu-fab" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "✕" : "💬"}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="somu-chat-window">
                    <div className="somu-header">
                        <div className="somu-avatar">🤖</div>
                        <div>
                            <p className="somu-name">Somu</p>
                            <p className="somu-status">Online • FoodVerse Assistant</p>
                        </div>
                    </div>

                    <div className="somu-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`somu-msg ${msg.role === "user" ? "somu-msg-user" : "somu-msg-bot"}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="somu-msg somu-msg-bot somu-typing">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="somu-input-area">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={sendMessage} disabled={loading}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Somu;