import Strapi from "strapi-sdk-js";

export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const strapi = new Strapi({
    url: process.env.NEXT_PUBLIC_API_URL || "",
  });

  try {
    const response = await strapi.login({ identifier: email, password });

    return response as LoginResponse;
  } catch (error: any) {
    throw error.response || error;
  }
}
