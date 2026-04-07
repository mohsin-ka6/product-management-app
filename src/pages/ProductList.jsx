import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, loading, error, searchTerm, setSearchTerm, deleteProduct } =
    useContext(ProductContext);
  const navigate = useNavigate();

  if (loading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">{error}</p>;

  return (
    <div className="container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.title}
            </h3>
            <p>${product.price}</p>
            <button className="edit" onClick={() => navigate(`/edit/${product.id}`)}>
              Edit
            </button>
            <button
              className="delete"
              onClick={() => {
                if (confirm("Are you sure you want to delete this product?"))
                  deleteProduct(product.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;