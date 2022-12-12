import React, { useState } from "react";
import { auth } from "./firebase";
import './multiplayerStyle.css'

 const UserForm = () => {
     const [name, setName] = useState("");
     
  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("userName", name);
    await auth.signInAnonymously();
  }
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h1>Введите ваше имя для продолжения</h1>
      <br />
      <div className="filed">
        <p className="control">
          <input
            type="text"
            name=""
            id=""
            className="input"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success" type="submit">
            Старт
          </button>
        </p>
      </div>
    </form>
  );
};

export default UserForm 