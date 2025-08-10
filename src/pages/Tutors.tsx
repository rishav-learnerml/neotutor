import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, SquareArrowOutUpRight } from "lucide-react";
import logo from "../assets/neotutorlogotr.png";
import { API_BASE_URL } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

interface HistoryItem {
  _id: string;
  instanceId: string;
  __v: number;
  channelData: {
    id: string;
    title: string;
    duration: string;
    channelName: string;
    channelUrl: string;
    channelUsername: string;
    date: string;
    url: string;
    viewCount: number;
    fromYTUrl: string;
    type: string;
    thumbnailUrl: string;
    input: string;
    order: number;
    fromPlaylistUrl: string;
    progressKey: {
      url: string;
      label: string;
    };
    standardizedUrl: string;
  };
}

export default function Tutors() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const LOCAL_STORAGE_KEY = "aiTutorHistory";

  useEffect(() => {
    if (!isLoggedIn) return; // avoid calling if not authenticated

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/history`, {
          credentials: "include", // send cookies
        });

        if (res.status === 401) {
          console.warn("Unauthorized — user not logged in");
          return;
        }

        let data: HistoryItem[] = await res.json();

        // Enrich history items with logoUrl
        const enrichedData = await Promise.all(
          data.map(async (item) => {
            try {
              const logoRes = await fetch(
                `${API_BASE_URL}/channel-logo/${encodeURIComponent(
                  item.channelData.channelName
                )}`,
                {
                  method: "GET",
                  credentials: "include",
                }
              );
              const logoData = await logoRes.json();
              return {
                ...item,
                channelData: {
                  ...item.channelData,
                  logoUrl: logoData.logoUrl || item.channelData.thumbnailUrl,
                },
              };
            } catch (err) {
              console.error(
                "Error fetching logo for",
                item.channelData.channelName,
                err
              );
              return {
                ...item,
                channelData: {
                  ...item.channelData,
                  logoUrl: item.channelData.thumbnailUrl,
                },
              };
            }
          })
        );

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enrichedData));
        setHistory(enrichedData);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isLoggedIn]); // re-run when login status changes

  return (
    <div className="min-h-[90vh] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">
          {!loading && "Your AI Tutors"}
        </h1>

        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-cyan-300">
            {/* Animated Logo */}
            <motion.img
              src={logo} // <- Replace with your actual logo path
              alt="App Logo"
              className="w-32 h-32"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="text-lg font-medium">Loading your Tutors...</p>
          </div>
        ) : history.length === 0 ? (
          <p className="text-gray-400 text-lg">No history found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {history.map((item, index) => {
              const video = item.channelData;

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="cursor-pointer"
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 bg-white/10 backdrop-blur-lg border border-white/20 flex flex-col h-[420px]">
                    {/* Thumbnail */}
                    <div
                      className="relative flex-shrink-0 h-48 overflow-hidden"
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {video.duration}
                      </span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                        <Play className="w-12 h-12 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent
                      className="p-5 flex-grow flex flex-col justify-between"
                      onClick={() => navigate(`/tutor/${item.instanceId}`)}
                    >
                      <h2 className="font-semibold text-white line-clamp-2 text-lg flex items-center">
                        {video.channelName}
                        <SquareArrowOutUpRight className="ps-2 w-4 h-4 text-cyan-400" />
                      </h2>

                      <div className="text-sm text-gray-300 mt-2 flex-grow overflow-hidden">
                        <span className="text-amber-400 font-medium">
                          Last Trained on :
                        </span>
                        <div className="break-words mt-1">
                          {video.title} - playlist
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                        <span>{video.viewCount.toLocaleString()} views</span>
                        <span>{video.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
