import React from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";

export default function BoardSquare({ piece, black }) {
    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
        //   const [fromPosition] = item.id.split('_')
        //   handleMove(fromPosition, position)
        },
      })
  return (
    <div className="board-square" ref={drop}>
      <Square black={black}>{piece && <Piece piece={piece} />}</Square>
    </div>
  );
}
