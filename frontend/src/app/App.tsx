import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { CameraRecognition } from './components/CameraRecognition';
import { AlphabetGrid } from './components/AlphabetGrid';
import { PracticeMode } from './components/PracticeMode';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Camera, BookOpen, Target, BarChart3, Brain, Sun, Moon } from 'lucide-react';
import { Toaster } from "react-hot-toast";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('recognition');
  const [darkMode, setDarkMode] = useState(false);

  // تحميل التوكن + الدارك مود
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // تغيير الدارك مود
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Toaster position="top-right" />

      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

          {/* HEADER */}
          <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition">

            <div className="container mx-auto px-4 py-4 flex justify-between items-center">

              {/* LOGO */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Brain className="size-8 text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold dark:text-white">SignAI</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    AI-Powered Sign Language Learning
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-2">

                {/* DARK MODE BUTTON */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
                >
                  {darkMode ? (
                    <Sun className="size-5 text-yellow-500" />
                  ) : (
                    <Moon className="size-5 text-gray-800" />
                  )}
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </div>

            </div>
          </header>

          {/* MAIN */}
          <main className="container mx-auto px-4 py-8">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl">

                <TabsTrigger value="recognition" className="gap-2 py-3 dark:text-white">
                  <Camera className="size-4" /> Recognition
                </TabsTrigger>

                <TabsTrigger value="learn" className="gap-2 py-3 dark:text-white">
                  <BookOpen className="size-4" /> Learn
                </TabsTrigger>

                <TabsTrigger value="practice" className="gap-2 py-3 dark:text-white">
                  <Target className="size-4" /> Practice
                </TabsTrigger>

                <TabsTrigger value="progress" className="gap-2 py-3 dark:text-white">
                  <BarChart3 className="size-4" /> Progress
                </TabsTrigger>

              </TabsList>

              <TabsContent value="recognition">
                <CameraRecognition />
              </TabsContent>

              <TabsContent value="learn">
                <AlphabetGrid />
              </TabsContent>

              <TabsContent value="practice">
                <PracticeMode />
              </TabsContent>

              <TabsContent value="progress">
                <ProgressDashboard />
              </TabsContent>

            </Tabs>

          </main>

        </div>
      )}
    </>
  );
}