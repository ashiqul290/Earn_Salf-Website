"use client";

import { useState, useEffect } from "react";
import { FaLock, FaLockOpen, FaCheck, FaPlay, FaUpload, FaStar, FaCalendar, FaCoins } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const coursesData = {
  level1: {
    title: "Level 1: Beginner Basics",
    reward: 10,
    videos: [
      { id: 1, title: "Introduction to Courses", duration: "5:30" },
      { id: 2, title: "Getting Started", duration: "8:15" },
      { id: 3, title: "Basic Concepts", duration: "6:45" },
      { id: 4, title: "First Project", duration: "12:20" },
      { id: 5, title: "Level 1 Summary", duration: "4:50" }
    ]
  },
  level2: {
    title: "Level 2: Intermediate Skills",
    reward: 10,
    videos: [
      { id: 6, title: "Advanced Techniques", duration: "9:40" },
      { id: 7, title: "Practical Applications", duration: "11:15" },
      { id: 8, title: "Real World Examples", duration: "13:30" },
      { id: 9, title: "Problem Solving", duration: "10:20" },
      { id: 10, title: "Level 2 Project", duration: "15:45" }
    ]
  },
  level3: {
    title: "Level 3: Advanced Training",
    reward: 10,
    videos: [
      { id: 11, title: "Deep Dive Analytics", duration: "14:20" },
      { id: 12, title: "Expert Strategies", duration: "12:10" },
      { id: 13, title: "Optimization Tips", duration: "11:50" },
      { id: 14, title: "Case Studies", duration: "16:30" },
      { id: 15, title: "Industry Standards", duration: "10:15" }
    ]
  },
  level4: {
    title: "Level 4: Professional Mastery",
    reward: 10,
    videos: [
      { id: 16, title: "Professional Development", duration: "13:45" },
      { id: 17, title: "Business Implementation", duration: "14:20" },
      { id: 18, title: "Performance Metrics", duration: "12:50" },
      { id: 19, title: "Advanced Strategies", duration: "15:10" },
      { id: 20, title: "Professional Portfolio", duration: "17:30" }
    ]
  },
  level5: {
    title: "Level 5: Expert Certification",
    reward: 10,
    videos: [
      { id: 21, title: "Certification Prep", duration: "16:40" },
      { id: 22, title: "Industry Leadership", duration: "14:50" },
      { id: 23, title: "Advanced Certifications", duration: "15:20" },
      { id: 24, title: "Mastery Techniques", duration: "18:15" },
      { id: 25, title: "Final Certification Exam", duration: "20:00" }
    ]
  }
};

