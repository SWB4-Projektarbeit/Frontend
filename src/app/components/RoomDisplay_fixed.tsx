import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface Meeting {
  id: string;
  title: string;
  titleEn: string;
  courseCode: string;
  start: string;
  end: string;
  organizer: string;
  date: string; // Format: YYYY-MM-DD
  movedFrom?: string; // Original room number if moved TO this room
  movedTo?: string; // New room number if moved FROM this room
  cancelled?: boolean; // Event is cancelled
}

interface RoomDisplayProps {
  roomId: string;
  templateId: string;
  onBack: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const roomNames: Record<string, string> = {
  "1": "Konferenzraum 1",
  "2": "Konferenzraum 2",
  "3": "Besprechungsraum A",
  "4": "Besprechungsraum B",
  "5": "Boardroom",
  "6": "Think Tank",
  "7": "Innovation Lab",
};

const roomNamesEn: Record<string, string> = {
  "1": "Conference Room 1",
  "2": "Conference Room 2",
  "3": "Meeting Room A",
  "4": "Meeting Room B",
  "5": "Boardroom",
  "6": "Think Tank",
  "7": "Innovation Lab",
};

const roomNumbers: Record<string, string> = {
  "1": "Raum 3.201",
  "2": "Raum 3.202",
  "3": "Raum 2.105",
  "4": "Raum 2.106",
  "5": "Raum 4.301",
  "6": "Raum 1.103",
  "7": "Raum 5.401",
};

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

// Helper to get tomorrow's date in YYYY-MM-DD format
const getTomorrowString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
};

// Mock Meetings Data - defined outside component to prevent re-creation
const getMockMeetings = (): Meeting[] => {
  const todayString = getTodayString();
  const tomorrowString = getTomorrowString();
  
  return [
    // Today's meetings
    {
      id: "1",
      title: "Grundlagen der Informatik",
      titleEn: "Foundations of Informatics",
      courseCode: "INF101",
      start: "08:00",
      end: "09:30",
      organizer: "Prof. Dr. Anna Schmidt",
      date: todayString,
    },
    {
      id: "2",
      title: "Mathematik I",
      titleEn: "Mathematics I",
      courseCode: "MATH101",
      start: "10:00",
      end: "11:30",
      organizer: "Prof. Dr. Michael Weber",
      date: todayString,
      movedTo: "Raum 4.301", // Verschoben nach Raum 4.301
    },
    {
      id: "2b",
      title: "Mathematik I",
      titleEn: "Mathematics I",
      courseCode: "MATH101",
      start: "10:00",
      end: "11:30",
      organizer: "Prof. Dr. Michael Weber",
      date: todayString,
      movedFrom: "Raum 3.201", // Verschoben von Raum 3.201
    },
    {
      id: "3",
      title: "Physik für Ingenieure",
      titleEn: "Physics for Engineers",
      courseCode: "PHYS201",
      start: "12:00",
      end: "13:30",
      organizer: "Dr. Sarah Müller",
      date: todayString,
      cancelled: true, // Ausgefallen
    },
    {
      id: "4",
      title: "Softwareentwicklung",
      titleEn: "Software Development",
      courseCode: "SE301",
      start: "14:00",
      end: "15:30",
      organizer: "Prof. Dr. Thomas Koch",
      date: todayString,
      movedTo: "Raum 2.105", // Verschoben nach Raum 2.105
    },
    {
      id: "4b",
      title: "Softwareentwicklung",
      titleEn: "Software Development",
      courseCode: "SE301",
      start: "14:00",
      end: "15:30",
      organizer: "Prof. Dr. Thomas Koch",
      date: todayString,
      movedFrom: "Raum 3.201", // Verschoben von Raum 3.201
    },
    {
      id: "5",
      title: "Datenbanken",
      titleEn: "Databases",
      courseCode: "DB401",
      start: "16:00",
      end: "17:30",
      organizer: "Dr. Lisa Bauer",
      date: todayString,
    },
    {
      id: "6",
      title: "Projektarbeit",
      titleEn: "Project Work",
      courseCode: "PROJ501",
      start: "18:00",
      end: "19:30",
      organizer: "Prof. Dr. Martin Fischer",
      date: todayString,
      cancelled: true, // Ausgefallen
    },
    // Tomorrow's meetings
    {
      id: "7",
      title: "Algorithmen und Datenstrukturen",
      titleEn: "Algorithms and Data Structures",
      courseCode: "INF201",
      start: "08:00",
      end: "09:30",
      organizer: "Prof. Dr. Klaus Meier",
      date: tomorrowString,
      movedTo: "Raum 1.103", // Verschoben nach Raum 1.103
    },
    {
      id: "7b",
      title: "Algorithmen und Datenstrukturen",
      titleEn: "Algorithms and Data Structures",
      courseCode: "INF201",
      start: "08:00",
      end: "09:30",
      organizer: "Prof. Dr. Klaus Meier",
      date: tomorrowString,
      movedFrom: "Raum 3.201", // Verschoben von Raum 3.201
    },
    {
      id: "8",
      title: "Lineare Algebra",
      titleEn: "Linear Algebra",
      courseCode: "MATH201",
      start: "10:00",
      end: "11:30",
      organizer: "Dr. Julia Wagner",
      date: tomorrowString,
      cancelled: true, // Ausgefallen
    },
    {
      id: "9",
      title: "Elektrotechnik Grundlagen",
      titleEn: "Basics of Electrical Engineering",
      courseCode: "ET101",
      start: "12:00",
      end: "13:30",
      organizer: "Prof. Dr. Stefan Becker",
      date: tomorrowString,
    },
    {
      id: "10",
      title: "Web-Entwicklung",
      titleEn: "Web Development",
      courseCode: "WEB301",
      start: "14:00",
      end: "15:30",
      organizer: "Dr. Nina Hoffmann",
      date: tomorrowString,
    },
    {
      id: "11",
      title: "Netzwerktechnik",
      titleEn: "Network Technology",
      courseCode: "NET301",
      start: "16:00",
      end: "17:30",
      organizer: "Prof. Dr. Robert Lang",
      date: tomorrowString,
      cancelled: true, // Ausgefallen
    },
  ];
};

