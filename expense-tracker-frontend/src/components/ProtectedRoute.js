import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({Page}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Render Page as a component
  return (
    <>
      <Page />
    </>
  );
};

export default ProtectedRoute;