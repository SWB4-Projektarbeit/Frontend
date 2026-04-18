import { Logo } from "./Logo";
import { LogOut, Moon, Sun, ZoomIn, ZoomOut } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
}

interface TemplateSelectionProps {
  onSelectTemplate: (templateId: string) => void;
  onBack: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Standard",
    description: "Klassische Ansicht mit Uhrzeit und Status",
  },
  {
    id: "2",
    name: "Kompakt",
    description: "Minimale Darstellung für kleine Displays",
  },
  {
    id: "3",
    name: "Detailliert",
    description: "Erweiterte Informationen und Tagesübersicht",
  },
  {
    id: "4",
    name: "Modern",
    description: "Zeitgemäßes Design mit großen Elementen",
  },
];

export function TemplateSelection({ onSelectTemplate, onBack, onLogoClick, onLogout, isDarkMode, onToggleDarkMode, zoomLevel, onZoomIn, onZoomOut, onResetZoom }: TemplateSelectionProps) {
  const handleAddTemplate = () => {
    alert("Template hinzufügen - Funktion wird noch implementiert");
  };

  return (
    <div className={`flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-12 min-h-screen w-full`}>
      {/* Logo and Controls */}
      <div className="mb-10 flex items-start justify-between">
        <Logo onClick={onLogoClick} isDarkMode={isDarkMode} />
        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onZoomOut}
              disabled={zoomLevel <= 50}
              className={`p-2 border-2 ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black disabled:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white" 
                  : "border-black hover:bg-black hover:text-white disabled:border-black/20 disabled:hover:bg-transparent disabled:hover:text-black"
              } transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Zoom Out"
              title="Verkleinern"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={onResetZoom}
              className={`px-3 py-2 border-2 text-sm ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black" 
                  : "border-black hover:bg-black hover:text-white"
              } transition-colors min-w-[60px]`}
              aria-label="Reset Zoom"
              title="Zoom zurücksetzen"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoomLevel >= 150}
              className={`p-2 border-2 ${
                isDarkMode 
                  ? "border-white hover:bg-white hover:text-black disabled:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white" 
                  : "border-black hover:bg-black hover:text-white disabled:border-black/20 disabled:hover:bg-transparent disabled:hover:text-black"
              } transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Zoom In"
              title="Vergrößern"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onToggleDarkMode}
            className={`px-4 py-3 text-xl border-2 ${
              isDarkMode 
                ? "border-white/20 hover:border-white hover:bg-white/5" 
                : "border-black/20 hover:border-black hover:bg-black/5"
            } transition-all flex items-center gap-2`}
          >
            {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
            <span>{isDarkMode ? "Light" : "Dark"}</span>
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
          <button
            onClick={onLogout}
            className={`px-5 py-3 text-xl border-2 ${
              isDarkMode 
                ? "border-white/20 hover:border-white hover:bg-white/5" 
                : "border-black/20 hover:border-black hover:bg-black/5"
            } transition-all flex items-center gap-2`}
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-6xl tracking-tight">Template Auswahl</div>
          <button
            onClick={onBack}
            className={`px-7 py-3 text-2xl border-2 ${
              isDarkMode 
                ? "border-white/20 hover:border-white hover:bg-white/5" 
                : "border-black/20 hover:border-black hover:bg-black/5"
            } transition-all`}
          >
            ZURÜCK
          </button>
        </div>
        <div className={`text-3xl ${isDarkMode ? "text-white/60" : "text-black/60"}`}>Wählen Sie ein Display-Template</div>
      </div>

      {/* Template Grid */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Templates Row */}
        <div className="grid grid-cols-4 gap-5 mb-5">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`border-2 ${
                isDarkMode 
                  ? "border-white/20 hover:border-white hover:bg-white/5" 
                  : "border-black/20 hover:border-black hover:bg-black/5"
              } transition-all text-left p-5 flex flex-col`}
            >
              {/* Template Preview Placeholder */}
              <div className={`w-full aspect-[3/4] border-2 ${
                isDarkMode ? "border-white/10" : "border-black/10"
              } mb-3 flex items-center justify-center`}>
                <div className={`text-5xl ${
                  isDarkMode ? "text-white/20" : "text-black/20"
                }`}>
                  {template.id}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="text-2xl tracking-tight">{template.name}</div>
                <div className={`text-lg ${
                  isDarkMode ? "text-white/60" : "text-black/60"
                } leading-snug`}>{template.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Add Template Button - Full Width */}
        <button
          onClick={handleAddTemplate}
          className={`w-full border-2 border-dashed ${
            isDarkMode 
              ? "border-white/20 hover:border-white hover:bg-white/5" 
              : "border-black/20 hover:border-black hover:bg-black/5"
          } transition-all flex flex-col items-center justify-center gap-3 py-10`}
        >
          <div className={`text-6xl ${
            isDarkMode ? "text-white/40" : "text-black/40"
          }`}>+</div>
          <div className="text-xl tracking-tight">Template hinzufügen</div>
        </button>
      </div>
    </div>
  );
}
