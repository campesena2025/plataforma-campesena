import api, { withAuth } from "./axios-interceptor";

export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export async function loginStrapi(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await api.post(
      "/api/auth/local",
      {
        identifier: email,
        password,
      },
      withAuth({}, false),
    );

    if (typeof window !== "undefined" && response.data?.jwt) {
      localStorage.setItem("token", response.data.jwt);
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}
