import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardGrid } from '@gv-frameworks-battle/tic-tac-toe-domain';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
  public gameBoard: InputSignal<GameBoardGrid> = input.required<GameBoardGrid>();

  public squareSelected = output<{ rowIndex: number; colIndex: number }>();

  public handleSelectSquare(rowIndex: number, colIndex: number): void {
    if (this.gameBoard()[rowIndex][colIndex]) {
      // This cell is already marked by user
      return;
    }

    this.squareSelected.emit({
      rowIndex: rowIndex,
      colIndex: colIndex,
    });
  }
}
