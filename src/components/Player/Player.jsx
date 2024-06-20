import {useState} from "react";

export default function Player({name, symbol}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  let buttonLabel = 'Edit';
  if (isEditing) {
    buttonLabel = 'Save';
  }

  function handleBtnClick() {
    setIsEditing((prevState) => !prevState);
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li>
      <span className="player">
        {isEditing ? <input type="text" required value={playerName} onChange={(e) => handlePlayerNameChange(e)}/> :
          <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleBtnClick}>{buttonLabel}</button>
    </li>
  );
}
