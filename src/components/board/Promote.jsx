import React from 'react'
import { move } from '../game/Game';
import Squaere from './Squaere'

const promotionPieces = ['R', 'N', 'B', 'Q']

const Promote = ({ promotion:{from, to, color} }) => {

  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="board_cell_promote">
          <Squaere black={i % 3 === 0}>
            <div
              className="chess_piece"
              onClick={() => move(from, to, p.toLowerCase())}
            >
              <img
                src={require(`../../img/anarcandy/${color}${p}.svg`)}
                alt=""
                className="pieceImg cursor_pointer"
              />
            </div>
          </Squaere>
        </div>
      ))}
    </div>
  );
};

export default Promote