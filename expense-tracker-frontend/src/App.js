import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import AddExpense from "./pages/addExpense/AddExpense";
import Leaderboard from "./pages/leaderboard-premium/Leaderboard";
import DayToDayExpenses from "./pages/dayToDayExpense/DayToDayExpenses";
import { AppContext } from "./context/appContext";
import { useGetUserMutation } from "./services/api";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userToken, setUserToken] = useState();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [user, setUser] = useState("");
  const [getUser, { isLoading }] = useGetUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
      handleGetUser();
    }
  }, [setUser, navigate]);

  async function handleGetUser() {
    const userToken = localStorage.getItem("userToken");
    const user = await getUser({ userToken });
    setUser(user.data);
  }

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
        user,
        setUser,
        isOpenSideBar,
        setIsOpenSideBar,
      }}
    >
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route */}

        <Route 
        path="/" 
        element={<ProtectedRoute Page={Dashboard} />} />
        <Route
          path="/add-expense"
          element={<ProtectedRoute Page={AddExpense} />}
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoute Page={Leaderboard} />}
        />
        <Route
          path="/day-to-day-expenses"
          element={<ProtectedRoute Page={DayToDayExpenses} />}
        />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
