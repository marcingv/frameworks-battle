import { GameBoardGrid, PlayerSymbol } from '@gv-frameworks-battle/tic-tac-toe-domain';

export default function GameBoard({
  gameBoard = [],
  onSelectSquare,
}: {
  gameBoard: GameBoardGrid;
  onSelectSquare: (row: number, col: number) => void;
}) {
  function handleSelectSquare(rowIdx: number, colIdx: number) {
    if (gameBoard[rowIdx][colIdx]) {
      // This cell is already marked by user
      return;
    }

    if (onSelectSquare) {
      onSelectSquare(rowIdx, colIdx);
    }
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row: Array<PlayerSymbol | null>, rowIndex: number) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol: PlayerSymbol | null, colIndex: number) => {
                return (
                  <li key={colIndex}>
                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)} disabled={!!playerSymbol}>
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
