import { ChangeEvent, useState } from "react";
import { PlayerSymbol } from "@gv-frameworks-battle/domain";

export default function Player({ name, symbol, isActive, onNameChanged }: {
  name: string,
  symbol: PlayerSymbol,
  isActive: boolean,
  onNameChanged: (name: string) => void
}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  let buttonLabel = 'Edit';
  if (isEditing) {
    buttonLabel = 'Save';
  }

  function handleBtnClick() {
    setIsEditing((prevState) => !prevState);

    if (onNameChanged) {
      onNameChanged(playerName);
    }
  }

  function handlePlayerNameChange(event: ChangeEvent<HTMLInputElement>): void {
    const newName = event.target.value;

    setPlayerName(newName);
  }

  return (
          <li className={ isActive ? 'active' : undefined }>
            <span className="player">
              { isEditing ?
                      <input type="text" required value={ playerName } onChange={ (e) => handlePlayerNameChange(e) }/> :
                      <span className="player-name">{ playerName }</span> }
              <span className="player-symbol">{ symbol }</span>
            </span>
            <button onClick={ handleBtnClick }>{ buttonLabel }</button>
          </li>
  );
}
