import axios from "axios";

export const HttpClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

HttpClient.interceptors.response.use(
  (r) => r,
  (res) => {
    window.alert(res.response.data.message);
    return res;
  }
);
