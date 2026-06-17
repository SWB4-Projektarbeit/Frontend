import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { I18nService } from '../../core/services/i18n.service';
import { FlatRoom } from '../../models/room.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './room-selection.component.html',
  styleUrl: './room-selection.component.css',
})
export class RoomSelectionComponent implements OnInit {
  allRooms = signal<FlatRoom[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  searchText = signal('');
  selectedBuilding = signal('');
  selectedFloor = signal('');

  buildings = signal<string[]>([]);
  floors = signal<string[]>([]);

  openFilters: Record<string, boolean> = { building: false, floor: false };

  zoomLevel = signal(100);
  readonly zoomStep = 10;
  readonly zoomMin = 70;
  readonly zoomMax = 150;

  filteredRooms = computed(() => {
    const search = this.searchText().toLowerCase();
    const building = this.selectedBuilding();
    const floor = this.selectedFloor();
    return this.allRooms().filter(room => {
      const matchesSearch = !search || room.name.toLowerCase().includes(search) || room.building.toLowerCase().includes(search);
      const matchesBuilding = !building || room.building === building;
      const matchesFloor = !floor || room.floor === floor;
      return matchesSearch && matchesBuilding && matchesFloor;
    });
  });

  constructor(
    private roomService: RoomService,
    private router: Router,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.roomService.getFlatRooms().subscribe({
      next: (flat: FlatRoom[]) => {
        this.allRooms.set(flat);
        this.buildings.set([...new Set(flat.map(r => r.building))].sort());
        this.floors.set([...new Set(flat.map(r => r.floor))].filter(Boolean).sort());
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t.error_loading);
        this.loading.set(false);
      },
    });
  }

  toggleFilter(key: string) { this.openFilters[key] = !this.openFilters[key]; }
  setBuilding(v: string) { this.selectedBuilding.set(this.selectedBuilding() === v ? '' : v); }
  setFloor(v: string) { this.selectedFloor.set(this.selectedFloor() === v ? '' : v); }
  openRoom(roomUid: number) { this.router.navigate(['/rooms', roomUid]); }

  zoomIn()  { if (this.zoomLevel() < this.zoomMax) this.zoomLevel.update(z => z + this.zoomStep); }
  zoomOut() { if (this.zoomLevel() > this.zoomMin) this.zoomLevel.update(z => z - this.zoomStep); }

  getCurrentEvent(room: FlatRoom): string | null {
    const now = new Date();
    return room.schedule.find(s => new Date(s.startTime) <= now && now <= new Date(s.endTime) && s.status.status !== 'CANCELLED')?.name ?? null;
  }

  getNextEvent(room: FlatRoom): string | null {
    const now = new Date();
    return room.schedule
      .filter(s => new Date(s.startTime) > now && s.status.status !== 'CANCELLED')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0]?.name ?? null;
  }
}
