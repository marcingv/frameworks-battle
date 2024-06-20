import {useState} from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIdx, colIdx) {
    setGameBoard((prevState) => {
      const updatedGameBoard = [...prevState.map((oneRow) => [...oneRow])];
      updatedGameBoard[rowIdx][colIdx] = 'X';

      return updatedGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {
        gameBoard.map((row, rowIndex) => {
          return <li key={rowIndex}>
            <ol>{
              row.map((playerSymbol, colIndex) => {
                return <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
              })
            }</ol>
          </li>
        })
      }
    </ol>
  );
}
