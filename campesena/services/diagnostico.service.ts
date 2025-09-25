import qs from "qs";

import { getSession } from "./auth";

import ApiClient from "@/app/api/axios/apiClient";
import {
  castDiagnosticoAsociaciontoRequest,
  DiagnosticoAsociacion,
  DiagnosticoAsociacionRequest,
} from "@/types/diagnostico";

export const getDiagnosticoByDocumentIdAsociacion = async (
  documentId: string,
) => {
  try {
    const session = getSession();

    if (!session) throw new Error("No session found");

    // Add validation for documentId
    if (!documentId) {
      throw new Error("Document ID is required");
    }

    const query = qs.stringify(
      {
        populate: [
          "diagnostico_asociacions",
          "diagnostico_asociacions.seccion_diagnosticos",
          "diagnostico_asociacions.seccion_diagnosticos.respuesta_diagnosticos",
        ],
      },
      {
        encodeValuesOnly: true,
      },
    );

    // Log the full URL to debug
    console.log(`Requesting: /asociacions/${documentId}?${query}`);

    const response = await ApiClient.get(`/asociacions/${documentId}?${query}`);

    // Add validation for response
    if (!response.data) {
      throw new Error("No data received from API");
    }

    const diagnosticos = response.data.diagnostico_asociacions;

    if (!diagnosticos || diagnosticos.length === 0) {
      const diagnosticoGenerado =
        await generateDiagnosticoAsociacion(documentId);

      return diagnosticoGenerado;
    }

    return diagnosticos[0]; // Assuming you want the first one if multiple exist
  } catch (error: any) {
    // Improve error handling
    const errorMessage =
      error.response?.data?.error || error.message || "Unknown error";

    console.error(
      "Error in getDiagnosticoByDocumentIdAsociacion:",
      errorMessage,
    );
    throw new Error(`Failed to fetch diagnostico: ${errorMessage}`);
  }
};

export const generateDiagnosticoAsociacion = async (
  documentIdAsociacion: string,
) => {
  try {
    debugger;
    const session = getSession();

    if (!session) throw new Error("No session found");

    const query = qs.stringify(
      {
        populate: ["seccion_planillas", "seccion_planillas.pregunta_seccions"],
      },
      {
        encodeValuesOnly: true,
      },
    );
    // Assuming there's only one template or you want the first one
    const response = await ApiClient.get(`/diagnostico-plantillas?${query}`);

    const diagnosticoAsociacion: DiagnosticoAsociacionRequest =
      await poblarDiagnosticoAsociacion(documentIdAsociacion, response.data);

    const querydiagnostico = qs.stringify(
      {
        populate: [
          "seccion_diagnosticos",
          "seccion_diagnosticos.respuesta_diagnosticos",
        ],
      },
      {
        encodeValuesOnly: true,
      },
    );

    const response2 = await ApiClient.post(
      `/diagnostico-asociacions/${querydiagnostico}`,
      { data: diagnosticoAsociacion },
    );

    return response2.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

async function poblarDiagnosticoAsociacion(
  documentIdAsociacion: string,
  data: any,
): Promise<DiagnosticoAsociacionRequest> {
  try {
    const nombrePlantilla = data.data[0].nombrePlantilla;
    const diagnostico_asociacions: DiagnosticoAsociacionRequest = {
      nombrePlantila: nombrePlantilla,
      fechaAplicacion: new Date().toISOString(),
      tipoDiagnostico: "Inicial",
      observaciones: "",
      totalPuntaje: 0,
      resultado: "No evaluado",
      asociacion: documentIdAsociacion,
      seccion_diagnosticos: await poblarSeccionesDiagnostico(
        data.data[0].seccion_planillas,
      ),
    };

    return diagnostico_asociacions;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}

async function poblarSeccionesDiagnostico(
  seccionesData: any[],
): Promise<number[]> {
  const codigos: number[] = [];

  try {
    for (let i = 0; i < seccionesData.length; i++) {
      const datapost = {
        nombreSeccion: seccionesData[i].nombreSeccion,
        puntajeSeccion: 0, // This will be calculated later
        respuesta_diagnosticos: await poblarRespuestasDiagnostico(
          seccionesData[i].pregunta_seccions,
        ),
      };

      const response = await ApiClient.post("/seccion-diagnosticos", {
        data: datapost,
      });

      codigos.push(response.data.data.id);
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }

  return codigos;
}

async function poblarRespuestasDiagnostico(
  criteriosData: any[],
): Promise<number[]> {
  const codigos: number[] = [];

  try {
    for (let i = 0; i < criteriosData.length; i++) {
      const respuestaPost = {
        textoPregunta: criteriosData[i].textoPregunta,
        puntaje: 0,
        hallazgos: "",
      };

      const response = await ApiClient.post("/respuesta-diagnosticos", {
        data: respuestaPost,
      });

      debugger;
      codigos.push(response.data.data.id);
    }

    return codigos;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}

export const saveDiagnosticoAsociacion = async (
  documentIdAsociacion: string,
  diagnostico: DiagnosticoAsociacion,
) => {
  try {
    const session = getSession();

    if (!session) throw new Error("No session found");

    const diagnosticoRequest = castDiagnosticoAsociaciontoRequest(
      diagnostico,
      documentIdAsociacion,
    );

    const query = qs.stringify(
      {
        populate: [
          "seccion_diagnosticos",
          "seccion_diagnosticos.respuesta_diagnosticos",
        ],
      },
      {
        encodeValuesOnly: true,
      },
    );

    const response = await ApiClient.put(
      `/diagnostico-asociacions/${documentIdAsociacion}?${query}`,
      { data: diagnosticoRequest },
    );
    //validar las 3 jerarquias de datos

    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};
