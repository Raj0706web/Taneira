export const getUser = () => {
  const user = localStorage.getItem("user");
  return user && user !== "undefined" ? JSON.parse(user) : null;
};

export const getToken = () => {
  const user = getUser();
  return user?.token || null;
};

export const logout = () => {
  localStorage.removeItem("user");
};
