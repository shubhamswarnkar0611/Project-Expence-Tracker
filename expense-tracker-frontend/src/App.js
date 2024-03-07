import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import AddExpense from "./pages/addExpense/AddExpense";
import Leaderboard from "./pages/leaderboard-premium/Leaderboard";
import { AppContext } from "./context/appContext";
import { useGetUserMutation } from "./services/api";

function App() {
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState("");
  const [getUser, { isLoading }] = useGetUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    } else {
      setUserToken(token);
      handleGetUser();
    }
  }, [setUser]);

  async function handleGetUser() {
    const userToken = localStorage.getItem("userToken");
    const user = await getUser({ userToken });
    setUser(user.data);
  }

  return (
    <AppContext.Provider value={{ userToken, setUserToken, user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
