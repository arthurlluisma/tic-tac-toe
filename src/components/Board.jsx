import { useState } from "react";
import Square from "./Square.jsx";

export default function Board() {
  const [clickCount, setClickCount] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!winner && clickCount < 9) {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  } else {
    status = "Game is Tied!";
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setClickCount(clickCount + 1);
  }

  return (
    <div className="@container w-33">
      <p>{status}</p>
      <div className="grid grid-cols-3 h-11">
        <Square
          styles={"border-t border-l"}
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          styles={"border-t border-l border-r"}
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          styles={"border-t border-r"}
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="grid grid-cols-3 h-11">
        <Square
          styles={"border-t border-l border-b"}
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          styles={"border-t border-l border-b border-r"}
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          styles={"border-t border-b border-r"}
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="grid grid-cols-3 h-11">
        <Square
          styles={"border-l border-b"}
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          styles={"border-l border-b border-r"}
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          styles={"border-b border-r"}
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
