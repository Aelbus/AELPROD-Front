import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Admin.css";

const API_URL = process.env.REACT_APP_API_URL;

const Admin = () => {
  const [quotes, setQuotes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [comments, setComments] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quotesRes, templatesRes, commentsRes] = await Promise.all([
        axios.get(`${API_URL}/quotes`),
        axios.get(`${API_URL}/templates`),
        axios.get(`${API_URL}/comments`),
      ]);
      setQuotes(quotesRes.data);
      setTemplates(templatesRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error("Erreur chargement admin:", err);
    }
  };

  const deleteItem = async (endpoint, id) => {
    try {
      await axios.delete(`${API_URL}/${endpoint}/${id}`, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      fetchData();
    } catch (err) {
      console.error(`Erreur suppression ${endpoint}:`, err);
    }
  };

  const addTemplate = async () => {
    if (!newTemplate.name || !newTemplate.price || !newTemplate.description) {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    try {
      await axios.post(`${API_URL}/templates`, newTemplate, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      setNewTemplate({ name: "", price: "", description: "" });
      fetchData();
    } catch (err) {
      console.error("Erreur ajout template:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminPassword");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h1>Panneau Admin</h1>
      <button className="logout-button" onClick={handleLogout}>
        Déconnexion
      </button>

      <section>
        <h2>Demandes de devis</h2>
        {quotes.map((quote) => (
          <div key={quote.id} className="admin-item">
            <span>
              {quote.name} - {quote.service} - {quote.price}€
              <br />
              <em>{quote.message}</em>
            </span>
            <button
              className="delete-button"
              onClick={() => deleteItem("quotes", quote.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>Templates existants</h2>
        {templates.map((template) => (
          <div key={template.id} className="admin-item">
            <span>
              {template.name || "(sans nom)"} -{" "}
              {template.price || "(sans prix)"} -{" "}
              {template.description || "(sans description)"}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteItem("templates", template.id)}
            >
              Supprimer
            </button>
          </div>
        ))}

        <div className="add-template">
          <input
            type="text"
            placeholder="Titre"
            value={newTemplate.name}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Prix"
            value={newTemplate.price}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newTemplate.description}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, description: e.target.value })
            }
          />
          <button className="add-button" onClick={addTemplate}>
            Ajouter
          </button>
        </div>
      </section>

      <section>
        <h2>Commentaires</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="admin-item">
            <span>
              <strong>{comment.name}</strong>: {comment.text}
            </span>
            <div className="rating">
              {"★".repeat(comment.rating)}
              {"☆".repeat(5 - comment.rating)}
            </div>
            <button
              className="delete-button"
              onClick={() => deleteItem("comments", comment.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
