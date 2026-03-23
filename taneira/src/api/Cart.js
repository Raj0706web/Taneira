import API from "./axios";

export const getCart = () => API.get("/api/cart");

export const addCartItem = (data) => API.post("/api/cart", data);

export const removeCartItem = (payload) => API.delete("/api/cart", { data: payload });

export const applyCoupon = (code) =>
  API.post("/api/cart/apply-coupon", { code });
