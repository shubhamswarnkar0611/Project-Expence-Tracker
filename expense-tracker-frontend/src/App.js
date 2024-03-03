import React, { useState } from "react";
import { Routes, Route ,Navigate } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Signup from "./pages/signup/Signup.js";
import { AppContext } from "./context/appContext.js";

function App() {
  const [userToken, setUserToken] = useState();

  function PrivateRoute({ children }) {
    return userToken ? children : <Navigate to="/login" replace />;
  }
  return (
    <AppContext.Provider value={{ userToken, setUserToken }}>
      <Routes>
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
