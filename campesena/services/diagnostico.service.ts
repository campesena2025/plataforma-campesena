import qs from "qs";

import { getSession } from "./auth";
import ApiClient from "@/app/api/axios/apiClient";

import { castDiagnosticoAsociaciontoRequest, DiagnosticoAsociacion, DiagnosticoAsociacionRequest, RespuestaDiagnosticoRequest, SeccionDiagnosticoRequest } from "@/types/diagnostico";

export const getDiagnosticoByDocumentIdAsociacion = async (
  documentId: string,
) => {
  try {
    const session = await getSession();

    if (!session) throw new Error("No session found");

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

    const response = await ApiClient.get(`/asociacions/${documentId}?${query}`);
    const diagnosticos = response.data.diagnostico_asociacions;
    if (!diagnosticos || diagnosticos.length === 0) {
      const diagnosticoGenerado = await generateDiagnosticoAsociacion(documentId);
      return diagnosticoGenerado;
    }

    return diagnosticos[0]; // Assuming you want the first one if multiple exist
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export const generateDiagnosticoAsociacion = async (
  documentIdAsociacion: string,
) => {
  try {
    const session = await getSession();

    if (!session) throw new Error("No session found");

    const query = qs.stringify(
      {
        populate: [
          "seccion_diagnosticos",
          "seccion_diagnosticos.criterio_evaluacions",
        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    // Assuming there's only one template or you want the first one
    const response = await ApiClient.get(`/diagnostico-plantillas?${query}`);

    const diagnosticoAsociacion: DiagnosticoAsociacionRequest = poblarDiagnosticoAsociacion(documentIdAsociacion, response.data);

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


    const response2 = await ApiClient.post(`/diagnostico-asociacions/${querydiagnostico}`, { data: diagnosticoAsociacion });

    return response2.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

function poblarDiagnosticoAsociacion(documentIdAsociacion: string, data: any): DiagnosticoAsociacionRequest { // Changed data: any to data: DiagnosticoPlantilla
  try {
    const diagnostico_asociacions: DiagnosticoAsociacionRequest = {
      nombrePlantila: data.data[0].attributes.nombrePlantilla, // Accessing the first template's name
      fechaAplicacion: new Date().toISOString(),
      tipoDiagnostico: "Inicial",
      observaciones: "",
      totalPuntaje: 0, // This will be calculated later
      resultado: "No evaluado",
      asociacion: documentIdAsociacion,
      seccion_diagnosticos: poblarSeccionesDiagnostico(data.data[0].attributes.seccion_diagnosticos.data) // Accessing sections from the first template
    };

    return diagnostico_asociacions;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}

function poblarSeccionesDiagnostico(seccionesData: any[]): SeccionDiagnosticoRequest[] {
  try {
    const seccion_diagnosticos: SeccionDiagnosticoRequest[] = seccionesData.map((seccion: any) => ({
      nombreSeccion: seccion.attributes.nombreSeccion,
      puntajeSeccion: 0, // This will be calculated later
      respuesta_diagnosticos: poblarRespuestasDiagnostico(seccion.attributes.criterio_evaluacions.data)
    }));
    return seccion_diagnosticos;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}

function poblarRespuestasDiagnostico(criteriosData: any[]): RespuestaDiagnosticoRequest[] {
  try {
    const respuesta_diagnosticos = criteriosData.map((criterio: any) => ({
      pregunta: criterio.attributes.textoPregunta,
      respuesta: "",
      valor: 0
    }));
    return respuesta_diagnosticos;
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
    const session = await getSession();

    if (!session) throw new Error("No session found");

    const diagnosticoRequest = castDiagnosticoAsociaciontoRequest(diagnostico, documentIdAsociacion);

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

    const response = await ApiClient.put(`/diagnostico-asociacions/${documentIdAsociacion}?${query}`, { data: diagnosticoRequest });
    //validar las 3 jerarquias de datos

    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}
