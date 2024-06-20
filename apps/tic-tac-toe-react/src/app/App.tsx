import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver/GameOver";
import { PlayerSymbol } from "@gv-tic-tac-toe/domain";

export function App() {
  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const INITIAL_PLAYERS: Record<PlayerSymbol, string> = { X: 'Player 1', O: 'Player 2' };

  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = initializeNewBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = getWinner(gameBoard);
  const isDraw = gameTurns.length === 9 && !winner;


  function getWinner(gameBoard) {
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

  function initializeNewBoard(gameTurns) {
    const board = [...INITIAL_GAME_BOARD.map((row) => [...row])];
    gameTurns.forEach((oneTurn) => {
      board[oneTurn.square.row][oneTurn.square.col] = oneTurn.player;
    });

    return board;
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function deriveActivePlayer(gameTurns): PlayerSymbol {
    if (!gameTurns || !gameTurns.length || gameTurns[0].player === PlayerSymbol.O) {
      return PlayerSymbol.X;
    }

    return PlayerSymbol.O;
  }

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevState) => {
      const activePlayer = deriveActivePlayer(prevState);

      return [
        { player: activePlayer, square: { row: rowIdx, col: colIdx } },
        ...prevState,
      ];
    });
  }

  function handlePlayerChanged(symbol, name) {
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
                              winner={ players[winner] }
                              onRematch={ handleRematch }></GameOver>
              }

              <GameBoard gameBoard={ gameBoard } onSelectSquare={ handleSelectSquare }/>
            </div>

            <Log gameTurns={ gameTurns }/>
          </main>
  );
}

export default App
