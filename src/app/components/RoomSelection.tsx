import { Logo } from "./Logo";
import { useState } from "react";
import { ChevronLeft, Plus, ChevronDown } from "lucide-react";
import { LogOut } from "lucide-react";
import { Search } from "lucide-react";

interface Room {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  type: string;
  events: string[];
  equipment: string[];
  available: boolean;
}

interface RoomSelectionProps {
  buildingId: string;
  onSelectRoom: (roomId: string) => void;
  onBack: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

const rooms: Room[] = [
  { 
    id: "1", 
    name: "Konferenzraum 1", 
    capacity: 8, 
    floor: "1. OG",
    type: "Konferenzraum",
    events: ["Meeting", "Präsentation"],
    equipment: ["Beamer", "Whiteboard"],
    available: true
  },
  { 
    id: "2", 
    name: "Konferenzraum 2", 
    capacity: 12, 
    floor: "1. OG",
    type: "Konferenzraum",
    events: ["Meeting", "Präsentation", "Konferenz"],
    equipment: ["Beamer", "Videokonferenz", "Whiteboard"],
    available: false
  },
  { 
    id: "3", 
    name: "Besprechungsraum A", 
    capacity: 6, 
    floor: "2. OG",
    type: "Besprechungsraum",
    events: ["Meeting", "Brainstorming"],
    equipment: ["Whiteboard"],
    available: true
  },
  { 
    id: "4", 
    name: "Besprechungsraum B", 
    capacity: 4, 
    floor: "2. OG",
    type: "Besprechungsraum",
    events: ["Meeting", "Interview"],
    equipment: ["Monitor"],
    available: true
  },
  { 
    id: "5", 
    name: "Boardroom", 
    capacity: 16, 
    floor: "3. OG",
    type: "Boardroom",
    events: ["Konferenz", "Präsentation", "Workshop"],
    equipment: ["Beamer", "Videokonferenz", "Whiteboard", "Sound"],
    available: true
  },
  { 
    id: "6", 
    name: "Think Tank", 
    capacity: 4, 
    floor: "EG",
    type: "Think Tank",
    events: ["Brainstorming", "Workshop"],
    equipment: ["Whiteboard"],
    available: false
  },
  { 
    id: "7", 
    name: "Innovation Lab", 
    capacity: 10, 
    floor: "EG",
    type: "Innovation Lab",
    events: ["Workshop", "Training", "Präsentation"],
    equipment: ["Beamer", "Whiteboard", "Sound"],
    available: true
  },
];

export function RoomSelection({ buildingId, onSelectRoom, onBack, onLogoClick, onLogout }: RoomSelectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRoomType, setSelectedRoomType] = useState<string>("Alle");
  const [selectedFloor, setSelectedFloor] = useState<string>("Alle");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("Alle");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Get unique room types from the rooms array
  const uniqueRoomTypes = ["Alle", ...Array.from(new Set(rooms.map(room => room.type)))];
  const floors = ["Alle", "EG", "1. OG", "2. OG", "3. OG"];
  const capacities = ["Alle", "Klein (≤6)", "Mittel (7-12)", "Groß (>12)"];

  const filteredRooms = rooms.filter((room) => {
    // Search filter
    const searchMatch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Room type filter
    const roomTypeMatch = selectedRoomType === "Alle" || room.type === selectedRoomType;
    
    // Floor filter
    const floorMatch = selectedFloor === "Alle" || room.floor === selectedFloor;
    
    // Capacity filter
    let capacityMatch = true;
    if (selectedCapacity === "Klein (≤6)") {
      capacityMatch = room.capacity <= 6;
    } else if (selectedCapacity === "Mittel (7-12)") {
      capacityMatch = room.capacity > 6 && room.capacity <= 12;
    } else if (selectedCapacity === "Groß (>12)") {
      capacityMatch = room.capacity > 12;
    }

    return searchMatch && roomTypeMatch && floorMatch && capacityMatch;
  });

