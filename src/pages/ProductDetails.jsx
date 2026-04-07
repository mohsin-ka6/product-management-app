import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdAPI } from "../api/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductByIdAPI(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="container">Loading...</p>;
  if (!product) return <p className="container">Product not found</p>;

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ maxWidth: "300px" }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
    </div>
  );
};

export default ProductDetails;