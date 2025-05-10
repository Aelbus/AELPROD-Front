import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/template.css";
import QuoteModal from "../components/QuoteModal";

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [offers, setOffers] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("/api/templates");
      setOffers(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des templates :", err);
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`/api/templates/${id}`, {
        headers: { Authorization: localStorage.getItem("adminPassword") || "" },
      });
      fetchTemplates();
    } catch (err) {
      console.error("Erreur lors de la suppression du template :", err);
    }
  };

  return (
    <div className="templates-page">
      <h1>Nos Templates & Tarifs</h1>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            {isAdmin && (
              <button
                className="delete-btn"
                onClick={() => deleteTemplate(offer.id)}
                title="Supprimer le template"
              >
                ✖
              </button>
            )}
            <h2>{offer.title || offer.name || "(sans nom)"}</h2>
            <p className="price">{offer.price || "(sans prix)"}</p>
            <p>{offer.description || offer.desc || "(sans description)"}</p>
            <button
              className="contact-btn"
              onClick={() => openModal(offer.title || offer.name)}
            >
              Demander un devis
            </button>
          </div>
        ))}
      </div>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
        templates={offers}
      />
    </div>
  );
};

export default Templates;
