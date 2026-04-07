const BASE_URL = "https://dummyjson.com/products";

// Fetch all products
export const getProductsAPI = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.products;
};

// Fetch single product by ID
export const getProductByIdAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

// Add product
export const addProductAPI = async (product) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

// Update product
export const updateProductAPI = async (id, product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

// Delete product
export const deleteProductAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};