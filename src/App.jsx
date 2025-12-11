import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from 'react-confetti'

//Forgot to add message to the commit

export default function App() {
  const [dice, setDice] = useState(() => generateRandomNumber());
  const gameWon = dice.every(value => value.isHeld && value.value);
  const buttonRef = useRef(null)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  },[gameWon])

  function generateRandomNumber() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    (!gameWon ? setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    ): setDice(generateRandomNumber()));
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
      id={dieObj.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
