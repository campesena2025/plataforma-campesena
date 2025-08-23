import api, { withAuth } from "./api/axios-interceptor";

const getAllGeografia = async () => {


  const response = await api.get("Departamentos");

  const data = response.data;

  return data;
};

export default getAllGeografia;
