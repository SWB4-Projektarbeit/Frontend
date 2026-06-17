import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { FlatRoom } from '../../models/room.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

type TemplateOption = {
  number: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-template-selection',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './template-selection.component.html',
  styleUrl: './template-selection.component.css',
})
export class TemplateSelectionComponent implements OnInit {
  roomUid = signal<number | null>(null);
  room = signal<FlatRoom | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  zoomLevel = signal(100);
  readonly zoomStep = 10;
  readonly zoomMin = 70;
  readonly zoomMax = 150;

  readonly templateOptions: TemplateOption[] = [
    { number: '1', title: 'Standard', description: 'Klassische Ansicht mit Uhrzeit und Status' },
    { number: '2', title: 'Kompakt', description: 'Minimale Darstellung für kleine Displays' },
    { number: '3', title: 'Detailliert', description: 'Erweiterte Informationen und Tagesübersicht' },
    { number: '4', title: 'Modern', description: 'Zeitgemäßes Design mit großen Elementen' },
  ];

  currentDisplay = computed(() => {
    const selectedRoom = this.room();
    if (!selectedRoom) {
      return null;
    }

    return {
      title: 'Aktuelle Anzeige',
      roomName: selectedRoom.name,
      building: selectedRoom.building,
      floor: selectedRoom.floor,
      template: selectedRoom.templateName,
    };
  });

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const rawRoomUid = this.route.snapshot.paramMap.get('roomUid');
    const roomUid = rawRoomUid ? Number(rawRoomUid) : NaN;

    if (Number.isNaN(roomUid)) {
      this.router.navigate(['/rooms']);
      return;
    }

    this.roomUid.set(roomUid);

    this.roomService.getFlatRooms().subscribe({
      next: (rooms) => {
        const selectedRoom = rooms.find(room => room.uid === roomUid) ?? null;
        if (!selectedRoom) {
          this.router.navigate(['/rooms']);
          return;
        }

        this.room.set(selectedRoom);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Raumdaten konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }

  zoomIn() {
    if (this.zoomLevel() < this.zoomMax) {
      this.zoomLevel.update(z => z + this.zoomStep);
    }
  }

  zoomOut() {
    if (this.zoomLevel() > this.zoomMin) {
      this.zoomLevel.update(z => z - this.zoomStep);
    }
  }

  goBack() {
    this.router.navigate(['/rooms']);
  }
}
