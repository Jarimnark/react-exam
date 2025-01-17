import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  username: string;
  content: string;
}

export default function Exam5() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      // console.log("process: ", process.env.ws_URI);
      // console.log("jarim");
      socketRef.current = new WebSocket(
        "wss://node-ws-production.up.railway.app/"
      );
      // console.log("jarim 2");

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
      };

      socketRef.current.onmessage = (event) => {
        console.log("Received message from server:", event.data);
        try {
          const message: Message = JSON.parse(event.data);
          setMessages((prev) => [...prev, message]);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        socketRef.current?.close(); // Ensure the connection is closed properly
      };
    };

    connectWebSocket();

    return () => {
      // console.log("eukaeuka");
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if (input.trim()) {
        console.log("in send msg");
        const message: Message = {
          id: `${Date.now()}`,
          username: username || "Anonymous",
          content: input.trim(),
        };
        socketRef.current.send(JSON.stringify(message));
        setInput("");
      }
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };
  return (
    <>
      <h3 className="text-center font-bold m-8 text-3xl">Exam 5</h3>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            Real-Time Chat
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-2"
            />
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-md p-4">
              {messages.map((msg, i) => (
                <div key={i} className="mb-2">
                  <span className="font-bold text-blue-500">
                    {msg.username}:{" "}
                  </span>
                  <span>{msg.content}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
