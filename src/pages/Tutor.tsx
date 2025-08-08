import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import logo from "../assets/neotutorlogotr.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  text: string;
  sender: "user" | "bot";
  videoUrl?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
};

const Tutor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channelName = localStorage.getItem("channelName") || "Tutor";
  const channelLogo =
    localStorage.getItem("channelLogoUrl") || "/default-logo.png";

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:3000/query", {
        userQuery: input,
      });

      const response = res.data.message;

      let botReply: Message;

      if (
        typeof response === "object" &&
        response.videoUrl &&
        response.startTime &&
        response.endTime &&
        response.title
      ) {
        // Construct video URL with timestamps if needed
        const videoIdMatch = response.videoUrl.match(
          /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        let url = "";
        if (videoId) {
          const start = response.startTime
            ? convertTimestampToSeconds(response.startTime)
            : 0;
          const end = response.endTime
            ? convertTimestampToSeconds(response.endTime)
            : undefined;
          url = `https://www.youtube.com/embed/${videoId}?start=${start}&autoplay=1&rel=0`;
          if (end) url += `&end=${end}`;
        }

        console.log(url, "urllllll");

        botReply = {
          sender: "bot",
          text: response.answer,
          videoUrl: url.toString(),
          title: response.title,
          startTime: response.startTime,
          endTime: response.endTime,
        };
      } else {
        botReply = {
          text:
            typeof response === "object"
              ? JSON.stringify(response.answer, null, 2)
              : String(response.answer),
          sender: "bot",
        };
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  const convertTimestampToSeconds = (timestamp: string) => {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <img src={channelLogo} alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {channelName}
        </h1>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-center gap-2 pl-1 max-w-[90%]">
              {msg.sender === "bot" && (
                <img src={channelLogo} className="w-8 h-8 rounded-full" />
              )}
              <div
                className={`px-4 py-3 rounded-2xl text-base whitespace-pre-wrap shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-bl-none"
                }`}
              >
                {/* Video response */}
                {msg.videoUrl && (
                  <div className="space-y-2">
                    <div className="font-semibold text-base">
                      🎬 {msg.title}
                    </div>
                    <iframe
                      src={msg.videoUrl}
                      className="w-[300px] h-[170px] rounded-lg shadow"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">
                      Refer to this video from {msg.startTime} to {msg.endTime}
                    </div>
                    <div className="pt-2 prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Text-only response */}
                {!msg.videoUrl && (
                  <div className="pt-2 prose prose-sm dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              {msg.sender === "user" && (
                <img src={logo} className="w-8 h-8 rounded-full" />
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 pl-1">
            <img src={channelLogo} className="w-8 h-8 rounded-full" />
            <TypingDots />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input bar */}
      <footer className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

const TypingDots = () => (
  <div className="flex gap-1 items-center">
    {[...Array(3)].map((_, i) => (
      <motion.span
        key={i}
        className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-200"
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

export default Tutor;
