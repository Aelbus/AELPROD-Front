import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Admin.css";

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
        axios.get("/api/quotes"),
        axios.get("/api/templates"),
        axios.get("/api/comments"),
      ]);
      setQuotes(quotesRes.data);
      setTemplates(templatesRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error("Erreur chargement admin:", err);
    }
  };

  const deleteQuote = async (id) => {
    try {
      await axios.delete(`/api/quotes/${id}`, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      fetchData();
    } catch (err) {
      console.error("Erreur suppression devis:", err);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      fetchData();
    } catch (err) {
      console.error("Erreur suppression commentaire:", err);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`/api/templates/${id}`, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      fetchData();
    } catch (err) {
      console.error("Erreur suppression template:", err);
    }
  };

  const addTemplate = async () => {
    if (!newTemplate.name || !newTemplate.price || !newTemplate.description) {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    try {
      await axios.post("/api/templates", newTemplate, {
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
              onClick={() => deleteQuote(quote.id)}
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
              onClick={() => deleteTemplate(template.id)}
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
              onClick={() => deleteComment(comment.id)}
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
