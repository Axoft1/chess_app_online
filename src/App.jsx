import React from "react";
import "./index.css";
import {Route, Routes } from "react-router-dom";
import Home from "./components/multiplayer/Home";
import UserForm from "./components/multiplayer/UserForm";
import GameApp from "./GameApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./components/multiplayer/firebase";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return "загрузка ...";
  }
  if (error) {
    return "Произошла ошибка";
  }
  if (!user) {
    return <UserForm />;
  }
  return (
    <>
      <Routes>
        {/* <Route exact path="/" element={<UserForm />} /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/game/:id" element={<GameApp />} />
      </Routes>
    </>
  );
}
