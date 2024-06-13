import React, { useRef, useState } from 'react';
import './Gogul.css';
import circle_icon from '../assets/GG.jpeg';
import cross_icon from '../assets/zara.png';

function TicTacToe() {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock) {
      return;
    }

    const newData = [...data];
    if (newData[num] === "") {
      if (count % 2 === 0) {
        newData[num] = "Zara";
        e.target.innerHTML = `<img src="${cross_icon}" alt="X" />`;
      } else {
        newData[num] = "Gogul";
        e.target.innerHTML = `<img src="${circle_icon}" alt="O" />`;
      }
      setData(newData);
      setCount(count + 1);
      checkwin(newData);
    }
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = 'Zara Vs Gogul <span>Game</span>';
    document.querySelectorAll('.boxes').forEach(box => (box.innerHTML = ""));
  };

  const checkwin = (newData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }

    if (count === 8) {
      titleRef.current.innerHTML = 'It\'s a Draw!';
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `${winner} Wins!`;
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Zara vs Gogul <span>Game</span></h1>
      <div className="board">
        <div className="row">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
}

export default TicTacToe;
