export interface DiagnosticAssociation {
  id: number;
  documentId: string;
  nombrePlantila: string;
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Intermedio" | "Final";
  observaciones: string;
  totalPuntaje: number;
  resultado: string;
  seccion_diagnosticos: SectionDiagnostic[];
}

export interface SectionDiagnostic {
  id: number;
  documentId: string;
  nombreSeccion: string;
  puntajeSeccion: number;
  respuesta_diagnosticos: ResponseDiagnostic[];
}

export interface ResponseDiagnostic {
  id: number;
  documentId: string;
  pregunta: Question;
  respuesta: string;
  valor: number;
}

export interface Question {
  id: number;
  documentId: string;
  pregunta: string;
  tipoPregunta: "Abierta" | "Cerrada" | "Multiple";
  seccion_diagnostico: {
    id: number;
    documentId: string;
    nombreSeccion: string;
    puntajeSeccion: number;
  };
}

export interface ScoreLevel {
  value: number;
  label: string;
  description: string;
  color: string;
}
