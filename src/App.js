import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

const GRID_STATE = {
  x: "x",
  o: "o",
};

const DEFAULT_GRID = {
  A1: "-",
  A2: "-",
  A3: "-",
  B1: "-",
  B2: "-",
  B3: "-",
  C1: "-",
  C2: "-",
  C3: "-",
};

function App() {
  const [hasWinner, setHasWinner] = useState(false);
  const [player, setPlayer] = useState(GRID_STATE.x);
  const [grid, setGrid] = useState(DEFAULT_GRID);

  const flipPlayer = () => {
    if (player == GRID_STATE.x) {
      setPlayer(GRID_STATE.o);
    } else if (player == GRID_STATE.o) {
      setPlayer(GRID_STATE.x);
    }
  };

  const winCondition = (newGrid) => {
    const conditions = [
      ["A1", "B1", "C1"],
      ["A2", "B2", "C2"],
      ["A3", "B3", "C3"],
      ["A1", "A2", "A3"],
      ["B1", "B2", "B3"],
      ["C1", "C2", "C3"],
      ["A1", "B2", "C3"],
      ["A3", "B2", "C1"],
    ];

    for (const condition of conditions) {
      const vals = condition.map((e) => newGrid[e]);
      if (vals.every((e) => e === GRID_STATE.x)) {
        setHasWinner(GRID_STATE.x);
        return true;
      } else if (vals.every((e) => e === GRID_STATE.o)) {
        setHasWinner(GRID_STATE.o);
        return true;
      }
    }

    return false;
  };

  const generateOnClickHandler = (coordinate) => {
    return (e) => {
      // disable game if winner declared
      if (hasWinner) return;

      // update the set grid state
      const newGrid = { ...grid };
      newGrid[coordinate] = player;
      setGrid(newGrid);

      if (winCondition(newGrid)) {
        return;
      }

      // flip player
      flipPlayer();
    };
  };

  const replay = () => {
    setHasWinner(false);
    setPlayer(GRID_STATE.x);
    setGrid(DEFAULT_GRID);
  };

  return (
    <div className="App" style={{ fontSize: "100px" }}>
      {hasWinner ? <div>{`${hasWinner} wins`}</div> : null}
      <div style={{ cursor: "pointer" }}>
        <span onClick={generateOnClickHandler("A1")}>{grid.A1}</span>
        <span onClick={generateOnClickHandler("B1")}>{grid.B1}</span>
        <span onClick={generateOnClickHandler("C1")}>{grid.C1}</span>
      </div>
      <div style={{ cursor: "pointer" }}>
        <span onClick={generateOnClickHandler("A2")}>{grid.A2}</span>
        <span onClick={generateOnClickHandler("B2")}>{grid.B2}</span>
        <span onClick={generateOnClickHandler("C2")}>{grid.C2}</span>
      </div>
      <div style={{ cursor: "pointer" }}>
        <span onClick={generateOnClickHandler("A3")}>{grid.A3}</span>
        <span onClick={generateOnClickHandler("B3")}>{grid.B3}</span>
        <span onClick={generateOnClickHandler("C3")}>{grid.C3}</span>
      </div>
      <div>current turn: {player}</div>
      <button onClick={() => replay()}>replay</button>
    </div>
  );
}

export default App;
//   A B C
// 1 x x x
// 2 x x x
// 3 x x x

// [A1: x, A2:-, A3, B1, B2, B3, C1, C2, C3]

// // horizontal
// A1,B1,C1
// A2,B2,C2
// A3,B3,C3

// //vertical
// A1,A2,A3
// B1,B2,B3
// A1,A2,A3

// // diagonal
// A1,B2,C3
// A3,B2,C1
