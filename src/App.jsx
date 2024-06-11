import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";
function App() {
  return (
    <>
      <NavBar />
      <main className="px-8 py-6 bg-gray-100">
        <Outlet />
        <Toast />
      </main>
    </>
  );
}

export default App;
