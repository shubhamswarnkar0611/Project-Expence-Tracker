import React, { useState, useEffect ,useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import { AppContext } from "./context/appContext";
import AddExpense from "./components/AddExpense";

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
  }, [navigate,ProtectedRoutes]);

  function ProtectedRoutes() {
    return userToken ? (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    ) : (
      <Navigate to="/login"  />
    );
  }

  return (
    <AppContext.Provider value={{ userToken, setUserToken }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoutes />} />
      </Routes>
    </AppContext.Provider>
  );
}



export default App;
