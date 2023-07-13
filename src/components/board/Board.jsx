import React, { useState, useEffect } from "react";
import BoardItem from "./BoardItem";
import "./BoardStyle.css";

const Board = ({ board, position, styleFigure }) => {
  const [currBoard, setCurBoard] = useState([]);

  useEffect(() => {
    setCurBoard(position === "w" ? board.flat() : board.flat().reverse());
  }, [board, position]);

  const getXY = (i) => {
    const x = position === "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      position === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
    return { x, y };
  };
  const isBlack = (i) => {
    const { x, y } = getXY(i);
    return (x + y) % 2 === 0;
  };
  const getPosition = (i) => {
    const { x, y } = getXY(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };
  const getNumbPisition = (i) => {
    const numb = { 0: 8, 8: 7, 16: 6, 24: 5, 32: 4, 40: 3, 48: 2, 56: 1 };
    return numb[i];
  };
  return (
    <>
      <div className="board_position letters">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
        <div>E</div>
        <div>F</div>
        <div>G</div>
        <div>H</div>
      </div>

      <div className="board">
        {currBoard.flat().map((piece, i) => (
          <>
            {i % 8 === 0 ? (
                <div className="board_position numbs">{getNumbPisition(i)}</div>
              ) : (
                ""
              )}
            <div key={i} className="board_cell">
              <BoardItem
                styleFigure={styleFigure}
                piece={piece}
                black={isBlack(i)}
                position={getPosition(i)}
              ></BoardItem>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Board;
