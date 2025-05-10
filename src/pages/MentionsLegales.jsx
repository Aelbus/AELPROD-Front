import React from "react";
import "../styles/pages/MentionsLegales.css";

export default function MentionsLegales() {
  return (
    <main className="mentions-container">
      <h1>Mentions Légales</h1>
      <p>
        Ce site est édité par : <strong>AELPROD</strong>.
      </p>
      <p>Siège social : 5 Rue Jean Jaures 08400 VOUZIERS.</p>
      <p>
        Numéro SIRET : 94415775900019 - TVA intracommunautaire : non nécessaire.
      </p>
      <p>Directeur de publication : Clément B.</p>
      <p>
        Hébergeur : Infomaniak / Netlify / OVH / Autre, adresse de l’hébergeur.
      </p>
    </main>
  );
}
