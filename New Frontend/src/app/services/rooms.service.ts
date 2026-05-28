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
<<<<<<< HEAD
  resourceUId: number;
=======
  resourceUid: number;
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
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
<<<<<<< HEAD
    return this.http.get<Appointment[]>(`${this.base}/he/co/co-tm-core/course/api/appointments`);
=======
    return this.http.get<Appointment[]>(`${this.base}/he/co/co-tm-core/course/api/appointments`, { withCredentials: true });
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
  }
}
