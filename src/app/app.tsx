import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { MainDashboard } from "./components/MainDashboard";
import { TemplateSelection } from "./components/TemplateSelection";
import { RoomDisplay } from "./components/RoomDisplay";

type Screen = "login" | "dashboard" | "template" | "display";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleLogin = () => {
    setCurrentScreen("dashboard");
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    setCurrentScreen("template");
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentScreen("display");
  };

  const handleBackFromDisplay = () => {
    setCurrentScreen("template");
  };

  const handleBackFromTemplate = () => {
    setCurrentScreen("dashboard");
  };

  const handleLogoClick = () => {
    setCurrentScreen("login");
    setSelectedRoom("");
    setSelectedTemplate("");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setSelectedRoom("");
    setSelectedTemplate("");
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className={`size-full ${isDarkMode ? "bg-black" : "bg-white"} overflow-auto`}>
      <div 
        style={{ 
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top left',
          width: `${10000 / zoomLevel}%`,
          minHeight: `${10000 / zoomLevel}%`,
          minWidth: '1200px'
        }}
      >
        {currentScreen === "login" && (
          <LoginScreen 
            onLogin={handleLogin} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        )}
        {currentScreen === "dashboard" && (
          <MainDashboard 
            onSelectRoom={handleRoomSelect}
            onLogoClick={handleLogoClick}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        )}
        {currentScreen === "template" && (
          <TemplateSelection 
            onSelectTemplate={handleTemplateSelect}
            onBack={handleBackFromTemplate}
            onLogoClick={handleLogoClick}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        )}
        {currentScreen === "display" && (
          <RoomDisplay 
            roomId={selectedRoom} 
            templateId={selectedTemplate}
            onBack={handleBackFromDisplay}
            onLogoClick={handleLogoClick}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        )}
      </div>
    </div>
  );
}