export function RoomDisplay({ roomId, templateId, onBack, onLogoClick, onLogout, isDarkMode, zoomLevel, onZoomIn, onZoomOut, onResetZoom }: RoomDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null);

  const allMeetings = getMockMeetings();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  // Calculate current meeting based on time and date
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeValue = currentHour * 60 + currentMinute;
    const currentDateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    let current: Meeting | null = null;

    for (const meeting of allMeetings) {
      if (meeting.date !== currentDateString) continue;
      
      const [startHour, startMinute] = meeting.start.split(":").map(Number);
      const [endHour, endMinute] = meeting.end.split(":").map(Number);
      const startTimeValue = startHour * 60 + startMinute;
      const endTimeValue = endHour * 60 + endMinute;

      if (currentTimeValue >= startTimeValue && currentTimeValue < endTimeValue) {
        current = meeting;
        break;
      }
    }

    setCurrentMeeting(current);
  }, [currentTime]);

  // Filter and create combined schedule with meetings and breaks - showing only relevant events
  const getScheduleItems = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeValue = currentHour * 60 + currentMinute;
    const currentDateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Find current meeting index
    let currentMeetingIndex = -1;
    for (let i = 0; i < allMeetings.length; i++) {
      const meeting = allMeetings[i];
      if (meeting.date !== currentDateString) continue;
      
      const [startHour, startMinute] = meeting.start.split(":").map(Number);
      const [endHour, endMinute] = meeting.end.split(":").map(Number);
      const startTimeValue = startHour * 60 + startMinute;
      const endTimeValue = endHour * 60 + endMinute;

      if (currentTimeValue >= startTimeValue && currentTimeValue < endTimeValue) {
        currentMeetingIndex = i;
        break;
      }
    }

    // Find last past meeting from today
    let lastPastMeetingIndex = -1;
    for (let i = 0; i < allMeetings.length; i++) {
      const meeting = allMeetings[i];
      if (meeting.date !== currentDateString) continue;
      
      const [endHour, endMinute] = meeting.end.split(":").map(Number);
      const endTimeValue = endHour * 60 + endMinute;

      if (currentTimeValue >= endTimeValue) {
        lastPastMeetingIndex = i;
      } else {
        break;
      }
    }

    // Determine which meetings to show
    let filteredMeetings: Meeting[] = [];
    let startFromIndex = 0;

    if (currentMeetingIndex >= 0) {
      // There's a current meeting - show from last past meeting (if any) to end
      startFromIndex = lastPastMeetingIndex >= 0 ? lastPastMeetingIndex : currentMeetingIndex;
    } else if (lastPastMeetingIndex >= 0) {
      // No current meeting but there are past meetings - show from last past meeting
      startFromIndex = lastPastMeetingIndex;
    }

    // Get all meetings from start index onwards (including tomorrow's meetings)
    filteredMeetings = allMeetings.slice(startFromIndex);

    // Create schedule items with breaks
    const items: Array<{
      type: 'meeting' | 'break' | 'date-separator';
      start: string;
      end: string;
      meeting?: Meeting;
      date?: string;
    }> = [];

    let lastEnd = 0;
    let lastDate = '';

    for (const meeting of filteredMeetings) {
      const [startHour, startMinute] = meeting.start.split(":").map(Number);
      const [endHour, endMinute] = meeting.end.split(":").map(Number);
      const startTimeValue = startHour * 60 + startMinute;
      const endTimeValue = endHour * 60 + endMinute;

      // Add date separator if date changes
      if (lastDate && meeting.date !== lastDate) {
        const meetingDate = new Date(meeting.date);
        const weekday = meetingDate.toLocaleDateString("de-DE", { weekday: "long" });
        const day = meetingDate.getDate().toString().padStart(2, '0');
        const month = (meetingDate.getMonth() + 1).toString().padStart(2, '0');
        const year = meetingDate.getFullYear();
        
        items.push({
          type: 'date-separator',
          start: '',
          end: '',
          date: `${weekday}, ${day}.${month}.${year}`,
        });
        
        lastEnd = 0; // Reset for new day
      }

      // Add break if there's a gap (and not the first item of the day or after date change)
      if (lastEnd > 0 && startTimeValue > lastEnd && meeting.date === lastDate) {
        const breakStart = `${String(Math.floor(lastEnd / 60)).padStart(2, '0')}:${String(lastEnd % 60).padStart(2, '0')}`;
        const breakEnd = `${String(Math.floor(startTimeValue / 60)).padStart(2, '0')}:${String(startTimeValue % 60).padStart(2, '0')}`;
        items.push({
          type: 'break',
          start: breakStart,
          end: breakEnd,
        });
      }

      // Add meeting
      items.push({
        type: 'meeting',
        start: meeting.start,
        end: meeting.end,
        meeting: meeting,
      });

      lastEnd = endTimeValue;
      lastDate = meeting.date;
    }

    return items;
  };

  const scheduleItems = getScheduleItems();
  const roomName = roomNames[roomId] || "Konferenzraum 1";
  const roomNameEn = roomNamesEn[roomId] || "Conference Room 1";
  const roomNumber = roomNumbers[roomId] || "Raum 3.201";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const weekday = date.toLocaleDateString("de-DE", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${weekday}, ${day}.${month}.${year}`;
  };

  const formatDateEn = (date: Date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${weekday}, ${day}.${month}.${year}`;
  };

  return (
    <div className={`flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-3 md:p-5 lg:p-10 min-h-screen w-full`}>
      {/* Top Header */}
      <div className="mb-4 md:mb-6 lg:mb-10 flex flex-col sm:flex-row items-start justify-between gap-3">
        <Logo onClick={onLogoClick} isDarkMode={isDarkMode} />
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div>
            <div className={`text-sm md:text-lg lg:text-xl ${isDarkMode ? "text-white/80" : "text-black/80"}`}>
              {formatDate(currentTime)}
            </div>
            <div className={`text-xs md:text-sm lg:text-base ${isDarkMode ? "text-white/50" : "text-black/50"} mt-0.5`}>
              {formatDateEn(currentTime)}
            </div>
          </div>
          <div className="text-lg md:text-2xl lg:text-3xl font-light">{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Room Name and Number */}
      <div className="mb-4 md:mb-5 lg:mb-7 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl tracking-tight">{roomName}</h1>
            <h2 className={`text-base sm:text-xl md:text-2xl lg:text-3xl tracking-tight ${isDarkMode ? "text-white/40" : "text-black/40"} mt-1`}>
              {roomNameEn}
            </h2>
          </div>
          <div className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl ${isDarkMode ? "text-white/60" : "text-black/60"} mt-2 md:mt-3`}>
            {roomNumber}
          </div>
        </div>
        
        {/* QR Code Placeholder */}
        <div className="shrink-0">
          <div className={`w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 border-2 md:border-3 lg:border-4 ${isDarkMode ? "border-white bg-white" : "border-black bg-black"} p-1.5 md:p-2`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* QR Code Pattern Placeholder */}
              <rect x="0" y="0" width="30" height="30" fill={isDarkMode ? "black" : "white"}/>
              <rect x="10" y="10" width="10" height="10" fill={isDarkMode ? "white" : "black"}/>
              <rect x="70" y="0" width="30" height="30" fill={isDarkMode ? "black" : "white"}/>
              <rect x="80" y="10" width="10" height="10" fill={isDarkMode ? "white" : "black"}/>
              <rect x="0" y="70" width="30" height="30" fill={isDarkMode ? "black" : "white"}/>
              <rect x="10" y="80" width="10" height="10" fill={isDarkMode ? "white" : "black"}/>
              
              <rect x="40" y="5" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="50" y="5" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="40" y="15" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="55" y="15" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              
              <rect x="40" y="40" width="20" height="20" fill={isDarkMode ? "black" : "white"}/>
              <rect x="45" y="45" width="10" height="10" fill={isDarkMode ? "white" : "black"}/>
              
              <rect x="5" y="40" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="15" y="40" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="5" y="50" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="20" y="50" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              
              <rect x="70" y="40" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="80" y="40" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="75" y="50" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="90" y="50" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              
              <rect x="40" y="70" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="50" y="70" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="60" y="70" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="45" y="80" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="55" y="80" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="70" y="80" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="80" y="80" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
              <rect x="90" y="90" width="5" height="5" fill={isDarkMode ? "black" : "white"}/>
            </svg>
          </div>
        </div>
      </div>

      {/* Schedule Heading */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className={`text-lg md:text-2xl lg:text-3xl ${isDarkMode ? "text-white/60" : "text-black/60"} tracking-wider`}>
          STUNDENPLAN HEUTE
        </h2>
        <h3 className={`text-sm md:text-lg lg:text-xl ${isDarkMode ? "text-white/40" : "text-black/40"} tracking-wider mt-1`}>
          SCHEDULE TODAY
        </h3>
      </div>

      {/* Schedule List */}
      <div className="flex-1 space-y-0 mb-6 md:mb-8">
        {scheduleItems.map((item, index) => {
          const isCurrent = currentMeeting?.id === item.meeting?.id;
          
          // Date separator
          if (item.type === 'date-separator') {
            return (
              <div
                key={`date-${index}`}
                className={`border-2 ${isDarkMode ? "border-white/40 bg-white/10" : "border-black/40 bg-black/10"} p-3 md:p-4 lg:p-5`}
              >
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center tracking-wider">
                  {item.date}
                </h2>
              </div>
            );
          }
          
          return (
            <div
              key={item.type === 'meeting' ? item.meeting?.id : `break-${index}`}
              className={`border-2 ${isDarkMode ? "border-white/20" : "border-black/20"} p-4 md:p-5 lg:p-6 relative ${
                item.type === 'break' 
                  ? isDarkMode ? "bg-white/5" : "bg-black/5"
                  : isCurrent 
                    ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                    : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Time */}
                <div className={`text-base md:text-xl lg:text-2xl whitespace-nowrap ${
                  isCurrent 
                    ? isDarkMode ? "text-black" : "text-white"
                    : item.type === 'break' 
                      ? isDarkMode ? "text-white/60" : "text-black/60"
                      : ""
                }`}>
                  {item.start} - {item.end}
                </div>

                {/* Title and Details */}
                {item.type === 'meeting' ? (
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className={`text-lg md:text-2xl lg:text-3xl font-medium ${
                          isCurrent ? (isDarkMode ? "text-black" : "text-white") : ""
                        }`}>
                          {item.meeting?.title}
                        </h3>
                        <p className={`text-sm md:text-base lg:text-lg ${
                          isCurrent 
                            ? isDarkMode ? "text-black/50" : "text-white/50"
                            : isDarkMode ? "text-white/50" : "text-black/50"
                        } mt-0.5`}>
                          {item.meeting?.titleEn}
                        </p>
                      </div>
                      <span className={`text-sm md:text-lg lg:text-xl shrink-0 ${
                        isCurrent 
                          ? isDarkMode ? "text-black/60" : "text-white/60"
                          : isDarkMode ? "text-white/60" : "text-black/60"
                      }`}>
                        {item.meeting?.courseCode}
                      </span>
                    </div>
                    
                    {/* Room change indicators */}
                    {item.meeting?.movedTo && (
                      <div className={`mt-2 md:mt-3 px-3 md:px-4 py-1.5 md:py-2 border-2 inline-block ${
                        isCurrent
                          ? isDarkMode 
                            ? "border-black/40 bg-black/10 text-black" 
                            : "border-white/40 bg-white/10 text-white"
                          : isDarkMode
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-black/60 bg-black/10 text-black"
                      }`}>
                        <div>
                          <div className="text-sm md:text-base lg:text-xl font-bold">
                            ! VERSCHOBEN NACH {item.meeting.movedTo}
                          </div>
                          <div className={`text-xs md:text-sm lg:text-base mt-0.5 ${
                            isCurrent
                              ? isDarkMode ? "text-black/60" : "text-white/60"
                              : isDarkMode ? "text-white/60" : "text-black/60"
                          }`}>
                            ! MOVED TO {item.meeting.movedTo}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {item.meeting?.movedFrom && (
                      <div className={`mt-2 md:mt-3 px-3 md:px-4 py-1.5 md:py-2 border-2 inline-block ${
                        isCurrent
                          ? isDarkMode 
                            ? "border-black/40 bg-black/10 text-black" 
                            : "border-white/40 bg-white/10 text-white"
                          : isDarkMode
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-black/60 bg-black/10 text-black"
                      }`}>
                        <div>
                          <div className="text-sm md:text-base lg:text-xl font-bold">
                            ! VERLEGT VON {item.meeting.movedFrom}
                          </div>
                          <div className={`text-xs md:text-sm lg:text-base mt-0.5 ${
                            isCurrent
                              ? isDarkMode ? "text-black/60" : "text-white/60"
                              : isDarkMode ? "text-white/60" : "text-black/60"
                          }`}>
                            ! MOVED FROM {item.meeting.movedFrom}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {item.meeting?.cancelled && (
                      <div className={`mt-2 md:mt-3 px-3 md:px-4 py-1.5 md:py-2 border-2 inline-block ${
                        isCurrent
                          ? isDarkMode 
                            ? "border-black/40 bg-black/10 text-black" 
                            : "border-white/40 bg-white/10 text-white"
                          : isDarkMode
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-black/60 bg-black/10 text-black"
                      }`}>
                        <div>
                          <div className="text-sm md:text-base lg:text-xl font-bold">
                            ! AUSGEFALLEN
                          </div>
                          <div className={`text-xs md:text-sm lg:text-base mt-0.5 ${
                            isCurrent
                              ? isDarkMode ? "text-black/60" : "text-white/60"
                              : isDarkMode ? "text-white/60" : "text-black/60"
                          }`}>
                            ! CANCELLED
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1">
                    <div>
                      <h3 className={`text-lg md:text-2xl lg:text-3xl font-medium ${
                        isDarkMode ? "text-white/40" : "text-black/40"
                      } italic`}>
                        FREI · {(() => {
                          const [startHour, startMinute] = item.start.split(":").map(Number);
                          const [endHour, endMinute] = item.end.split(":").map(Number);
                          const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                          return `${durationMinutes} Min`;
                        })()}
                      </h3>
                      <p className={`text-sm md:text-base lg:text-lg ${
                        isDarkMode ? "text-white/30" : "text-black/30"
                      } italic mt-0.5`}>
                        FREE · {(() => {
                          const [startHour, startMinute] = item.start.split(":").map(Number);
                          const [endHour, endMinute] = item.end.split(":").map(Number);
                          const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                          return `${durationMinutes} Min`;
                        })()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Current Indicator */}
                {isCurrent && (
                  <div className={`absolute top-4 md:top-5 lg:top-6 right-4 md:right-5 lg:right-6 ${
                    isDarkMode ? "bg-black text-white" : "bg-white text-black"
                  } px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 text-xs md:text-base lg:text-lg font-bold`}>
                    <div>LÄUFT</div>
                    <div className={`text-xs md:text-sm lg:text-base ${isDarkMode ? "text-white/60" : "text-black/60"}`}>RUNNING</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}