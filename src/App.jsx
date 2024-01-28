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
import { ProtectedRoute } from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading content...</div>}>
        <Routes>
          {/* Default */}
          <Route path="/*" element={<Navigate to={"/register"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" Component={Register} />

          {/* Protected */}
          <Route path="/home" element={<ProtectedRoute component={Home} />} />

          <Route
            path="/messages/:userId"
            element={<ProtectedRoute component={Messages} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
