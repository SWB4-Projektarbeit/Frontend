import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  uid: number;
  applicationTypeKey: string;
  courseGroupUid: number;
  endAt: string;
  eventTypeKey: string;
  externalObjectUid: number;
  resourceUid: number;
  resourceUrl: string;
  roomUid: number;
  startAt: string;
  statusTypeKey: string;
}

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private base = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.base}/he/co/co-tm-core/course/api/appointments`, { withCredentials: true });
  }
}
