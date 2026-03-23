import API from "./axios";

export const getProducts = () => API.get("/api/products");
