import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import {
  GameBoardGrid,
  GameTurn,
  INITIAL_GAME_BOARD,
  INITIAL_PLAYERS,
  PlayerSymbol,
  WINNING_COMBINATIONS
} from "@gv-tic-tac-toe/domain";


export function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const gameBoard: GameBoardGrid = initializeNewBoard(gameTurns);
  const activePlayer: PlayerSymbol = deriveActivePlayer(gameTurns);
  const winner: PlayerSymbol | undefined = getWinner(gameBoard);
  const isDraw: boolean = gameTurns.length === 9 && !winner;


  function getWinner(gameBoard: GameBoardGrid): PlayerSymbol | undefined {
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

  function initializeNewBoard(gameTurns: GameTurn[]): GameBoardGrid {
    const board = [...INITIAL_GAME_BOARD.map((row) => [...row])];
    gameTurns.forEach((oneTurn) => {
      board[oneTurn.square.row][oneTurn.square.col] = oneTurn.player;
    });

    return board;
  }

  function handleRematch(): void {
    setGameTurns([]);
  }

  function deriveActivePlayer(gameTurns: GameTurn[]): PlayerSymbol {
    if (!gameTurns || !gameTurns.length || gameTurns[0].player === PlayerSymbol.O) {
      return PlayerSymbol.X;
    }

    return PlayerSymbol.O;
  }

  function handleSelectSquare(rowIdx: number, colIdx: number): void {
    setGameTurns((prevState: GameTurn[]) => {
      const activePlayer = deriveActivePlayer(prevState);

      return [
        { player: activePlayer, square: { row: rowIdx, col: colIdx } },
        ...prevState,
      ];
    });
  }

  function handlePlayerChanged(symbol: PlayerSymbol, name: string): void {
    setPlayers((prevState) => {
      const newPlayers = { ...prevState };
      newPlayers[symbol] = name;

      return newPlayers;
    });
  }

  return (
          <main>
            <div id="game-container">
              <ol id="players" className="highlight-player">
                <Player
                        name={ players[PlayerSymbol.X] }
                        symbol={ PlayerSymbol.X }
                        isActive={ activePlayer === PlayerSymbol.X }
                        onNameChanged={ (name) => handlePlayerChanged(PlayerSymbol.X, name) }/>

                <Player
                        name={ players[PlayerSymbol.O] }
                        symbol={ PlayerSymbol.O }
                        isActive={ activePlayer === PlayerSymbol.O }
                        onNameChanged={ (name) => handlePlayerChanged(PlayerSymbol.O, name) }/>
              </ol>

              {
                      (winner || isDraw) &&
                      <GameOver
                              winner={ winner ? players[winner] : undefined }
                              onRematch={ handleRematch }></GameOver>
              }

              <GameBoard gameBoard={ gameBoard } onSelectSquare={ handleSelectSquare }/>
            </div>

            <Log gameTurns={ gameTurns }/>
          </main>
  );
}

export default App
