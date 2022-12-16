import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider, MultiBackend } from "react-dnd-multi-backend";
import { HashRouter } from "react-router-dom";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isMobile = window.innerWidth < 600;
// const HTML5toTouchq = {
//   backends: [
//     {
//       id: "html5",
//       backend: HTML5Backend,
//       transition: MouseTransition,
//     },
//     {
//       id: "touch",
//       backend: TouchBackend,
//       options: { enableMouseEvents: true },
//       preview: true,
//       transition: TouchTransition,
//     },
//   ],
// };
root.render(
  <React.StrictMode>
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      // backend={MultiBackend}
      // options={HTML5toTouch}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </DndProvider>
  </React.StrictMode>
);
