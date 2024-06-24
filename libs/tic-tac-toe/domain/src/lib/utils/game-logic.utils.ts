import { GameBoardGrid, GameTurn, PlayerSymbol } from '../types';
import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from '../data';

export function initializeNewBoard(gameTurns: GameTurn[]): GameBoardGrid {
  const board = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  gameTurns.forEach((oneTurn) => {
    board[oneTurn.square.row][oneTurn.square.col] = oneTurn.player;
  });

  return board;
}

export function deriveActivePlayer(gameTurns: GameTurn[]): PlayerSymbol {
  if (!gameTurns || !gameTurns.length || gameTurns[0].player === PlayerSymbol.O) {
    return PlayerSymbol.X;
  }

  return PlayerSymbol.O;
}

export function getWinner(gameBoard: GameBoardGrid): PlayerSymbol | undefined {
  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  return winner;
}
