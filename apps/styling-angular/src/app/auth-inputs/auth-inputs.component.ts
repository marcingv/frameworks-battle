import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-inputs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-inputs.component.html',
  styleUrl: './auth-inputs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthInputsComponent {}
