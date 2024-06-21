import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTurn } from "@gv-tic-tac-toe/domain";

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent {
  public gameTurns: InputSignal<GameTurn[]> = input.required<GameTurn[]>();
}
