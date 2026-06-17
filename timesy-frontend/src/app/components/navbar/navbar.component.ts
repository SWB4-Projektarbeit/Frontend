import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() zoomLevel = 100;
  @Input() zoomMin = 70;
  @Input() zoomMax = 150;

  @Output() zoomOutRequested = new EventEmitter<void>();
  @Output() zoomInRequested = new EventEmitter<void>();

  constructor(
    public i18n: I18nService,
    public theme: ThemeService,
    private auth: AuthService,
  ) {}

  logout() {
    this.auth.logout();
  }
}
