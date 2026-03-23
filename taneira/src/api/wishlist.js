import API from "./axios";

export const getWishlist = () => API.get("/api/wishlist");
export const toggleWishlist = (productId) => API.post("/api/wishlist", { productId });
