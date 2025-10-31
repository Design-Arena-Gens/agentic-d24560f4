'use client';

import { useState } from 'react';
import { Upload, Video, Download, Wand2, Settings, Sparkles } from 'lucide-react';

interface VideoData {
  id: string;
  url: string;
  caption: string;
  hashtags: string[];
  scheduled?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'generate' | 'schedule'>('upload');
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = () => {
    if (videoFile) {
      const newVideo: VideoData = {
        id: Date.now().toString(),
        url: URL.createObjectURL(videoFile),
        caption: caption || 'Check out this amazing reel! 🔥',
        hashtags: hashtags.split(',').map(h => h.trim()).filter(Boolean),
        scheduled: scheduleTime || undefined,
      };
      setVideos([...videos, newVideo]);
      setVideoFile(null);
      setCaption('');
      setHashtags('');
      setScheduleTime('');
    }
  };

  const generateCaption = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const captions = [
      "✨ Living my best life! Can't stop, won't stop 💪",
      "🌟 Chasing dreams and catching vibes ✌️",
      "🔥 When life gives you lemons, make viral content 🍋",
      "💫 Behind the scenes of pure magic ✨",
      "🎯 Making moves and breaking rules 🚀",
    ];
    const tags = [
      "#reels #viral #trending #instagood #instagram",
      "#reelsinstagram #explore #fyp #foryou #viralreels",
      "#instareels #reelitfeelit #reelsvideo #explorepage #trend",
      "#igdaily #motivation #lifestyle #creator #contentcreator",
    ];
    setCaption(captions[Math.floor(Math.random() * captions.length)]);
    setHashtags(tags[Math.floor(Math.random() * tags.length)]);
    setGenerating(false);
  };

  const generateVideo = async () => {
    if (!prompt) return;
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newVideo: VideoData = {
      id: Date.now().toString(),
      url: '/api/placeholder-video',
      caption: `🎬 ${prompt} ✨`,
      hashtags: ['aiart', 'generated', 'reels', 'viral', 'creative'],
      scheduled: scheduleTime || undefined,
    };
    setVideos([...videos, newVideo]);
    setPrompt('');
    setScheduleTime('');
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-12 h-12 text-pink-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Reels Automator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Create, schedule, and optimize your Instagram Reels automatically</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Upload Video
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === 'generate'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Wand2 className="w-5 h-5 inline mr-2" />
                AI Generate
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Manage Queue
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'upload' && (
                <div className="space-y-6">
                  <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-pink-400 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        {videoFile ? videoFile.name : 'Click to upload your reel'}
                      </p>
                      <p className="text-gray-500">MP4, MOV, AVI (Max 500MB)</p>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write an engaging caption..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={3}
                    />
                    <button
                      onClick={generateCaption}
                      disabled={generating}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all"
                    >
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      {generating ? 'Generating...' : 'AI Generate Caption'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
                    <input
                      type="text"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      placeholder="reels, viral, trending, instagood, instagram"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule (Optional)</label>
                    <input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!videoFile}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                    {scheduleTime ? 'Schedule Reel' : 'Add to Queue'}
                  </button>
                </div>
              )}

              {activeTab === 'generate' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">AI Video Generator</h3>
                    <p className="text-gray-600">Describe your reel and let AI create it for you</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Video Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Example: A sunset over the ocean with calming waves"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule (Optional)</label>
                    <input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={generateVideo}
                    disabled={!prompt || generating}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                    <Wand2 className="w-5 h-5 inline mr-2" />
                    {generating ? 'Generating Video...' : 'Generate Reel'}
                  </button>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Your Queue</h3>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                      {videos.length} Reels
                    </span>
                  </div>

                  {videos.length === 0 ? (
                    <div className="text-center py-16">
                      <Video className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                      <p className="text-xl text-gray-500">No reels in queue yet</p>
                      <p className="text-gray-400 mt-2">Upload or generate your first reel to get started</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {videos.map((video) => (
                        <div key={video.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                          <div className="flex gap-4">
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                              <Video className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 mb-2">{video.caption}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {video.hashtags.map((tag, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              {video.scheduled && (
                                <p className="text-sm text-gray-500">
                                  Scheduled: {new Date(video.scheduled).toLocaleString()}
                                </p>
                              )}
                            </div>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors h-fit">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Upload</h3>
              <p className="text-gray-600">Upload your videos and let AI optimize captions and hashtags</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Generation</h3>
              <p className="text-gray-600">Create stunning reels from text prompts using AI</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Smart Scheduling</h3>
              <p className="text-gray-600">Schedule posts for optimal engagement times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
