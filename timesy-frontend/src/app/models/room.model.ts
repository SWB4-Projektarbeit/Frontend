export interface ScheduleEntry {
  name: string;
  startTime: string;
  endTime: string;
  status: {
    status: 'CONFIRMED' | 'RESCHEDULED' | 'CANCELLED';
    successor: ScheduleEntry | null;
  };
}

export interface Room {
  room_uid: number;
  room_name: string;
  floor: string;
  template_uid: string;
  template_name: string;
  required_permissions: string[];
  schedule: ScheduleEntry[];
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
