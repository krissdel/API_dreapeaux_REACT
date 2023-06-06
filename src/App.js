import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/News" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
