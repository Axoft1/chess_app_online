import React from "react";
import { useDrag } from "react-dnd";

const ChessPiece = ({ piece: { type, color }, position, styleFigure }) => {
  const newType = type.toUpperCase();

  const [{ isDragging }, drag] = useDrag({
    item: { type: "piece", id: `${position}_${color}_${newType}` },

    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const chessPiece = require(`../../img/${styleFigure}/${color}${newType}.svg`);

  return (
    <>
      {/* <DragPreviewImage connect={dragPreview} src={chessPiece} /> */}
      <div className="chess_piece" style={{ opacity: isDragging ? 0 : 1 }}>
        <img ref={drag} className="pieceImg" src={chessPiece} alt=""></img>
      </div>
    </>
  );
};

export default ChessPiece;
