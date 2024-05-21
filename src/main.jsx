import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { FirebaseContext } from "./FirebaseSetUp/FirebaseContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthProvider.jsx";
import { ProfilePhotoProvider } from "./Components/Profile/ProfilePhotoContext/ProfilePhotoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext>
      <AuthProvider>
        <ProfilePhotoProvider>
          <Router>
            <App />
          </Router>
        </ProfilePhotoProvider>
      </AuthProvider>
    </FirebaseContext>
  </React.StrictMode>
);
