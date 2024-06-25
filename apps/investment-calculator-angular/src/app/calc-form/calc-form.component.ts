import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calc-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calc-form.component.html',
  styleUrl: './calc-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalcFormComponent {}
