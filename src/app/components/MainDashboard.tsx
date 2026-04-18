import { useState } from "react";
import { Logo } from "./Logo";
import { LogOut, Search, ChevronDown, Moon, Sun, ZoomIn, ZoomOut } from "lucide-react";

interface Room {
  id: string;
  name: string;
  location: string;
  building: string;
  type: string;
  capacity: number;
  floor: string;
  equipment: string[];
}

interface MainDashboardProps {
  onSelectRoom: (roomId: string) => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

// Consolidated room data from all locations and buildings
const allRooms: Room[] = [
  // Stadtmitte - Gebäude 1
  { id: "sm-g1-r1", name: "1.01", location: "Stadtmitte", building: "Gebäude 1", type: "Hörsaal", capacity: 120, floor: "EG", equipment: ["Beamer", "Mikrofonanlage", "Whiteboard"] },
  { id: "sm-g1-r2", name: "1.15", location: "Stadtmitte", building: "Gebäude 1", type: "Seminarraum", capacity: 30, floor: "EG", equipment: ["Beamer", "Whiteboard"] },
  { id: "sm-g1-r3", name: "2.03", location: "Stadtmitte", building: "Gebäude 1", type: "Labor", capacity: 20, floor: "1. OG", equipment: ["PC-Arbeitsplätze", "Messinstrumente"] },
  { id: "sm-g1-r4", name: "3.12", location: "Stadtmitte", building: "Gebäude 1", type: "Seminarraum", capacity: 25, floor: "2. OG", equipment: ["Beamer", "Flipchart"] },
  
  // Stadtmitte - Gebäude 2
  { id: "sm-g2-r1", name: "A.201", location: "Stadtmitte", building: "Gebäude 2", type: "Hörsaal", capacity: 80, floor: "2. OG", equipment: ["Beamer", "Mikrofonanlage"] },
  { id: "sm-g2-r2", name: "B.105", location: "Stadtmitte", building: "Gebäude 2", type: "Seminarraum", capacity: 35, floor: "1. OG", equipment: ["Beamer", "Whiteboard", "Smart TV"] },
  { id: "sm-g2-r3", name: "C.304", location: "Stadtmitte", building: "Gebäude 2", type: "Besprechungsraum", capacity: 12, floor: "3. OG", equipment: ["Beamer", "Videokonferenz"] },
  
  // Stadtmitte - Gebäude 3
  { id: "sm-g3-r1", name: "R.101", location: "Stadtmitte", building: "Gebäude 3", type: "Hörsaal", capacity: 150, floor: "EG", equipment: ["Beamer", "Mikrofonanlage", "Dokumentenkamera"] },
  { id: "sm-g3-r2", name: "R.215", location: "Stadtmitte", building: "Gebäude 3", type: "PC-Pool", capacity: 40, floor: "2. OG", equipment: ["PC-Arbeitsplätze", "Beamer"] },
  { id: "sm-g3-r3", name: "R.308", location: "Stadtmitte", building: "Gebäude 3", type: "Seminarraum", capacity: 28, floor: "3. OG", equipment: ["Beamer", "Whiteboard"] },
  
  // Flandernstraße - Gebäude 1
  { id: "fl-g1-r1", name: "F.101", location: "Flandernstraße", building: "Gebäude F", type: "Hörsaal", capacity: 100, floor: "EG", equipment: ["Beamer", "Mikrofonanlage"] },
  { id: "fl-g1-r2", name: "F.203", location: "Flandernstraße", building: "Gebäude F", type: "Labor", capacity: 25, floor: "2. OG", equipment: ["Laborausstattung", "Abzug"] },
  { id: "fl-g1-r3", name: "F.315", location: "Flandernstraße", building: "Gebäude F", type: "Seminarraum", capacity: 30, floor: "3. OG", equipment: ["Beamer", "Whiteboard"] },
  
  // Flandernstraße - Gebäude 2
  { id: "fl-g2-r1", name: "T.102", location: "Flandernstraße", building: "Gebäude T", type: "Werkstatt", capacity: 18, floor: "EG", equipment: ["Werkzeugmaschinen", "CNC-Fräse"] },
  { id: "fl-g2-r2", name: "T.205", location: "Flandernstraße", building: "Gebäude T", type: "Seminarraum", capacity: 32, floor: "2. OG", equipment: ["Beamer", "Smart TV"] },
  
  // Göppingen - Gebäude 1
  { id: "gp-g1-r1", name: "G.001", location: "Göppingen", building: "Hauptgebäude", type: "Hörsaal", capacity: 90, floor: "EG", equipment: ["Beamer", "Mikrofonanlage"] },
  { id: "gp-g1-r2", name: "G.112", location: "Göppingen", building: "Hauptgebäude", type: "Seminarraum", capacity: 35, floor: "1. OG", equipment: ["Beamer", "Whiteboard"] },
  { id: "gp-g1-r3", name: "G.220", location: "Göppingen", building: "Hauptgebäude", type: "Labor", capacity: 22, floor: "2. OG", equipment: ["PC-Arbeitsplätze", "Spezialausstattung"] },
  
  // Göppingen - Gebäude 2
  { id: "gp-g2-r1", name: "L.105", location: "Göppingen", building: "Laborgebäude", type: "Labor", capacity: 20, floor: "1. OG", equipment: ["Laborausstattung", "Messgeräte"] },
  { id: "gp-g2-r2", name: "L.208", location: "Göppingen", building: "Laborgebäude", type: "Besprechungsraum", capacity: 15, floor: "2. OG", equipment: ["Beamer", "Videokonferenz"] },
];

export function MainDashboard({ onSelectRoom, onLogoClick, onLogout, isDarkMode, onToggleDarkMode, zoomLevel, onZoomIn, onZoomOut, onResetZoom }: MainDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("Alle");
  const [selectedBuilding, setSelectedBuilding] = useState<string>("Alle");
  const [selectedRoomType, setSelectedRoomType] = useState<string>("Alle");
  const [selectedFloor, setSelectedFloor] = useState<string>("Alle");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("Alle");
  
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [isRoomTypeOpen, setIsRoomTypeOpen] = useState(false);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isCapacityOpen, setIsCapacityOpen] = useState(false);

