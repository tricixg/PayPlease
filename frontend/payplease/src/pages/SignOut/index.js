import { useAuth } from "context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";

export default function SignOut() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    logout();
    navigate("/authentication/signin");
  }, []);

  return <div>Logging Out</div>;
}
