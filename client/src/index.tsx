import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
