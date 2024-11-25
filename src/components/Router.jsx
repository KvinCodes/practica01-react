import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import AboutUs from "./views/AboutUs";
import Contact from "./views/Contact";
import Catalog from "./views/Catalog";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  );
};

export default Router;