  // Get unique values for filters
  const locations = ["Alle", ...Array.from(new Set(allRooms.map(r => r.location)))];
  const buildings = selectedLocation === "Alle" 
    ? ["Alle", ...Array.from(new Set(allRooms.map(r => r.building)))]
    : ["Alle", ...Array.from(new Set(allRooms.filter(r => r.location === selectedLocation).map(r => r.building)))];
  const roomTypes = ["Alle", ...Array.from(new Set(allRooms.map(r => r.type)))];
  const floors = ["Alle", ...Array.from(new Set(allRooms.map(r => r.floor)))];
  const capacities = ["Alle", "< 20", "20-50", "50-100", "> 100"];

  // Filter rooms
  const filteredRooms = allRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === "Alle" || room.location === selectedLocation;
    const matchesBuilding = selectedBuilding === "Alle" || room.building === selectedBuilding;
    const matchesRoomType = selectedRoomType === "Alle" || room.type === selectedRoomType;
    const matchesFloor = selectedFloor === "Alle" || room.floor === selectedFloor;
    
    let matchesCapacity = true;
    if (selectedCapacity === "< 20") matchesCapacity = room.capacity < 20;
    else if (selectedCapacity === "20-50") matchesCapacity = room.capacity >= 20 && room.capacity < 50;
    else if (selectedCapacity === "50-100") matchesCapacity = room.capacity >= 50 && room.capacity <= 100;
    else if (selectedCapacity === "> 100") matchesCapacity = room.capacity > 100;

