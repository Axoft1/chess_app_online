import { Chess } from "chess.js";
import { BehaviorSubject, map } from "rxjs";
import { auth } from "../multiplayer/firebase";
import { fromRef } from "rxfire/firestore";

let gameRef;
let member;
const chess = new Chess();
let game;

const initGame = async (gameRefFb) => {
  // console.log(gameRefFb);
  const { currentUser } = auth;
  if (gameRefFb) {
    gameRef = gameRefFb;
    const initialGame = await gameRefFb.get().then((doc) => doc.data());
       
    if (!initialGame) {
      return "notfound";
    }
    // console.log(initialGame);
    const creator = initialGame.members.find((m) => m.creator === true);
    if (initialGame.status === "waiting" && creator.uid !== currentUser.uid) {
      const currUser = {
        uid: currentUser.uid,
        name: localStorage.getItem("userName"),
        piece: creator.piece === "w" ? "b" : "w",
      };
      const updatedMembers = [...initialGame.members, currUser];
      await gameRefFb.update({ members: updatedMembers, status: "ready" });
    } else if (!initialGame.members.map((m) => m.uid).includes(currentUser.uid)) {
      return "intruder";
    }
    chess.reset();
    game = fromRef(gameRefFb).pipe(
      map((gameDoc) => {
        const gameD = gameDoc.data();
        const { pendingPromotion, gameData, ...resetOfGame } = gameD;
        member = gameD.members.find((m) => m.uid === currentUser.uid);
        const oponent = gameD.members.find((m) => m.uid !== currentUser.uid);
        if (gameData) {
          chess.load(gameData);
        }
        const isGameOver = chess.isGameOver();
        return {
          board: chess.board(),
          pendingPromotion,
          isGameOver,
          position: member.piece,
          member,
          oponent,
          result: isGameOver ? getGameResult() : null,
          ...resetOfGame,
        };
      })
    );
  } else {
    gameRef = null;
    game = new BehaviorSubject();
    const savedGame = localStorage.getItem("savedGame");
    if (savedGame) {
      chess.load(savedGame);
    }
    updateGame();
  }
};

const resetGame = async () => {
  if (gameRef) {
    await updateGame(null, true);
    chess.reset();
  } else {
    chess.reset();
    updateGame();
  }
};

const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  console.table(promotions);
  let pendingPromotion;
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  if (!pendingPromotion) {
    move(from, to);
  }
};

const getGameResult = () => {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "w" ? "ЧЕРНЫЕ" : "БЕЛЫЕ";
    return `МАТ - ПОБЕДИТЕЛЬ - ${winner}`;
  } else if (chess.isDraw()) {
    let reason = "ПРАВИЛО НА 50 ХОДОВ";
    if (chess.isStalemate()) {
      reason = "БЕЗВЫХОДНОЕ ПОЛОЖЕНЕ";
    } else if (chess.isThreefoldRepetition()) {
      reason = "ПОВТОРЕНИЕ";
    } else if (chess.isInsufficientMaterial()) {
      reason = "НЕДОСТАТОЧНЫЙ МАТЕРИАЛ";
    }
    return `${reason}`;
  } else {
    return `НЕИЗВЕСТНАЯ ПРИЧИНА`;
  }
};

const move = (from, to, promotion) => {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  if (gameRef) {
    if (member.piece === chess.turn()) {
      const legalMove = chess.move(tempMove);
      if (legalMove) {
        updateGame();
      }
    }
  } else {
    const legalMove = chess.move(tempMove);
    if (legalMove) {
      updateGame();
    }
  }
};

const updateGame = async (pendingPromotion, reset) => {
  const isGameOver = chess.isGameOver();
  if (gameRef) {
    const updatedData = {
      gameData: chess.fen(),
      pendingPromotion: pendingPromotion || null,
    };
    if (reset) {
      updatedData.status = "over";
    }
    await gameRef.update(updatedData);
  } else {
    const newGame = {
      board: chess.board(),
      pendingPromotion,
      isGameOver,
      position: chess.turn(),
      result: isGameOver ? getGameResult() : null,
    };
    localStorage.setItem("savedGame", chess.fen());
    game.next(newGame);
  }
};

export { game, move, updateGame, initGame, handleMove, resetGame };
