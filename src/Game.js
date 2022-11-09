import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();

export const gameSubject = new BehaviorSubject({
  board: chess.board(),
});

export const initGame = () => {
  updateGame();
};

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  console.table(promotions);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
};

export const move = (from, to) => {
  const legalMove = chess.move({ from, to });
  if (legalMove) {
    updateGame();
  }
};

const updateGame = (pendingPromotion) => {
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    // isGameOver,
    // turn: chess.turn(),
    // result: isGameOver ? getGameResult() : null
  };
  gameSubject.next(newGame);
};
