import API from "./axios";

export const getMyOrders = () => API.get("/api/orders/my");
export const createOrder = (data) => API.post("/api/orders", data);
