export default function GameBoard({gameBoard = [], onSelectSquare}) {
  function handleSelectSquare(rowIdx, colIdx) {
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
      {
        gameBoard.map((row, rowIndex) => {
          return <li key={rowIndex}>
            <ol>{
              row.map((playerSymbol, colIndex) => {
                return <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)} disabled={!!playerSymbol}>
                    {playerSymbol}
                  </button>
                </li>
              })
            }</ol>
          </li>
        })
      }
    </ol>
  );
}
