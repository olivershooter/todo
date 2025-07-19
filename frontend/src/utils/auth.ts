import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;

  if (decoded.exp! < now) {
    return await refreshToken();
  }

  return true;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  try {
    const res = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
};
