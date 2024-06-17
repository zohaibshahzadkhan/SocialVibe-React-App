import React, { useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";
import axios from "axios";
import { useUser } from "./context/UserContext";
import Footer from "./components/Footer";

function App() {
  const { user, initStore } = useUser();
  const initStoreCalled = useRef(false); // To track if initStore has been called

  useEffect(() => {
    if (!initStoreCalled.current) {
      initStore();
      initStoreCalled.current = true;
    }
  }, [initStore]);

  useEffect(() => {
    const token = user.access;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  }, [user.access]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow px-8 py-6 bg-gray-100">
        <Outlet />
        <Toast />
      </main>
      <Footer />
    </div>
  );
}

export default App;
