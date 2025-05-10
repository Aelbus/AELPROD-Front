import React, { useState } from "react";
import axios from "axios";
import "../styles/pages/Contact.css";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("Message envoyé avec succès !");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Erreur lors de l’envoi.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Envoyer</button>
        <p
          className={`status-message ${
            status.includes("succès") ? "success" : "error"
          }`}
        >
          {status}
        </p>
      </form>
    </div>
  );
}
