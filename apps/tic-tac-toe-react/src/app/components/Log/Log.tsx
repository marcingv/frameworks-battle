import { GameTurn } from '@gv-frameworks-battle/tic-tac-toe-domain';

export default function Log({ gameTurns = [] }: { gameTurns: GameTurn[] }) {
  return (
    <ol id="log">
      {gameTurns.map((oneTurn) => {
        return (
          <li key={oneTurn.square.row + '-' + oneTurn.square.col}>
            {oneTurn.player} selected {oneTurn.square.row}, {oneTurn.square.col}
          </li>
        );
      })}
    </ol>
  );
}
