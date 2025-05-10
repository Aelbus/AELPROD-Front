import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components/QuoteModal.css";

const QuoteModal = ({
  isOpen,
  onClose,
  defaultService = "",
  templates = [],
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: defaultService,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setForm({
        name: "",
        email: "",
        service: defaultService,
        message: "",
      });
    }
  }, [isOpen, defaultService]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedTemplate = templates.find((t) => t.name === form.service);
      const price = selectedTemplate ? selectedTemplate.price : "N/A";

      await axios.post("/api/quotes", {
        name: form.name,
        email: form.email,
        service: form.service,
        message: form.message,
        price: price,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Erreur envoi devis:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {!success ? (
          <form onSubmit={handleSubmit}>
            <h2>Demande de Devis</h2>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Choisir un service</option>
              {templates.map((template) => (
                <option key={template.id} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Détails du projet..."
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le devis"}
            </button>
          </form>
        ) : (
          <div className="modal_succes">
            <h3>Merci ! Votre demande a été envoyée ✅</h3>
            <button onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
