import type { Pie } from "../types";

const API_BASE = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchPies = async (): Promise<Pie[]> => {
  const response = await fetch(`${API_BASE}/pies`);
  if (!response.ok) throw new Error("Failed to fetch pies");
  return response.json();
};

export const createPie = async (pie: Omit<Pie, "id">): Promise<Pie> => {
  //call await fetch assign to var response
  const response = await fetch(`${API_BASE}/pies`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(pie),
  });
  //check if response is not ok
  if (!response.ok) throw new Error("Failed to create pie");
  //return response json
  return response.json();
};
