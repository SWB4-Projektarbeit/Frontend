import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { RoomsService, Appointment } from '../services/rooms.service';
import { KeycloakService } from '../services/keycloak.service';
=======
import { RoomsService, Appointment } from '../services/rooms.service';
import { AuthService } from '../services/auth.service';
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)

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
<<<<<<< HEAD
    private keycloak: KeycloakService,
    private router: Router
=======
    private authService: AuthService
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
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
<<<<<<< HEAD
    this.keycloak.logout();
=======
    this.authService.logout();
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
  }
}
