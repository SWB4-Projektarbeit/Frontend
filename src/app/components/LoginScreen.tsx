import { useState } from "react";
import { Logo } from "./Logo";
import { Moon, Sun, ZoomIn, ZoomOut, Minimize2 } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function LoginScreen({ 
  onLogin, 
  isDarkMode, 
  onToggleDarkMode,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom
}: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={`flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen w-full`}>
      {/* Logo Header */}
      <div className="p-8 flex items-start justify-between">
        <Logo isDarkMode={isDarkMode} />
        <div className="flex items-center gap-5">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onZoomOut}
              disabled={zoomLevel <= 50}
              className={`p-3 border-2 ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black disabled:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white" 
                  : "border-black hover:bg-black hover:text-white disabled:border-black/20 disabled:hover:bg-transparent disabled:hover:text-black"
              } transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Zoom Out"
              title="Verkleinern"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={onResetZoom}
              className={`px-4 py-3 border-2 text-base ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black" 
                  : "border-black hover:bg-black hover:text-white"
              } transition-colors min-w-[70px]`}
              aria-label="Reset Zoom"
              title="Zoom zurücksetzen"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoomLevel >= 150}
              className={`p-3 border-2 ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black disabled:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white" 
                  : "border-black hover:bg-black hover:text-white disabled:border-black/20 disabled:hover:bg-transparent disabled:hover:text-black"
              } transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Zoom In"
              title="Vergrößern"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-3 border-2 ${
              isDarkMode 
                ? "border-white hover:bg-white hover:text-black" 
                : "border-black hover:bg-black hover:text-white"
            } transition-colors`}
            aria-label="Toggle Dark/Light Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <button className={`px-5 py-3 text-xl border-2 ${
            isDarkMode 
              ? "border-white/20 hover:border-white hover:bg-white/5" 
              : "border-black/20 hover:border-black hover:bg-black/5"
          } transition-all`}>
            <span className={isDarkMode ? "text-white" : "text-black"}>DE</span>
            <span className={isDarkMode ? "text-white/40" : "text-black/40"}> / </span>
            <span className={isDarkMode ? "text-white/40" : "text-black/40"}>EN</span>
          </button>
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        <div className="text-7xl tracking-tight mb-14 text-center">
          E-Paper-Display System
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-7">
          <div className="space-y-2">
            <label htmlFor="username" className={`block text-xl ${
              isDarkMode ? "text-white/60" : "text-black/60"
            }`}>
              Benutzername
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-5 py-4 text-xl ${
                isDarkMode 
                  ? "bg-black border-white/20 focus:border-white text-white" 
                  : "bg-white border-black/20 focus:border-black text-black"
              } border-2 focus:outline-none transition-colors`}
              placeholder="Benutzername eingeben"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={`block text-xl ${
              isDarkMode ? "text-white/60" : "text-black/60"
            }`}>
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 text-xl ${
                isDarkMode 
                  ? "bg-black border-white/20 focus:border-white text-white" 
                  : "bg-white border-black/20 focus:border-black text-black"
              } border-2 focus:outline-none transition-colors`}
              placeholder="Passwort eingeben"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-8 py-4 text-2xl tracking-wide border-2 ${
              isDarkMode 
                ? "border-white hover:bg-white hover:text-black" 
                : "border-black hover:bg-black hover:text-white"
            } transition-all mt-7`}
          >
            ANMELDEN
          </button>
        </form>
      </div>
    </div>
  );
}