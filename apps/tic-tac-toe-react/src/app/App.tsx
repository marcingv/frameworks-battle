import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import { useState } from 'react';
import Log from './components/Log/Log';
import GameOver from './components/GameOver/GameOver';
import {
  deriveActivePlayer,
  GameBoardGrid,
  GameTurn,
  getWinner,
  INITIAL_PLAYERS,
  initializeNewBoard,
  PlayerSymbol,
} from '@gv-frameworks-battle/tic-tac-toe-domain';
import { createRoot } from 'react-dom/client';
import { AppContainer } from './AppContainer';
import logo from '../../public/game-logo.png';

export function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const gameBoard: GameBoardGrid = initializeNewBoard(gameTurns);
  const activePlayer: PlayerSymbol = deriveActivePlayer(gameTurns);
  const winner: PlayerSymbol | undefined = getWinner(gameBoard);
  const isDraw: boolean = gameTurns.length === 9 && !winner;

  function handleRematch(): void {
    setGameTurns([]);
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
    <AppContainer>
      <header>
        <img src={logo} alt="Hand-drawn tic tac toe board" />
        <h1>React Tic-Tac-Toe</h1>
      </header>

      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={players[PlayerSymbol.X]}
              symbol={PlayerSymbol.X}
              isActive={activePlayer === PlayerSymbol.X}
              onNameChanged={(name) =>
                handlePlayerChanged(PlayerSymbol.X, name)
              }
            />

            <Player
              name={players[PlayerSymbol.O]}
              symbol={PlayerSymbol.O}
              isActive={activePlayer === PlayerSymbol.O}
              onNameChanged={(name) =>
                handlePlayerChanged(PlayerSymbol.O, name)
              }
            />
          </ol>

          {(winner || isDraw) && (
            <GameOver
              winner={winner ? players[winner] : undefined}
              onRematch={handleRematch}
            ></GameOver>
          )}

          <GameBoard
            gameBoard={gameBoard}
            onSelectSquare={handleSelectSquare}
          />
        </div>

        <Log gameTurns={gameTurns} />
      </main>
    </AppContainer>
  );
}

class TicTacToeReactAppElement extends HTMLElement {
  public connectedCallback(): void {
    console.warn('TicTacToeReactAppElement is connected: boostrap.tsx');

    // ReactDOM.render(<App />, this);
    const root = createRoot(this);
    root.render(<App />);
  }

  public disconnectedCallback(): void {
    console.warn('TicTacToeReactAppElement is disconnected: boostrap.tsx');
  }
}

customElements.define(
  'tic-tac-toe-react-app-element',
  TicTacToeReactAppElement
);

export default App;
