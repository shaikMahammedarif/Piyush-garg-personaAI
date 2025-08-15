import { useState, useRef, useEffect } from "react";

export default function ChatBox({ sendMessage }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message locally
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    // Call parent function to get AI response
    const aiResponse = await sendMessage(input);
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-xl mx-auto border rounded-lg p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg border"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
