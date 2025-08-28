import Strapi from "strapi-sdk-js";

import api from "./api/axios-interceptor";
import ApiClientOpen from "@/app/api/axios/apiClientOpen";

const getAllGeografia = async () => {
//   const strapi = new Strapi({
//     url: process.env.NEXT_PUBLIC_API_URL || "",
//   });

//   const response1 = await strapi.find("departamentos", {
//     fields: ["documentId", "nombre"],
//     populate: {
//       municipios: {
//         fields: ["documentId", "nombre"],
//         populate: {
//           veredas: {
//             fields: "*",
//         },
//       },
//     },
//   }
// });

//   const data = response1.data;

  const response = await ApiClientOpen.get(
    "api/departamentos?populate=municipios.veredas",
  );

  return response.data;
};

export const getAllMunicipios = async () => {
  const response = await api.get("api/municipios");

  const data = response.data;

  return data;
};

export const getAllVeredas = async () => {
  const response = await api.get("api/veredas");

  const data = response.data;

  return data;
};

export default getAllGeografia;
