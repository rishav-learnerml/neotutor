import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import { useNavigate } from "react-router-dom";
import logo from "../assets/neotutorlogotr.png";
import { API_BASE_URL } from "@/utils/constants";

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videoCount, setVideoCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState(
    "Brewing up your playlist..."
  );

  const messages = [
    "Brewing up your playlist...",
    "Training your AI tutor...",
    "Generating magic behind the scenes...",
    "Almost ready...",
    "Summoning knowledge from the depths of YouTube...",
    "Converting videos into pure brain fuel...",
    "Teaching your tutor some new tricks...",
    "Assembling the ultimate learning experience...",
    "Making sense of hours of content in seconds...",
    "Loading brilliance… please stand by...",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    let i = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[i % messages.length]);
      i++;
    }, 2000);

    try {
      const res = await fetch(`${API_BASE_URL}/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUrl: playlistUrl,
          noOfVideos: videoCount,
          credentials: "include",
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");
      const data = await res.json();
      console.log("PDF generated:", data);

      const ragRes = await fetch(`${API_BASE_URL}/create-vectors`,{
        method: "GET",
        credentials: "include",
      });
      if (!ragRes.ok) throw new Error("Failed to create vectors");
      const ragData = await ragRes.json();
      console.log("RAG response:", ragData);

      clearInterval(interval);
      setLoadingMessage("✅ All done!");
      setTimeout(() => {
        setLoading(false);
        navigate("/tutors");
      }, 1000);
    } catch (err) {
      clearInterval(interval);
      console.error("Error:", err);
      setLoadingMessage("Something went wrong! 😢");
      setTimeout(() => {
        setLoadingMessage("");
        setLoading(false);
      }, 1000);
    }
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <div className="relative w-full overflow-hidden h-[90vh]">
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          background: { color: "#0f172a" },
          particles: {
            number: { value: 50 },
            color: { value: "#00ffff" },
            links: {
              enable: true,
              distance: 150,
              color: "#00ffff",
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("rounded-xl p-8 w-full max-w-lg shadow-2xl")}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-cyan-300">
              {/* Animated Logo */}
              <motion.img
                src={logo} // <- Replace with your actual logo path
                alt="App Logo"
                className="w-20 h-20"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <p className="text-lg font-medium">{loadingMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 border-2 border-cyan-400 p-8 rounded-lg backdrop-blur-sm bg-transparent"
            >
              <h2 className="text-2xl font-bold text-center text-cyan-400">
                Your AI Tutor
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-cyan-300">
                    YouTube Playlist URL
                  </label>
                  <input
                    type="url"
                    required
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    className="w-full rounded-md px-4 py-2 bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400 text-white"
                    placeholder="https://youtube.com/playlist?list=..."
                  />
                </div>
                <div>
                  <label className="block mb-1 text-cyan-300">
                    Number of Videos
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={1}
                    required
                    value={videoCount}
                    onChange={(e) => setVideoCount(Number(e.target.value))}
                    className="w-full rounded-md px-4 py-2 bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-700 text-white font-semibold py-2 rounded-md hover:bg-teal-800 transition cursor-pointer"
              >
                Create AI Tutor
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
