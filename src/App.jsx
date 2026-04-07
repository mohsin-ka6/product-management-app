import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <ProductProvider>
      <Router>
        <header>
          <nav className="container">
            <h1 style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
              Product App
            </h1>
            <div>
              <Link to="/">Home</Link>
              <Link to="/add">Add Product</Link>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;