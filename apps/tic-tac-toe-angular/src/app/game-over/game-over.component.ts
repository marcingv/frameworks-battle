import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent {
  public winner: InputSignal<string | undefined> = input.required<string | undefined>();

  public onRematch: OutputEmitterRef<void> = output<void>();
}
