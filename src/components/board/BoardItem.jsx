import React, { useEffect, useState } from "react";
import Squaere from "./Squaere";
import ChessPiece from "./ChessPiece";
import { useDrop } from "react-dnd";
import { handleMove, game } from "../game/Game";
import Promote from "./Promote";

const BoardItem = ({ piece, black, position, styleFigure }) => {
  const [promotion, setPromotions] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  
  const whereFrom = lastMove ? lastMove.slice(0, 2) : ""; 
  const where = lastMove ? lastMove.slice(3, 5) : ""; 

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });
  // console.log(position);
  
  useEffect(() => {
    const savedGame = localStorage.getItem("theLastMove");
    setLastMove(savedGame);
    const subscribe = game.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotions(pendingPromotion)
        : setPromotions(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);
  return (
    <div className="board_item" ref={drop}>
      <Squaere black={black} move={whereFrom === position} where={where === position}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <ChessPiece
            piece={piece}
            position={position}
            styleFigure={styleFigure}
          />
        ) : null}
      </Squaere>
    </div>
  );
};

export default BoardItem;
