import { Logo } from "./Logo";
import { ChevronLeft } from "lucide-react";
import { LogOut } from "lucide-react";
import { Search } from "lucide-react";

interface BuildingDetail {
  id: string;
  number: string;
  address: string;
  description: string;
}

interface BuildingDetailSelectionProps {
  locationId: string;
  onSelectBuilding: (buildingId: string) => void;
  onBack: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

const buildings: BuildingDetail[] = [
  {
    id: "1",
    number: "1",
    address: "Kanalstraße 33",
    description: "Rektorat, Verwaltung, Referat Kommunikation, Fundraising, Hörsäle, Seminarräume",
  },
  {
    id: "2",
    number: "2",
    address: "Mühlstraße 1",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik, Mobilität und Technik, GründES!–MakerSpacES!",
  },
  {
    id: "3",
    number: "3",
    address: "Mühlstraße 5",
    description: "Mobilität und Technik",
  },
  {
    id: "4",
    number: "4",
    address: "Mühlstraße 5",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik, Mobilität und Technik",
  },
  {
    id: "5",
    number: "5",
    address: "Mühlstraße 7",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik, Maschinen und Systeme, Studentische Arbeitsplätze",
  },
  {
    id: "6",
    number: "6",
    address: "Obertorstraße 16",
    description: "Maschinen und Systeme, Mobilität und Technik",
  },
  {
    id: "7",
    number: "7",
    address: "Mühlstraße 3",
    description: "IZ-Rechenzentrum, Seminarräume",
  },
  {
    id: "8",
    number: "8",
    address: "Mühlstraße 9",
    description: "Hörsaal, AStA",
  },
  {
    id: "9",
    number: "9",
    address: "Kanalstraße 31",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik, Maschinen und Systeme, Referat Prototypenbau und Fertigung",
  },
  {
    id: "10",
    number: "10",
    address: "Kanalstraße 29",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik, Maschinen und Systeme, Mobilität und Technik",
  },
  {
    id: "11",
    number: "12",
    address: "Neckarstraße 67",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik",
  },
  {
    id: "12",
    number: "13",
    address: "Neckarstraße 63",
    description: "Mobilität und Technik",
  },
  {
    id: "13",
    number: "14",
    address: "Neckarstraße 65/1",
    description: "Mobilität und Technik, GründES! Entrepreneurshipzentrum",
  },
  {
    id: "14",
    number: "15",
    address: "Mühlstraße 16",
    description: "Angewandte Naturwissenschaften, Energie- und Gebäudetechnik",
  },
  {
    id: "15",
    number: "16",
    address: "Kanalstraße 27",
    description: "Mensa",
  },
  {
    id: "16",
    number: "17",
    address: "Kanalstraße 12/1",
    description: "International Centre and Graduate School, Career Centre, Referat Zentrale Studienberatung",
  },
  {
    id: "17",
    number: "18",
    address: "Neckarstraße 71",
    description: "Virtual Automation Lab, Maschinen und Systeme",
  },
  {
    id: "18",
    number: "19",
    address: "Kiesstraße 6",
    description: "GründES! Entrepreneurshipzentrum",
  },
];

const buildingsFlandernstrasse: BuildingDetail[] = [
  {
    id: "1",
    number: "1",
    address: "Flandernstraße 101",
    description: "Mobilität und Technik, Informatik und Informationstechnik, International Centre and Graduate School, Soziale Arbeit, Bildung und Pflege, Hörsäle, Seminarräume, Besprechungsräume, IZ-Bibliothek, IZ-Rechenzentrum, Studierenden Infocenter, Aula, Sportstätten, AStA",
  },
  {
    id: "2",
    number: "2",
    address: "Flandernstraße 103",
    description: "Wirtschaft und Technik, Soziale Arbeit, Bildung und Pflege, Hörsäle, Seminarräume, Seminar für Ausbildung und Fortbildung der Lehrkräfte Esslingen (Gymnasium)",
  },
  {
    id: "3",
    number: "3",
    address: "Flandernstraße 107",
    description: "Studierendenwerk Stuttgart, Hochschuldienstleister, Amt für Ausbildungsförderung, Mensa, Soziale Arbeit, Bildung und Pflege, Hörsäle, Seminarräume",
  },
];

const buildingsGoeppingen: BuildingDetail[] = [
  {
    id: "1",
    number: "1",
    address: "Robert-Bosch-Straße 1",
    description: "Mobilität und Technik, Maschinen und Systeme, IAF, Aula, Mensa, Seminarräume",
  },
  {
    id: "2",
    number: "2",
    address: "Robert-Bosch-Straße 4",
    description: "Mobilität und Technik, Wirtschaft und Technik, Referat Prototypenbau u. Fertigung, Abteilung Finanzen und Controlling, Seminarräume",
  },
  {
    id: "3",
    number: "3",
    address: "Robert-Bosch-Straße 3",
    description: "Allgemeiner Studierendenausschuss (AStA), Café Campus, E.Stall",
  },
  {
    id: "4",
    number: "4",
    address: "Robert-Bosch-Straße 2",
    description: "Mobilität und Technik, Wirtschaft und Technik, Fakultätssekretariate/Dekanate, Abt. Studierendenservice und Studiengangmanagement, IZ-Rechenzentrum, IZ-Bibliothek",
  },
  {
    id: "5",
    number: "5",
    address: "Heinrich-Landerer-Straße 53",
    description: "Wirtschaft und Technik, Seminarräume, INEM",
  },
];

export function BuildingDetailSelection({ locationId, onSelectBuilding, onBack, onLogoClick, onLogout }: BuildingDetailSelectionProps) {
  // Select buildings based on location
  const selectedBuildings = 
    locationId === "1" ? buildings : 
    locationId === "2" ? buildingsFlandernstrasse : 
    locationId === "3" ? buildingsGoeppingen : 
    [];

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
          <div className="text-2xl md:text-5xl lg:text-7xl tracking-tight">Gebäudeauswahl</div>
          <button
            onClick={onBack}
            className="px-3 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-2xl lg:text-3xl border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all self-start"
          >
            ZURÜCK
          </button>
        </div>
        <div className="text-lg md:text-3xl lg:text-4xl text-white/60">
          Wählen Sie ein Gebäude aus
        </div>
      </div>

      {/* Building Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {selectedBuildings.map((building) => (
          <button
            key={building.id}
            onClick={() => onSelectBuilding(building.id)}
            className="border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all text-left p-6 md:p-8 lg:p-10 flex flex-col justify-between"
          >
            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <div className="text-2xl md:text-3xl lg:text-5xl tracking-tight">
                {building.number}
              </div>
              <div className="text-2xl md:text-3xl lg:text-5xl tracking-tight">
                {building.address}
              </div>
              <div className="text-base md:text-xl lg:text-2xl text-white/60 leading-relaxed">
                {building.description}
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