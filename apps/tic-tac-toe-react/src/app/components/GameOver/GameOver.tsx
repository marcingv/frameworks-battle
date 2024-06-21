export default function GameOver({ winner, onRematch }: { winner: string | undefined, onRematch: () => void }) {
  return (
          <div id="game-over">
            <h2>Game Over!</h2>
            { winner ? <p>{ winner } won!</p> : <p>It is a draw!</p> }
            <p>
              <button onClick={ () => {
                if (onRematch) onRematch();
              } }>Rematch!
              </button>
            </p>
          </div>
  );
}
