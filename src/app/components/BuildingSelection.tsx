import { Logo } from "./Logo";
import { LogOut, Search } from "lucide-react";

interface Building {
  id: string;
  name: string;
  address: string;
  buildings: number;
}

interface BuildingSelectionProps {
  onSelectBuilding: (buildingId: string) => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

const buildings: Building[] = [
  {
    id: "1",
    name: "Stadtmitte",
    address: "Kanalstraße 33, 73728 Esslingen",
    buildings: 19,
  },
  {
    id: "2",
    name: "Flandernstraße",
    address: "Flandernstraße 101, 73732 Esslingen",
    buildings: 3,
  },
  {
    id: "3",
    name: "Göppingen",
    address: "Robert-Bosch-Straße 1, 73037 Göppingen",
    buildings: 5,
  },
];

export function BuildingSelection({ onSelectBuilding, onLogoClick, onLogout }: BuildingSelectionProps) {
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

      {/* Search Field - Centered on larger screens, below header on mobile */}
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
        <div className="text-2xl md:text-5xl lg:text-7xl tracking-tight mb-2 md:mb-3 lg:mb-4">Standortauswahl</div>
        <div className="text-lg md:text-3xl lg:text-4xl text-white/60">Wählen Sie einen Standort aus</div>
      </div>

      {/* Building Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {buildings.map((building) => (
          <button
            key={building.id}
            onClick={() => onSelectBuilding(building.id)}
            className="border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all text-left p-6 md:p-8 lg:p-10 flex flex-col justify-between"
          >
            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <div className="text-2xl md:text-3xl lg:text-5xl tracking-tight">
                {building.name}
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-base md:text-xl lg:text-2xl text-white/60">
                  {building.address}
                </div>
                <div className="text-base md:text-xl lg:text-2xl text-white/40">
                  {building.buildings} Gebäude
                </div>
              </div>
            </div>
            <div className="text-3xl md:text-4xl lg:text-6xl text-white/40 text-right mt-6 md:mt-8 lg:mt-10">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}