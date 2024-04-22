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
import { CreateNewPost } from "./Components/Posts/CreateNewPost";
import { LoadingScreen } from "./Components/Common/Loading-Splash Screen/LoadingScreen";

function App() {
  return (
    <>
      <Suspense fallback={LoadingScreen}>
        <Routes>
          {/* Default */}
          <Route path="/*" element={<Navigate to={"/login"} />} />
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
          <Route
            path="/createPost"
            element={<ProtectedRoute component={CreateNewPost} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
