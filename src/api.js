import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});



export const login = async (username, password) => {
  const response = await api.post("/api/token/", {
    username,
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};


export const getProfile = async () => {
  const access = localStorage.getItem("access");

  const response = await api.get("/api/profile/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return response.data;
};


export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  const response = await api.post("/api/token/refresh/", {
    refresh: refresh,
  });

  localStorage.setItem("access", response.data.access);

  return response.data.access;
};



export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};