import React from "react";
import { memo } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
const ChessPiece = memo(function ChessPieceMemo({
  piece: { type, color },
  position,
  styleFigure,
}) {
  const newType = type.toUpperCase();

  const [{ isDragging }, drag, dragPreview] = useDrag({
    item: { type: "piece", id: `${position}_${color}_${newType}` },

    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const chessPiece = require(`../../img/${styleFigure}/${color}${newType}.svg`);

  return (
    <>
      <DragPreviewImage connect={dragPreview} src={chessPiece} />
      <div className="chess_piece" style={{ opacity: isDragging ? 0.1 : 1 }}>
        <img ref={drag} className="pieceImg" src={chessPiece} alt=""></img>
      </div>
    </>
  );
});

export default ChessPiece;
