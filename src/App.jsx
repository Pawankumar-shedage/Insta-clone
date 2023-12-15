/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import { useFirebase } from "./FirebaseSetUp/FirebaseContext";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading content...</div>}>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
