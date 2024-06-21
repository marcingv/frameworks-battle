import { PlayerSymbol } from "./player-symbol";

export interface GameTurn {
  player: PlayerSymbol;
  square: { row: number, col: number };
}
