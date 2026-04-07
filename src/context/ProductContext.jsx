import { createContext, useState, useEffect } from "react";
import {
  getProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../api/productApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsAPI();
      setProducts(data);
      setError(null);
    } catch {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const newProduct = await addProductAPI({
        ...product,
        price: Number(product.price),
      });
      setProducts([newProduct, ...products]);
    } catch {
      setError("Failed to add product");
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      // Ensure price is a number
      const productToUpdate = { ...updatedProduct, price: Number(updatedProduct.price) };

      // API call
      const product = await updateProductAPI(id, productToUpdate);

      // Merge returned product with old product to avoid losing fields
      setProducts(
        products.map((p) =>
          p.id === id ? { ...p, ...product } : p
        )
      );
    } catch {
      setError("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};