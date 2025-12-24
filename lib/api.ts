import axios from "axios";

// Use environment variable or fallback to production backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://smooth-vonnie-yashwalker-18f1a4df.koyeb.app";

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
