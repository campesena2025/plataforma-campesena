import { DiagnosticAssociation } from "@/types/diagnostico";

export const mockDiagnostic: DiagnosticAssociation = {
  id: 1,
  documentId: "diag-001",
  nombrePlantila: "Diagnóstico Organizacional Integral",
  fechaAplicacion: new Date().toISOString(),
  tipoDiagnostico: "Inicial",
  observaciones: "",
  totalPuntaje: 0,
  resultado: "",
  seccion_diagnosticos: [
    {
      id: 1,
      documentId: "sec-001",
      nombreSeccion: "Liderazgo y Gobernanza",
      puntajeSeccion: 0,
      respuesta_diagnosticos: [
        {
          id: 1,
          documentId: "resp-001",
          pregunta: {
            id: 1,
            documentId: "preg-001",
            pregunta:
              "¿La organización cuenta con un liderazgo claro y definido?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 1,
              documentId: "sec-001",
              nombreSeccion: "Liderazgo y Gobernanza",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 2,
          documentId: "resp-002",
          pregunta: {
            id: 2,
            documentId: "preg-002",
            pregunta: "¿Existe un plan estratégico actualizado y socializado?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 1,
              documentId: "sec-001",
              nombreSeccion: "Liderazgo y Gobernanza",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 3,
          documentId: "resp-003",
          pregunta: {
            id: 3,
            documentId: "preg-003",
            pregunta:
              "¿La junta directiva se reúne regularmente y toma decisiones efectivas?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 1,
              documentId: "sec-001",
              nombreSeccion: "Liderazgo y Gobernanza",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
      ],
    },
    {
      id: 2,
      documentId: "sec-002",
      nombreSeccion: "Gestión Financiera",
      puntajeSeccion: 0,
      respuesta_diagnosticos: [
        {
          id: 4,
          documentId: "resp-004",
          pregunta: {
            id: 4,
            documentId: "preg-004",
            pregunta:
              "¿La organización tiene registros financieros ordenados y actualizados?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 2,
              documentId: "sec-002",
              nombreSeccion: "Gestión Financiera",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 5,
          documentId: "resp-005",
          pregunta: {
            id: 5,
            documentId: "preg-005",
            pregunta:
              "¿Existe un presupuesto anual y se hace seguimiento mensual?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 2,
              documentId: "sec-002",
              nombreSeccion: "Gestión Financiera",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 6,
          documentId: "resp-006",
          pregunta: {
            id: 6,
            documentId: "preg-006",
            pregunta:
              "¿Se generan informes financieros periódicos para la toma de decisiones?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 2,
              documentId: "sec-002",
              nombreSeccion: "Gestión Financiera",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
      ],
    },
    {
      id: 3,
      documentId: "sec-003",
      nombreSeccion: "Operaciones y Procesos",
      puntajeSeccion: 0,
      respuesta_diagnosticos: [
        {
          id: 7,
          documentId: "resp-007",
          pregunta: {
            id: 7,
            documentId: "preg-007",
            pregunta:
              "¿Los procesos operativos están documentados y son eficientes?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 3,
              documentId: "sec-003",
              nombreSeccion: "Operaciones y Procesos",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 8,
          documentId: "resp-008",
          pregunta: {
            id: 8,
            documentId: "preg-008",
            pregunta: "¿Existe un sistema de gestión de calidad implementado?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 3,
              documentId: "sec-003",
              nombreSeccion: "Operaciones y Procesos",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
      ],
    },
    {
      id: 4,
      documentId: "sec-004",
      nombreSeccion: "Talento Humano",
      puntajeSeccion: 0,
      respuesta_diagnosticos: [
        {
          id: 9,
          documentId: "resp-009",
          pregunta: {
            id: 9,
            documentId: "preg-009",
            pregunta:
              "¿El personal cuenta con las competencias necesarias para sus funciones?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 4,
              documentId: "sec-004",
              nombreSeccion: "Talento Humano",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
        {
          id: 10,
          documentId: "resp-010",
          pregunta: {
            id: 10,
            documentId: "preg-010",
            pregunta:
              "¿Existe un programa de capacitación y desarrollo del personal?",
            tipoPregunta: "Cerrada",
            seccion_diagnostico: {
              id: 4,
              documentId: "sec-004",
              nombreSeccion: "Talento Humano",
              puntajeSeccion: 0,
            },
          },
          respuesta: "",
          valor: 0,
        },
      ],
    },
  ],
};
