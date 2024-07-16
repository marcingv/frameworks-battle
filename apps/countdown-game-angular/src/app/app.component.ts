import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { TimerChallengeComponent } from './timer-challenge/timer-challenge.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerComponent, TimerChallengeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
