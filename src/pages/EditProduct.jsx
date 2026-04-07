import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { getProductByIdAPI } from "../api/productApi";

const EditProduct = () => {
  const { id } = useParams();
  const { updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", price: "", thumbnail: "" });

  // Fetch product by ID and pre-fill the form
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductByIdAPI(id);
      setForm({
        title: product.title || "",
        price: product.price || "",
        thumbnail: product.thumbnail || "",
      });
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert price to number before sending
    const updatedData = { ...form, price: Number(form.price) };
    updateProduct(id, updatedData);

    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;