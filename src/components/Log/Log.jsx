export default function Log({gameTurns = []}) {
  return (<ol id="log">
    {gameTurns.map((oneTurn) => {
      return <li key={oneTurn.square.row + '-' + oneTurn.square.col}>
        {oneTurn.player} selected {oneTurn.square.row}, {oneTurn.square.col}
      </li>
    })}
  </ol>);
}
