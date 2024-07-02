import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AuthInputsComponent } from './auth-inputs/auth-inputs.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, AuthInputsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
