import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/home.css";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 0,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/comments`);
      setReviews(res.data);
    } catch (err) {
      console.error("Erreur chargement avis:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || newReview.rating === 0) {
      alert("Merci de remplir votre nom, un avis et de sélectionner une note.");
      return;
    }
    try {
      await axios.post(`${API_URL}/comments`, newReview);
      fetchReviews();
      setNewReview({ name: "", text: "", rating: 0 });
    } catch (err) {
      console.error("Erreur ajout avis:", err);
    }
  };

  return (
    <div className="home-page">
      <div className="left-panel">
        <section>
          <h2>Présentation</h2>
          <p>
            Je m'appelle AELPROD developpeur FullStack, passionné par le
            développement, j'ai suivi une formation en Intégrateur Web pour
            acquérir les compétences nécessaires dans ce domaine. Mon parcours
            m'a permis de maîtriser les langages HTML, CSS et JavaScript, ainsi
            que les frameworks tels que Bootstrap, pour ensuite basculer vers le
            FULLSTACK. J'ai également une solide expérience dans la création
            d'interfaces utilisateur attrayantes et fonctionnelles. Toujours à
            l'affût des dernières tendances en matière de design et de
            développement web, je suis prêt à relever de nouveaux défis et à
            contribuer au succès de projets innovants.
          </p>
        </section>
        <section>
          <h2>Ambition d'entreprise</h2>
          <p>
            Chez AELPROD, mon ambition est de transformer chaque projet web en
            une expérience unique et mémorable. Je m'engage à concevoir des
            solutions modernes qui allient esthétisme, performance et
            accessibilité, afin de répondre aux besoins spécifiques de mes
            clients. Mon objectif est de démocratiser l'accès aux technologies
            web les plus récentes pour les entrepreneurs, freelances,
            associations et petites entreprises, en leur offrant des outils sur
            mesure, évolutifs et parfaitement adaptés à leur identité. À travers
            une approche centrée sur l'humain, je place l'écoute, la
            collaboration et l'innovation au cœur de mon processus. AELPROD,
            c'est bien plus qu'un prestataire : c'est un partenaire de confiance
            dédié à la réussite numérique de ses clients, aujourd'hui et pour
            demain.
          </p>
        </section>
      </div>

      <div className="right-panel">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-header">
            <input
              type="text"
              placeholder="Nom / Prénom / Pseudo"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />
          </div>

          <div className="form-content">
            <textarea
              placeholder="Votre avis..."
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
            />
          </div>

          <div className="form-footer">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={newReview.rating >= n ? "star selected" : "star"}
                  onClick={() => setNewReview({ ...newReview, rating: n })}
                >
                  ★
                </span>
              ))}
            </div>
            <button type="submit">Publier</button>
          </div>
        </form>

        <div className="reviews">
          <h3>Avis clients</h3>
          {reviews.map((rev) => (
            <div key={rev.id} className="review">
              <p>
                <strong>{rev.name} :</strong> {rev.text}
              </p>
              <div className="rating">
                {[...Array(rev.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
