import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building } from '../../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly backendUrl = 'http://localhost:8215'
  private readonly baseUrl = '/api-timesy';

  constructor(private http: HttpClient) {}

  getRooms(filters?: { building?: string; floor?: string; room_name?: string }): Observable<Building[]> {
    let params = new HttpParams();
    if (filters?.building) params = params.set('building', filters.building);
    if (filters?.floor) params = params.set('floor', filters.floor);
    if (filters?.room_name) params = params.set('roomName', filters.room_name);
    return this.http.get<Building[]>(`${this.backendUrl}${this.baseUrl}/rooms`, { params });
  }
}
