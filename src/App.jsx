import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(generateRandomNumber());

  function generateRandomNumber() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    return setDice(generateRandomNumber());
  }

  function hold(id){
    console.log(id);
  }

  const diceElements = dice.map((dieObj) => (
    <Die 
      key={dieObj.id} 
      value={dieObj.value} 
      isHeld={dieObj.isHeld}
      hold={()=>hold(dieObj.id)}
      id={dieObj.id}
      />
  ));

  return (
    <>
      <main>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
    </>
  );
}