  return (
    <div className="flex flex-col bg-black text-white p-4 md:p-8 lg:p-16 min-h-screen w-full">
      {/* Logo and Language Switcher */}
      <div className="mb-4 md:mb-6 lg:mb-12 flex items-start justify-between">
        <Logo onClick={onLogoClick} />
        
        <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
          <button className="px-2 py-1.5 md:px-5 md:py-3 lg:px-6 lg:py-4 text-xs md:text-xl lg:text-2xl border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all">
            <span className="text-white">DE</span>
            <span className="text-white/40"> / </span>
            <span className="text-white/40">EN</span>
          </button>
          <button
            onClick={onLogout}
            className="px-2 py-1.5 md:px-5 md:py-3 lg:px-6 lg:py-4 text-xs md:text-xl lg:text-2xl border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all flex items-center gap-1 md:gap-2"
          >
            <LogOut className="size-3 md:size-5 lg:size-6" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Search Field - Below header on mobile, centered on larger screens */}
      <div className="mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-[4rem] lg:top-[5rem] w-full md:max-w-md px-0 md:px-4">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 lg:left-5 top-1/2 transform -translate-y-1/2 size-4 md:size-5 lg:size-6 text-white/40" />
          <input
            type="text"
            placeholder="Raum suchen"
            className="w-full pl-10 md:pl-12 lg:pl-14 pr-4 py-2 md:py-3 lg:py-4 text-sm md:text-xl lg:text-2xl bg-black border-2 border-white/20 focus:border-white focus:outline-none transition-colors placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 md:mb-8 lg:mb-12 md:mt-16 lg:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2 md:mb-3 lg:mb-4">
          <div className="text-2xl md:text-5xl lg:text-7xl tracking-tight">Raumauswahl</div>
          <button
            onClick={onBack}
            className="px-3 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all self-start"
          >
            ZURÜCK
          </button>
        </div>
        <div className="text-lg md:text-3xl lg:text-4xl text-white/60">Wählen Sie einen Raum aus</div>
      </div>

      {/* Filter Toggle Button */}
      <div className="mb-4 md:mb-6 lg:mb-10">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-3 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all flex items-center gap-2"
        >
          <span>Filter</span>
          {isFilterOpen ? (
            <ChevronDown className="size-4 md:size-5 lg:size-6" />
          ) : (
            <Plus className="size-4 md:size-5 lg:size-6" />
          )}
        </button>
      </div>

      {/* Collapsible Filters */}
      {isFilterOpen && (
        <div className="mb-6 md:mb-8 lg:mb-12 space-y-4 md:space-y-5 lg:space-y-6">
          {/* Room Type Filter */}
          <div>
            <div className="text-base md:text-2xl lg:text-3xl text-white/60 mb-2 md:mb-3 lg:mb-4">Raumtyp</div>
            <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
              {uniqueRoomTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedRoomType(type)}
                  className={`px-3 py-1.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl transition-all ${
                    selectedRoomType === type
                      ? "bg-white text-black"
                      : "border-2 border-white/20 hover:border-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Floor Filter */}
          <div>
            <div className="text-base md:text-2xl lg:text-3xl text-white/60 mb-2 md:mb-3 lg:mb-4">Etage</div>
            <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
              {floors.map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-3 py-1.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl transition-all ${
                    selectedFloor === floor
                      ? "bg-white text-black"
                      : "border-2 border-white/20 hover:border-white"
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>

          {/* Capacity Filter */}
          <div>
            <div className="text-base md:text-2xl lg:text-3xl text-white/60 mb-2 md:mb-3 lg:mb-4">Kapazität</div>
            <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
              {capacities.map((capacity) => (
                <button
                  key={capacity}
                  onClick={() => setSelectedCapacity(capacity)}
                  className={`px-3 py-1.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl transition-all ${
                    selectedCapacity === capacity
                      ? "bg-white text-black"
                      : "border-2 border-white/20 hover:border-white"
                  }`}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="flex-1 space-y-3 md:space-y-4 lg:space-y-6 overflow-y-auto pb-4">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className="w-full p-4 md:p-6 lg:p-10 border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all text-left"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1 md:space-y-1.5 lg:space-y-2 flex-1">
                  <div className="text-xl md:text-3xl lg:text-5xl tracking-tight">{room.name}</div>
                  <div className="text-sm md:text-2xl lg:text-3xl text-white/60">
                    {room.type} · {room.capacity} Personen · {room.floor}
                  </div>
                  <div className="text-xs md:text-xl lg:text-2xl text-white/40">
                    {room.equipment.join(" · ")}
                  </div>
                </div>
                <div className="text-2xl md:text-4xl lg:text-6xl text-white/40 ml-4">→</div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-xl md:text-3xl lg:text-4xl text-white/40 text-center py-10 md:py-16 lg:py-20">
            Keine Räume gefunden
          </div>
        )}
      </div>
    </div>
  );
}