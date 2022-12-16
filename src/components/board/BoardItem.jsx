import React, { useEffect, useState } from "react";
import Squaere from "./Squaere";
import ChessPiece from "./ChessPiece";
import { useDrop } from "react-dnd";
import { handleMove, game } from "../game/Game";
import Promote from "./Promote";

const BoardItem = ({ piece, black, position, styleFigure }) => {
  const [promotion, setPromotions] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });
  useEffect(() => {
    const subscribe = game.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotions(pendingPromotion)
        : setPromotions(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);
  return (
    <div className="board_item" ref={drop}>
      <Squaere black={black}>
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
