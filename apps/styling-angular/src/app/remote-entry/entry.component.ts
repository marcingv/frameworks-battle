import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  standalone: true,
  imports: [CommonModule, AppComponent],
  selector: 'app-styling-angular-entry',
  template: `<app-root></app-root>`,
})
export class RemoteEntryComponent {}
