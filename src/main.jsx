import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { FirebaseContext } from "./FirebaseSetUp/FirebaseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext>
      <App />
    </FirebaseContext>
  </React.StrictMode>
);
