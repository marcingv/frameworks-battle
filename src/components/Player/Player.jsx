import {useState} from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleBtnClick() {
    setIsEditing((prevState) => !prevState);
  }

  let buttonLabel = 'Edit';
  if (isEditing) {
    buttonLabel = 'Save';
  }

  return (
    <li>
      <span className="player">
        {isEditing ? <input type="text" required value={name} /> : <span className="player-name">{name}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleBtnClick}>{buttonLabel}</button>
    </li>
  );
}
