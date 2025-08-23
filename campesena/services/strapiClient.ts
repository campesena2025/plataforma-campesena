import Strapi from "strapi-sdk-js";
import { getSession } from "next-auth/react";

import { StrapiClientOptions } from "@/types/strapi";

class StrapiClient {
  private readonly baseUrl: string;
  private apiToken?: string;

  constructor() {
    // The constructor cannot be async, so we need to initialize apiToken differently
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!this.baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is required in environment variables",
      );
    }
  }

  async initializeToken() {
    debugger;
    const session = await getSession();
    const token = (session?.user as any)?.jwt;

    if (token) {
      this.apiToken = token;
    }
  }

  /**
   * Crea una instancia del cliente Strapi
   */
  createClient(options: StrapiClientOptions = {}): Strapi {
    const config: { url: string; apiToken?: string } = {
      url: this.baseUrl,
    };

    if (options.requiresAuth || options.customToken) {
      const token = options.customToken || this.apiToken;

      if (!token) {
        throw new Error("Authentication required but no token available");
      }

      config.apiToken = token;
    }

    return new Strapi(config);
  }

  /**
   * Cliente público (sin autenticación)
   */
  get public(): Strapi {
    return this.createClient({ requiresAuth: false });
  }

  /**
   * Cliente autenticado
   */
  get authenticated(): Strapi {
    if (!this.hasToken()) {
      throw new Error("No API token available for authenticated requests");
    }

    return this.createClient({ requiresAuth: true });
  }

  /**
   * Crea un cliente con token personalizado
   */
  withToken(token: string): Strapi {
    if (!token) {
      throw new Error("Token is required");
    }

    return this.createClient({ customToken: token });
  }

  /**
   * Verifica si hay un token disponible
   */
  hasToken(): boolean {
    return !!this.apiToken;
  }

  /**
   * Obtiene la URL base
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Helper para manejar errores de manera consistente
   */
  handleError(error: any, context = "Strapi operation"): never {
    // eslint-disable-next-line no-console
    console.error(`${context}:`, error);

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.error?.message || "Unknown error";

      throw new Error(`${context} failed: ${status} - ${message}`);
    }

    throw new Error(`${context} failed: ${error.message}`);
  }
}

// Exportar como singleton
const strapiClientInstance = new StrapiClient();

// Initialize the token asynchronously after the instance is created
strapiClientInstance.initializeToken();

export default strapiClientInstance;