    return matchesSearch && matchesLocation && matchesBuilding && matchesRoomType && matchesFloor && matchesCapacity;
  });

  return (
    <div className={`flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen w-full`}>
      {/* Top Header */}
      <div className={`p-6 border-b ${isDarkMode ? "border-white/20" : "border-black/20"} flex items-center justify-between`}>
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

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Filters */}
        <div className={`w-96 border-r ${isDarkMode ? "border-white/20" : "border-black/20"} p-8 overflow-y-auto`}>
          <div className="space-y-8">
            {/* Search */}
            <div>
              <div className="text-2xl mb-4">Suche</div>
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 size-5 ${isDarkMode ? "text-white/40" : "text-black/40"}`} />
                <input
                  type="text"
                  placeholder="Raum oder Event suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 text-xl ${
                    isDarkMode 
                      ? "bg-black border-white/20 focus:border-white placeholder:text-white/40 text-white" 
                      : "bg-white border-black/20 focus:border-black placeholder:text-black/40 text-black"
                  } border-2 focus:outline-none transition-colors`}
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className={`w-full flex items-center justify-between text-2xl mb-4 ${
                  isDarkMode ? "hover:text-white/80" : "hover:text-black/80"
                } transition-colors`}
              >
                <span>Standort</span>
                <ChevronDown className={`size-5 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLocationOpen && (
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        if (location !== selectedLocation) {
                          setSelectedBuilding("Alle");
                        }
                      }}
                      className={`w-full text-left px-4 py-3 text-xl transition-all ${
                        selectedLocation === location
                          ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                          : isDarkMode 
                            ? "border-2 border-white/20 hover:border-white" 
                            : "border-2 border-black/20 hover:border-black"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Building Filter */}
            <div>
              <button
                onClick={() => setIsBuildingOpen(!isBuildingOpen)}
                className={`w-full flex items-center justify-between text-2xl mb-4 ${
                  isDarkMode ? "hover:text-white/80" : "hover:text-black/80"
                } transition-colors`}
              >
                <span>Gebäude</span>
                <ChevronDown className={`size-5 transition-transform ${isBuildingOpen ? 'rotate-180' : ''}`} />
              </button>
              {isBuildingOpen && (
                <div className="space-y-2">
                  {buildings.map((building) => (
                    <button
                      key={building}
                      onClick={() => setSelectedBuilding(building)}
                      className={`w-full text-left px-4 py-3 text-xl transition-all ${
                        selectedBuilding === building
                          ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                          : isDarkMode 
                            ? "border-2 border-white/20 hover:border-white" 
                            : "border-2 border-black/20 hover:border-black"
                      }`}
                    >
                      {building}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Type Filter */}
            <div>
              <button
                onClick={() => setIsRoomTypeOpen(!isRoomTypeOpen)}
                className={`w-full flex items-center justify-between text-2xl mb-4 ${
                  isDarkMode ? "hover:text-white/80" : "hover:text-black/80"
                } transition-colors`}
              >
                <span>Raumtyp</span>
                <ChevronDown className={`size-5 transition-transform ${isRoomTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              {isRoomTypeOpen && (
                <div className="space-y-2">
                  {roomTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedRoomType(type)}
                      className={`w-full text-left px-4 py-3 text-xl transition-all ${
                        selectedRoomType === type
                          ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                          : isDarkMode 
                            ? "border-2 border-white/20 hover:border-white" 
                            : "border-2 border-black/20 hover:border-black"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Floor Filter */}
            <div>
              <button
                onClick={() => setIsFloorOpen(!isFloorOpen)}
                className={`w-full flex items-center justify-between text-2xl mb-4 ${
                  isDarkMode ? "hover:text-white/80" : "hover:text-black/80"
                } transition-colors`}
              >
                <span>Etage</span>
                <ChevronDown className={`size-5 transition-transform ${isFloorOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFloorOpen && (
                <div className="space-y-2">
                  {floors.map((floor) => (
                    <button
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      className={`w-full text-left px-4 py-3 text-xl transition-all ${
                        selectedFloor === floor
                          ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                          : isDarkMode 
                            ? "border-2 border-white/20 hover:border-white" 
                            : "border-2 border-black/20 hover:border-black"
                      }`}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Capacity Filter */}
            <div>
              <button
                onClick={() => setIsCapacityOpen(!isCapacityOpen)}
                className={`w-full flex items-center justify-between text-2xl mb-4 ${
                  isDarkMode ? "hover:text-white/80" : "hover:text-black/80"
                } transition-colors`}
              >
                <span>Kapazität</span>
                <ChevronDown className={`size-5 transition-transform ${isCapacityOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCapacityOpen && (
                <div className="space-y-2">
                  {capacities.map((capacity) => (
                    <button
                      key={capacity}
                      onClick={() => setSelectedCapacity(capacity)}
                      className={`w-full text-left px-4 py-3 text-xl transition-all ${
                        selectedCapacity === capacity
                          ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                          : isDarkMode 
                            ? "border-2 border-white/20 hover:border-white" 
                            : "border-2 border-black/20 hover:border-black"
                      }`}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area - Room List */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <div className="text-5xl tracking-tight mb-2">
              {filteredRooms.length} {filteredRooms.length === 1 ? 'Raum' : 'Räume'}
            </div>
            <div className={`text-2xl ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Wählen Sie einen Raum aus
            </div>
          </div>

          <div className="space-y-4">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className={`w-full p-8 border-2 ${
                    isDarkMode 
                      ? "border-white/20 hover:border-white hover:bg-white/5" 
                      : "border-black/20 hover:border-black hover:bg-black/5"
                  } transition-all text-left`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="text-4xl tracking-tight">{room.name}</div>
                      <div className={`text-2xl ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {room.location} · {room.building} · {room.type}
                      </div>
                      <div className={`text-xl ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {room.capacity} Personen · {room.floor}
                      </div>
                      <div className={`text-lg ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        {room.equipment.join(" · ")}
                      </div>
                    </div>
                    <div className={`text-5xl ${isDarkMode ? "text-white/40" : "text-black/40"} ml-4`}>→</div>
                  </div>
                </button>
              ))
            ) : (
              <div className={`text-4xl ${isDarkMode ? "text-white/40" : "text-black/40"} text-center py-20`}>
                Keine Räume gefunden
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}