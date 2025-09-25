export interface DiagnosticoAsociacion {
  id: number;
  documentId: string;
  nombrePlantila: string;
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Intermedio" | "Final";
  observaciones: string;
  totalPuntaje: number;
  resultado: string;
  seccion_diagnosticos: SeccionDiagnostico[];
}

export interface SeccionDiagnostico {
  id: number;
  documentId: string;
  nombreSeccion: string;
  puntajeSeccion: number;
  respuesta_diagnosticos: RespuestaDiagnostico[];
}

export interface RespuestaDiagnostico {
  id: number;
  documentId: string;
  pregunta: string;
  respuesta: string;
  valor: number;
}

export interface DiagnosticoAsociacionRequest {
  nombrePlantila: string;
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Intermedio" | "Final";
  observaciones: string;
  totalPuntaje: number;
  resultado: string;
  asociacion: string | number;
  seccion_diagnosticos: string[] | number[] | SeccionDiagnosticoRequest[];
}

export interface SeccionDiagnosticoRequest {
  nombreSeccion: string;
  puntajeSeccion: number;
  respuesta_diagnosticos: string[] | number[] | RespuestaDiagnosticoRequest[];
}

export interface RespuestaDiagnosticoRequest {
  pregunta: string;
  respuesta: string;
  valor: number;
}

export function castDiagnosticoAsociaciontoRequest(
  diagnostico: DiagnosticoAsociacion,
  asociacionId: string | number,
): DiagnosticoAsociacionRequest {
  return {
    nombrePlantila: diagnostico.nombrePlantila,
    fechaAplicacion: diagnostico.fechaAplicacion,
    tipoDiagnostico: diagnostico.tipoDiagnostico,
    observaciones: diagnostico.observaciones,
    totalPuntaje: diagnostico.totalPuntaje,
    resultado: diagnostico.resultado,
    asociacion: asociacionId,
    seccion_diagnosticos: diagnostico.seccion_diagnosticos.map((section) => ({
      id: section.id,
      documentId: section.documentId,
      nombreSeccion: section.nombreSeccion,
      puntajeSeccion: section.puntajeSeccion,
      respuesta_diagnosticos: section.respuesta_diagnosticos.map(
        (response) => ({
          id: response.id,
          documentId: response.documentId,
          pregunta: response.pregunta,
          respuesta: response.respuesta,
          valor: response.valor,
        }),
      ),
    })),
  };
}
