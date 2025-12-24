import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const extractMedia = async (url: string) => {
  const response = await api.post("/api/extract", { url });
  return response.data;
};

export const getDownloadUrl = (url: string) => {
  // We use the proxy endpoint to avoid CORS and ensure headers are handled
  return `${API_BASE_URL}/api/download?url=${encodeURIComponent(url)}`;
};
