import React, { useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";
import { useUser } from "./context/UserContext";
import Footer from "./components/Footer";

function App() {
  const { initStore } = useUser();
  const initStoreCalled = useRef(false);

  useEffect(() => {
    if (!initStoreCalled.current) {
      initStore();
      initStoreCalled.current = true;
    }
  }, [initStore]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow px-8 py-6 bg-gray-100">
        <Toast />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