function VideoCard({ video, levelIndex, videoIndex, isCompleted, isLocked, isToday, onWatch, onSubmit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("Please select a file first");
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      onSubmit(levelIndex, videoIndex, uploadedFile);
      setUploadedFile(null);
      setIsUploading(false);
      setIsExpanded(false);
    }, 1500);
  };

  return (
    <div className={`transition-all duration-300 ${isLocked ? "opacity-50" : ""}`}>
      <button
        onClick={() => !isLocked && onWatch(levelIndex, videoIndex)}
        disabled={isLocked}
        className={`w-full rounded-2xl p-4 border transition-all duration-300 ${
          isCompleted
            ? "bg-gradient-to-br from-green-50 to-white border-green-200"
            : isLocked
            ? "bg-gray-50/50 border-gray-200 cursor-not-allowed"
            : "bg-white/60 border-white/20 hover:shadow-lg hover:-translate-y-1 cursor-pointer backdrop-filter backdrop-blur-lg"
        }`}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-white ${
            isCompleted
              ? "bg-gradient-to-br from-green-400 to-green-600"
              : isLocked
              ? "bg-gray-300"
              : "bg-gradient-to-br from-blue-400 to-blue-600"
          }`}>
            {isCompleted ? <FaCheck size={18} /> : isLocked ? <FaLock size={18} /> : <FaPlay size={16} />}
          </div>
          
          <div className="flex-1 text-left min-w-0">
            <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
              Video {videoIndex + 1}: {video.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">Duration: {video.duration}</p>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-600 border border-green-200 mt-2">
                <FaCheck size={12} /> Completed
              </span>
            )}
            {isToday && !isCompleted && !isLocked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-600 border border-yellow-200 mt-2">
                <FaCalendar size={12} /> Today's Video
              </span>
            )}
            {isLocked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 mt-2">
                <FaLock size={12} /> Locked
              </span>
            )}
          </div>

          {!isLocked && (
            <div className="text-[#FFEE57]">
              <FaPlay size={16} className="md:hidden" />
            </div>
          )}
        </div>
      </button>

      {isExpanded && !isLocked && (
        <div className="mt-3 bg-white/60 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 space-y-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg md:rounded-xl p-3 md:p-4 border border-blue-200">
            <p className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-widest mb-2">Video Information</p>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span>
                <span className="font-bold text-gray-900">{video.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-bold text-gray-900">{video.duration}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs md:text-sm font-bold text-gray-700">Upload Your Assignment</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-[#FFEE57] transition-colors">
              <input
                type="file"
                id={`file-${levelIndex}-${videoIndex}`}
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor={`file-${levelIndex}-${videoIndex}`}
                className="cursor-pointer"
              >
                <FaUpload className="text-2xl md:text-3xl text-gray-400 mx-auto mb-2 md:mb-3" />
                <p className="text-xs md:text-sm font-bold text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
              </label>
            </div>

            {uploadedFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg md:rounded-xl p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FaCheck className="text-green-600 flex-shrink-0" />
                  <p className="text-xs md:text-sm font-bold text-green-700 truncate">{uploadedFile.name}</p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-green-600 hover:text-green-800"
                >
                  <MdClose size={20} />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="flex-1 px-4 py-2 md:py-2.5 bg-gray-200/50 hover:bg-gray-300/50 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!uploadedFile || isUploading}
                className="flex-1 px-4 py-2 md:py-2.5 bg-gradient-to-r from-[#FFEE57] to-yellow-400 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              >
                {isUploading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLocked && !isCompleted && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 px-4 py-2 md:py-2.5 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg md:rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
        >
          {isExpanded ? "Hide Assignment" : "Watch & Submit"}
        </button>
      )}
    </div>
  );
}

function LevelSection({ levelKey, levelIndex, coursesData, completedVideos, lastWatchDate }) {
  const level = coursesData[levelKey];
  const levelVideos = level.videos;
  const allLevelVideosCompleted = levelVideos.every((_, idx) =>
    completedVideos[`${levelIndex}-${idx}`]
  );
  const nextLevelUnlocked = levelIndex === 0 || 
    coursesData[`level${levelIndex}`]?.videos.every((_, idx) =>
      completedVideos[`${levelIndex - 1}-${idx}`]
    );

  return (
    <div className={`space-y-4 md:space-y-6 ${!nextLevelUnlocked ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-white text-lg md:text-2xl ${
          allLevelVideosCompleted
            ? "bg-gradient-to-br from-green-400 to-green-600"
            : !nextLevelUnlocked
            ? "bg-gray-300"
            : "bg-gradient-to-br from-purple-400 to-purple-600"
        }`}>
          {allLevelVideosCompleted ? <FaCheck /> : !nextLevelUnlocked ? <FaLock /> : levelIndex + 1}
        </div>
        
        <div className="flex-1">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">{level.title}</h2>
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-600 border border-yellow-200">
              <FaCoins size={12} /> {level.reward}৳ per video
            </span>
            {allLevelVideosCompleted && (
              <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-green-50 text-green-600 border border-green-200">
                <FaCheck size={12} /> Completed
              </span>
            )}
            {!nextLevelUnlocked && (
              <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border border-gray-200">
                <FaLock size={12} /> Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {nextLevelUnlocked && (
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {levelVideos.map((video, videoIndex) => (
            <VideoCard
              key={video.id}
              video={video}
              levelIndex={levelIndex}
              videoIndex={videoIndex}
              isCompleted={completedVideos[`${levelIndex}-${videoIndex}`]}
              isLocked={videoIndex > 0 && !completedVideos[`${levelIndex}-${videoIndex - 1}`]}
              isToday={lastWatchDate?.[`${levelIndex}-${videoIndex}`] === new Date().toDateString()}
              onWatch={() => {}}
              onSubmit={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursesComponent() {
  const [completedVideos, setCompletedVideos] = useState({});
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lastWatchDate, setLastWatchDate] = useState({});
  const [dailyWatched, setDailyWatched] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const today = new Date().toDateString();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (levelIndex, videoIndex, file) => {
    setIsUploading(true);
    setTimeout(() => {
      const videoKey = `${levelIndex}-${videoIndex}`;
      setCompletedVideos((prev) => ({
        ...prev,
        [videoKey]: true
      }));
      setLastWatchDate((prev) => ({
        ...prev,
        [videoKey]: today
      }));

      const allVideosCompleted = Object.keys(completedVideos).length === 24 && 
        !completedVideos[`${levelIndex}-${videoIndex}`];
      
      if (videoIndex === 4) {
        setTotalEarnings((prev) => prev + 10);
      }

      setUploadedFile(null);
      setIsUploading(false);
      setExpandedVideo(null);
    }, 1500);
  };

  const allCoursesCompleted = Object.keys(completedVideos).length === 25;
  const totalReward = Object.keys(completedVideos).length > 0 && 
    (Math.floor(Object.keys(completedVideos).length / 5) * 10) + 
    (Object.keys(completedVideos).length % 5 > 0 ? 0 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-3 sm:p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#FFEE57] to-yellow-400 shadow-lg flex-shrink-0">
            <FaStar className="text-gray-800 text-xl sm:text-3xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Course Training</h1>
            <p className="text-gray-600 text-xs sm:text-base mt-1 sm:mt-2">Complete 5 levels and earn rewards</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <StatCard
          label="Videos Done"
          value={Object.keys(completedVideos).length}
          total="25"
          gradient="from-blue-400 to-blue-600"
          icon={FaPlay}
        />
        <StatCard
          label="Levels Complete"
          value={Math.floor(Object.keys(completedVideos).length / 5)}
          total="5"
          gradient="from-purple-400 to-purple-600"
          icon={FaStar}
        />
        <StatCard
          label="Total Earnings"
          value={`৳ ${totalReward}`}
          gradient="from-green-400 to-green-600"
          icon={FaCoins}
        />
        <StatCard
          label="Progress"
          value={`${Math.round((Object.keys(completedVideos).length / 25) * 100)}%`}
          gradient="from-yellow-400 to-yellow-600"
          icon={FaStar}
        />
      </div>

      {allCoursesCompleted && (
        <div className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-6 text-center">
          <FaCheck className="text-4xl text-green-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Congratulations! 🎉</h2>
          <p className="text-green-800 text-lg">আপনি সমস্ত কোর্স সম্পন্ন করেছেন এবং ৳ ৫০ অর্জন করেছেন!</p>
        </div>
      )}

      {/* Levels */}
      <div className="space-y-8 md:space-y-12">
        {Object.entries(coursesData).map(([levelKey, _], index) => (
          <LevelSection
            key={levelKey}
            levelKey={levelKey}
            levelIndex={index}
            coursesData={coursesData}
            completedVideos={completedVideos}
            lastWatchDate={lastWatchDate}
          />
        ))}
      </div>

      {/* Video Modal */}
      {expandedVideo && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white/95 backdrop-filter backdrop-blur-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Submit Assignment</h2>
              <button
                onClick={() => setExpandedVideo(null)}
                className="p-2 hover:bg-white rounded-lg transition"
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-5">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-blue-200">
                <p className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-widest mb-3">Video Details</p>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-bold text-gray-900">{expandedVideo.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">{expandedVideo.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-sm font-bold text-gray-700">Upload Your Assignment</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg md:rounded-xl p-6 md:p-8 text-center hover:border-[#FFEE57] transition-colors">
                  <input
                    type="file"
                    id="assignment-file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="assignment-file"
                    className="cursor-pointer"
                  >
                    <FaUpload className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-sm md:text-base font-bold text-gray-700">Click to upload file</p>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg md:rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <FaCheck className="text-green-600 flex-shrink-0" />
                      <p className="text-xs md:text-sm font-bold text-green-700 truncate">{uploadedFile.name}</p>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setExpandedVideo(null)}
                    className="flex-1 px-4 py-2 md:py-3 bg-gray-200/50 hover:bg-gray-300/50 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!uploadedFile) {
                        alert("Please select a file first");
                        return;
                      }
                      const [levelIndex, videoIndex] = expandedVideo.key.split('-').map(Number);
                      handleSubmit(levelIndex, videoIndex, uploadedFile);
                    }}
                    disabled={!uploadedFile || isUploading}
                    className="flex-1 px-4 py-2 md:py-3 bg-gradient-to-r from-[#FFEE57] to-yellow-400 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 disabled:opacity-50 text-xs md:text-base"
                  >
                    {isUploading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, total, gradient, icon: Icon }) {
  return (
    <div className="card-hover bg-white/60 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 md:p-5 shadow-lg border border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{label}</p>
          <h3 className="text-xl md:text-2xl font-black text-gray-900">{value}</h3>
          {total && (
            <p className="text-gray-500 text-xs md:text-sm mt-1">of {total}</p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
          <Icon className="text-white text-base md:text-xl" />
        </div>
      </div>
    </div>
  );
}