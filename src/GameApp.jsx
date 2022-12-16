import Board from "./components/board/Board";
import React, { useEffect, useState } from "react";
import { game, initGame, resetGame } from "./components/game/Game";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../src/components/multiplayer/firebase";

function GameApp() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState([]);
  const [result, setResult] = useState([]);
  const [position, setPosition] = useState([]);
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [gameR, setGameR] = useState({});
  const [dropdownStyle, setDropdownStyle] = useState(false);
  const [styleFigure, setStyleFigure] = useState("anarcandy");
  const { id } = useParams();
  const sharebleLink = window.location.href;
  const navigate = useNavigate();

  const figure = [
    { lable: "Aльфа", value: "alpha" },
    { lable: "Aнарканди", value: "anarcandy" },
    { lable: "Калифорния", value: "california" },
    { lable: "Кардинальный", value: "cardinal" },
    { lable: "Кбернетт", value: "cburnett" },
    { lable: "Классика", value: "chess7" },
    { lable: "Ореховый", value: "chessnut" },
    { lable: "Компаньон", value: "companion" },
    { lable: "Дубровный", value: "dubrovny" },
    { lable: "Фантазия", value: "fantasy" },
    { lable: "Фреска", value: "fresca" },
    { lable: "Джоко", value: "gioco" },
  ];

  const figureStyle = () => {
    dropdownStyle === true ? setDropdownStyle(false) : setDropdownStyle(true);
  };

  const chooseFigure = (value) => {
    setStyleFigure(value);
  };

  useEffect(() => {
    let subscribe;
    async function init() {
      const res = await initGame(id !== "local" ? db.doc(`games/${id}`) : null);

      setInitResult(res);
      setLoading(false);
      if (!res) {
        subscribe = game.subscribe((game) => {
          setBoard(game.board);
          setIsGameOver(game.isGameOver);
          setResult(game.result);
          setPosition(game.position);
          setStatus(game.status);
          setGameR(game);
        });
      }
    }
    init();
    return () => subscribe && subscribe.unsubscribe();
  }, [id]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sharebleLink);
  };

  if (loading) {
    return "Загрузка ...";
  }
  if (initResult === "notfound") {
    return "Игра не найдена";
  }
  if (initResult === "intruder") {
    return "Игра уже создана";
  }

  return (
    <div className="container">
      {isGameOver && (
        <h2 className="vertical_text">
          ИГРА ОКОНЧЕНА
          <button
            onClick={async () => {
              await resetGame();
              navigate("/");
            }}
          >
            <span className="vertical_text">НОВАЯ ИГРА</span>
          </button>
        </h2>
      )}
      <div className="board_container">
        <div>
          <h1 className="title title-head">ШАХМАТЫ</h1>
        </div>
        <div className="columns is-mobile">
          <div
            className={`dropdown column  navbar-start ${
              dropdownStyle ? "is-active" : null
            }`}
            onClick={figureStyle}
          >
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>Стиль фигур</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {figure.map(({ lable, value }) => (
                  <>
                    <span
                      key={value}
                      className="dropdown-item button"
                      onClick={() => chooseFigure(value)}
                    >
                      {lable}
                    </span>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <button
              className="button  is-link is-focused "
              onClick={async () => {
                await resetGame();
                navigate("/");
              }}
            >
              Начать заного
            </button>
          </div>
        </div>
        {gameR.oponent && gameR.oponent.name && (
          <span className="tag is-link">{gameR.oponent.name}</span>
        )}
        <Board board={board} position={position} styleFigure={styleFigure} />
        {gameR.member && gameR.member.name && (
          <span className="tag is-link">{gameR.member.name}</span>
        )}
      </div>
      {result && <p className="vertical_text">{result}</p>}
      {status === "waiting" && (
        <div className="notification is-link share-game">
          <strong>Share</strong>
          <br />
          <br />
          <div className="field has-addons">
            <input
              type="text"
              className="input"
              readOnly
              value={sharebleLink}
            />
          </div>
          <div className="control">
            <button className="button is-info" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameApp;
