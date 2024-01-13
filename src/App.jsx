/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import { useFirebase } from "./FirebaseSetUp/FirebaseContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Messages } from "./Pages/Messages";
import { useAuth } from "./AuthContext/AuthProvider";
import { Profile } from "./Components/Profile/Profile";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading content...</div>}>
        <Routes>
          <Route path="/home" Component={Home}></Route>
          {/* Default */}
          <Route path="/*" element={<Navigate to={"/register"} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
