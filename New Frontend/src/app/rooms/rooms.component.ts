import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomsService, Appointment } from '../services/rooms.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  error?: string;
  selectedFloor = 'Alle Stockwerke';
  searchQuery = '';

  constructor(
    private roomsService: RoomsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.loading = true;
    this.error = undefined;
    this.roomsService.getAppointments().subscribe({
      next: (data) => { 
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => { 
        this.error = 'Failed to load rooms. Please try again.';
        this.loading = false;
        console.error('Error loading rooms:', err);
      }
    });
  }

  onFilterChange() {
    // Placeholder for future filtering logic
  }

  logout() {
    this.authService.logout();
  }
}
