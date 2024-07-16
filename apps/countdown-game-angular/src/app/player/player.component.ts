import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  protected playerName?: string;
}
