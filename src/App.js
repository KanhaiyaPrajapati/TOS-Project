import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import "./sass/style.scss";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import NewsFeed from "./Pages/NewsFeed";
import PageNotFound from "./Pages/PageNotFound";
import SignUp from "./Pages/SignUp";
import ResetPassWord from "./Pages/ResetPassWord";
import ForgotPassword from "./Pages/ForgotPassword";
import Reporter from "./Pages/Reporter";
import Subadmin from "./Pages/Subadmin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here, e.g., API calls, validation, etc.
    // Upon successful login, set isLoggedIn to true.
    setIsLoggedIn(true);
  }; 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<Users />} />
        <Route path="/newsfeed" element={<NewsFeed />} />
        <Route path="/reporter" element={<Reporter />} />
        <Route path="/subadmin" element={<Subadmin />} />
        <Route path="/resetpassword" element={<ResetPassWord />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

