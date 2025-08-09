import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, SquareArrowOutUpRight } from "lucide-react";

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

  const LOCAL_STORAGE_KEY = "aiTutorHistory";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/history");
        const data = await res.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        setHistory(data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-[90vh] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
          Your AI Tutors
        </h1>

        {loading ? (
          <p className="text-gray-500 text-lg animate-pulse">
            Loading history...
          </p>
        ) : history.length === 0 ? (
          <p className="text-gray-500 text-lg">No history found.</p>
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
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer flex flex-col h-[400px]">
                    {/* Image */}
                    <div
                      className="relative flex-shrink-0 h-48"
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {video.duration}
                      </span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                        <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    <CardContent
                      className="p-4 flex-grow flex flex-col justify-between"
                      onClick={() => navigate(`/tutor/${item.instanceId}`)}
                    >
                      <h2 className="font-semibold text-gray-900 line-clamp-2 text-lg">
                        <div className="flex items-center">
                          {video.channelName}
                          <SquareArrowOutUpRight className="ps-2" />
                        </div>
                      </h2>

                      <div className="text-sm text-gray-600 mt-1 flex-grow overflow-hidden">
                        <div className="text-amber-600">Last Trained on :</div>
                        <div className="break-words">{video.title} - playlist</div>
                      </div>

                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
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
