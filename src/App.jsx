import { useState } from "react";
import "./App.css";

function App() {
  const diceFaces = [1, 2, 3, 4, 5, 6];
  const [dice, setDice] = useState([0, 0]);
  const [message, setMessage] = useState("🎲 Ready to Roll?");
  const [rolling, setRolling] = useState(false);
  const [win, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [draw, setDraw] = useState(0);

  function rollDice() {
    if (rolling) return;

    setRolling(true);
    setMessage("🎲 Rolling...");

    const rollInterval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);

      const d1 = Math.floor(Math.random() * 6);
      const d2 = Math.floor(Math.random() * 6);
      setDice([d1, d2]);

      const total = d1 + d2 + 2; // indexes start from 0
      if (total > 7) {
        setMessage(`🎉 You Win! (Total: ${total})`);
        setWin((w) => w + 1);
      } else if (total === 7) {
        setMessage(`😐 It's a Draw! (Total: ${total})`);
        setDraw((d) => d + 1);
      } else {
        setMessage(`💀 You Lose! (Total: ${total})`);
        setLoss((l) => l + 1);
      }

      setRolling(false);
    }, 1500);
  }

  function resetScore() {
    setWin(0);
    setLoss(0);
    setDraw(0);
    setMessage("🎲 Scores Reset!");
  }

  return (
    <div className="container">
      <h1>🎲 Dice Roll Game</h1>

      <div className="digits">
        <div className={`dice-box ${rolling ? "spinning" : ""}`}>
          <h2>{diceFaces[dice[0]]}</h2>
        </div>
        <div className={`dice-box ${rolling ? "spinning" : ""}`}>
          <h2>{diceFaces[dice[1]]}</h2>
        </div>
      </div>


      <h2>{message}</h2>

      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <div className="scoreboard">
        <h3>🏆 Wins: {win}</h3>
        <h3>💀 Losses: {loss}</h3>
        <h3>😐 Draws: {draw}</h3>
      </div>

      <button onClick={resetScore} className="reset-btn">
        Reset Score
      </button>
    </div>
  );
}

export default App;
