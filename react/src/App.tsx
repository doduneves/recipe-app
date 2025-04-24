import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import RecipeDetailPage from "./pages/RecipeDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
