import axios, { type AxiosError } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const ApiClientOpen = axios.create({
  baseURL: apiUrl,
});

ApiClientOpen.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = `Application/json`;

    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

ApiClientOpen.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorCustom = handleStrapiError(error);

    return await Promise.reject(errorCustom);
  },
);
// End of Response interceptor
interface ValidationError {
  path: string[];
  message: string;
  name: string;
}

interface ValidationErrorResponse {
  status: number;

  error: {
    message: string;
    name: string;
    status: number;
    details: {
      errors: ValidationError[];
    };
  };
}

function handleStrapiError(error: AxiosError): string {
  let errorMessage = "Error desconocido";

  if (error.response) {
    const { status, data } = error.response;
    const validationError = data as ValidationErrorResponse;

    switch (status) {
      case 400:
        errorMessage = "Error de validación";
        if (validationError.error.details && validationError.error.details) {
          const errors = validationError.error.details.errors.map((error) => {
            if (error.message === "This attribute must be unique") {
              return (
                "ya existe un registro con el dato(s) de " +
                error.path.join(" ") +
                " en el sistema"
              );
            }

            return error.message;
          });

          errorMessage += ": " + errors.join(", ");
        }
        break;
      case 403:
        errorMessage = "Permiso denegado";
        break;
      case 404:
        errorMessage = "Recurso no encontrado";
        break;
      case 500:
        errorMessage = "Error interno del servidor";
        break;
      default:
        break;
    }
  } else if (error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
}

export default ApiClientOpen;
