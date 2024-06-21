import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import {
  deriveActivePlayer,
  GameBoardGrid,
  GameTurn,
  getWinner,
  INITIAL_PLAYERS,
  initializeNewBoard,
  Players,
  PlayerSymbol
} from "@gv-tic-tac-toe/domain";
import { PlayerComponent } from "./player/player.component";
import { NgClass } from "@angular/common";
import { GameBoardComponent } from "./game-board/game-board.component";
import { LogComponent } from "./log/log.component";
import { GameOverComponent } from "./game-over/game-over.component";

@Component({
  standalone: true,
  imports: [
    PlayerComponent,
    NgClass,
    GameBoardComponent,
    LogComponent,
    GameOverComponent
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
  protected winner: Signal<PlayerSymbol | undefined> = computed(() => getWinner(this.gameBoard()));
  protected winnerName: Signal<string | undefined> = computed(() => {
    const symbol = this.winner();
    if (!symbol) {
      return undefined;
    }

    return this.players()[symbol];
  });
  protected isDraw: Signal<boolean> = computed(() => this.gameTurns().length === 9 && !this.winner());

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

  protected startNewGame(): void {
    this.gameTurns.set([]);
  }
}
