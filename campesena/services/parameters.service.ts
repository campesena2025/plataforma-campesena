import api from "./api/axios-interceptor";

export const getParametes = async () => {
  const response = await api.get("/parameters");

  return response.data;
};
