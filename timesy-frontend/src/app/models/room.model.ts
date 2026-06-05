export interface StatusEntry {
  status: 'CONFIRMED' | 'RESCHEDULED' | 'CANCELLED';
  successor: ScheduleEntry | null;
}

export interface ScheduleEntry {
  name: string;
  startTime: string;
  endTime: string;
  status: StatusEntry;
}

export interface Room {
  roomUid: number;
  roomName: string;
  templateUid: string;
  templateName: string;
  schedule: ScheduleEntry[];
  floor: string;
  requiredPermissions: string[];
}

export interface Building {
  buildingName: string;
  rooms: Room[];
}

export interface FlatRoom {
  uid: number;
  name: string;
  building: string;
  floor: string;
  schedule: ScheduleEntry[];
}
