import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Templates from "./pages/Templates.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import ConditionsGenerales from "./pages/ConditionsGenerales.jsx";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite.jsx";
import Admin from "./pages/Admin.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/conditions-generales" element={<ConditionsGenerales />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/politique-confidentialite"
        element={<PolitiqueConfidentialite />}
      />
    </Routes>
  );
}
