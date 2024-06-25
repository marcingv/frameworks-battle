import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalcFormComponent } from './calc-form/calc-form.component';
import { ResultsTableComponent } from './results-table/results-table.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, CalcFormComponent, ResultsTableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
