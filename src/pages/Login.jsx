import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminPassword", password);
        navigate("/admin");
      } else {
        setMessage("Identifiants invalides");
      }
    } catch (err) {
      console.error("Erreur login:", err);
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion Admin</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && (
        <div
          className={`login-message ${
            message.includes("Erreur") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
