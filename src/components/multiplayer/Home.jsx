import { auth, db } from "./firebase";
import React, { useState } from "react";
import "./multiplayerStyle.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // console.log('re');
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const newGameOptions = [
    { lable: "Черными фигурами", value: "b" },
    { lable: "Белыми фигурами", value: "w" },
    { lable: "Без разницы", value: "r" },
  ];
  const handlePlayOnline = () => {
    setShowModal(true);
  };
  
  const startOnlineGame = async (startingPiece) => {
    const member = {
      uid: currentUser.uid,
      piece:
        startingPiece === "r"
          ? ["b", "w"][Math.random(Math.random())]
          : startingPiece,
      name: localStorage.getItem("userName"),
      creator: true,
    };
    const game = {
      status: "waiting",
      members:  [member] ,
      gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
    };
    await db.collection("games").doc(game.gameId).set(game);
    navigate(`game/${game.gameId}`);
  };
  const startOfflineGame = () => {   
    navigate(`game/local`);
  };
  return (
    <>
      <div className="columns home">
        <div className="column has-background-primary home-columns">
          <div className="button is-link is-light" onClick={startOfflineGame}>
            Играть Ofline
          </div>
        </div>
        <div className="column has-background-link home-columns">
          <div
            className="button is-primary is-light"
            onClick={handlePlayOnline}
          >
            Играть Online
          </div>
        </div>
      </div>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="content">
                Пожалуйста, выберите какими фигурами вы бы хотели начать
              </div>
            </div>
            <footer className="card-footer">
              {newGameOptions.map(({ lable, value }) => (
                <span
                  className="card-footer-item pointer"
                  key={value}
                  onClick={() => startOnlineGame(value)}
                >
                  {lable}
                </span>
              ))}
            </footer>
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
    </>
  );
};

export default Home;
