import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Feed from "./pages/Feed.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Friends from "./pages/Friends.jsx";
import AppProviders from "./context/AppContext.jsx";
import "./api/apiDefaults.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<h1>HOME</h1>} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="feed" element={<Feed />} />
      <Route path="chat" element={<Chat />} />
      <Route path="search" element={<Search />} />
      <Route path="/profile/:userId/friends" element={<Friends />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
