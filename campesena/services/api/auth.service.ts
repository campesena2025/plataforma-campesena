import ApiClientOpen from "@/app/api/axios/apiClientOpen";
import { User }from "@/types/user";
export interface LoginResponse {
  jwt: string;
  user: User;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await ApiClientOpen.post("/api/auth/local", {
      identifier: email,
      password,
    });

    return response.data as LoginResponse;
  } catch (error: any) {
    throw error;
  }
}
