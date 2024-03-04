import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import { AppContext } from "./context/appContext";
import AddExpense from "./pages/addExpense/AddExpense";

function App() {
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AppContext.Provider value={{ userToken, setUserToken }}>
      <Routes>
        {!userToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        <Route path="/" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
