import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import {
  deriveActivePlayer,
  GameBoardGrid,
  GameTurn,
  INITIAL_PLAYERS,
  initializeNewBoard,
  Players,
  PlayerSymbol
} from "@gv-tic-tac-toe/domain";
import { PlayerComponent } from "./player/player.component";
import { NgClass } from "@angular/common";
import { GameBoardComponent } from "./game-board/game-board.component";

@Component({
  standalone: true,
  imports: [
    PlayerComponent,
    NgClass,
    GameBoardComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly PlayerSymbol = PlayerSymbol;

  protected players: WritableSignal<Players> = signal(INITIAL_PLAYERS);
  protected gameTurns: WritableSignal<GameTurn[]> = signal<GameTurn[]>([]);
  protected gameBoard: Signal<GameBoardGrid> = computed(() => initializeNewBoard(this.gameTurns()));
  protected activePlayer: Signal<PlayerSymbol> = computed(() => deriveActivePlayer(this.gameTurns()))

  protected onPlayerNameChanged(symbol: PlayerSymbol, newName: string): void {
    this.players.update((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    })
  }

  protected onSquareSelected(event: { rowIndex: number; colIndex: number }): void {
    this.gameTurns.update((prev) => {
      return [
        { player: this.activePlayer(), square: { row: event.rowIndex, col: event.colIndex } },
        ...prev,
      ];
    });
  }
}
