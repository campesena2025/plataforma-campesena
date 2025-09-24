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
  nombrePlantilla: string;
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Intermedio" | "Final";
  observaciones: string;
  totalPuntaje: number;
  resultado: string;
  asociacion: string | number;
  seccion_diagnosticos: SeccionDiagnosticoRequest[];
}

export interface SeccionDiagnosticoRequest {
  nombreSeccion: string;
  puntajeSeccion: number;
  respuesta_diagnosticos: RespuestaDiagnosticoRequest[];
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
    nombrePlantilla: diagnostico.nombrePlantila,
    fechaAplicacion: diagnostico.fechaAplicacion,
    tipoDiagnostico: diagnostico.tipoDiagnostico,
    observaciones: diagnostico.observaciones,
    totalPuntaje: diagnostico.totalPuntaje,
    resultado: diagnostico.resultado,
    asociacion: asociacionId,
    seccion_diagnosticos: diagnostico.seccion_diagnosticos.map((section) => ({
      nombreSeccion: section.nombreSeccion,
      puntajeSeccion: section.puntajeSeccion,
      respuesta_diagnosticos: section.respuesta_diagnosticos.map(
        (response) => ({
          pregunta: response.pregunta,
          respuesta: response.respuesta,
          valor: response.valor,
        }),
      ),
    })),
  };
}
