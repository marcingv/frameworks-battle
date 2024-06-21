import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { INITIAL_PLAYERS, Players, PlayerSymbol } from "@gv-tic-tac-toe/domain";
import { PlayerComponent } from "./player/player.component";
import { NgClass } from "@angular/common";

@Component({
  standalone: true,
  imports: [
    PlayerComponent,
    NgClass
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly PlayerSymbol = PlayerSymbol;

  protected players: WritableSignal<Players> = signal(INITIAL_PLAYERS);

  protected onPlayerNameChanged(symbol: PlayerSymbol, newName: string): void {
    this.players.update((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    })
  }
}
