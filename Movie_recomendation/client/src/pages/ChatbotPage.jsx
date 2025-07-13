import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function ChatbotPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.log("ChatbotPage: No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I am your movie recommendation bot. What kind of movie are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/chatbot/message`,
        {
          message: userMessage.text,
          conversationHistory: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      const botReply = response.data.reply;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error(
        "Error sending message to chatbot:",
        error.response?.data || error.message
      );

      if (error.response && error.response.status === 401) {
        console.log(
          "Chatbot session expired or token invalid, redirecting to login."
        );
        localStorage.removeItem("userToken");
        navigate("/login");
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Oops! Something went wrong. Please try again.",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const token = localStorage.getItem("userToken");
  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>You need to be logged in to use the chatbot. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-900 rounded-lg shadow-xl p-4">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Movie Chatbot
      </h2>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 rounded-lg mb-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={loading ? "Thinking..." : "Type your message..."}
          className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatbotPage;
