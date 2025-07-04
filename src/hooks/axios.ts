import axios from "axios";

export const authenticatedAxios = axios.create({
  baseURL: "http://localhost:9200",
  headers: { "Content-Type": "application/json" },
});
