import React from "react";

const Squaere = ({ children, black, move, where }) => {
  const classBW = move
    ? "squaere_bla"
    : where
    ? "squaere_bla"
    : black
    ? "squaere_black"
    : "squaere_white";

  return <div className={classBW}>{children}</div>;
};

export default Squaere;
