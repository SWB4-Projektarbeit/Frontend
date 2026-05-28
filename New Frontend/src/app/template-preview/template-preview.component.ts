import { Component } from '@angular/core';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  template: `
    <div class="template-preview">
      <h2>Vorschau (Placeholder)</h2>
      <p>Die Vorlage wird hier angezeigt.</p>
      <button onclick="history.back()">Zurück</button>
    </div>
  `,
  styles: [`
    .template-preview {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class TemplatePreviewComponent {}
