import Header from "./components/header.jsx";
import Router from "./router.js";
import Footer from "./components/footer.jsx";

const App = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <Router />
      </div>
      <Footer />
    </>
  );
};

export default App;
