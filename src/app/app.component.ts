import { Component, inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private settings = inject(SettingsService);

  // state
  modelsInSelection$ = this.settings.modelsInSelection$;
  selectedModel$ = this.settings.selectedModel$;

  // action
  selectModel$ = this.settings.selectModel$;

  updateSelection(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.selectModel$.next(select.value);
  }
}
