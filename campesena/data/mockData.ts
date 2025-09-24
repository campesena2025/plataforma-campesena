import { DiagnosticoAsociacion } from "@/types/diagnostico";

export const mockDiagnostic: DiagnosticoAsociacion = {
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
          pregunta:
            "¿La organización tiene una misión y visión claramente definidas?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 2,
          documentId: "resp-002",
          pregunta: "¿Existe un consejo directivo activo y comprometido?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 3,
          documentId: "resp-003",
          pregunta:
            "¿Se realizan reuniones periódicas de seguimiento a la gestión?",
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
          pregunta:
            "¿La organización cuenta con estados financieros auditados?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 5,
          documentId: "resp-005",
          pregunta:
            "¿Existe un presupuesto anual y se hace seguimiento mensual?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 6,
          documentId: "resp-006",
          pregunta:
            "¿Se diversifican las fuentes de ingresos de la organización?",
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
          pregunta:
            "¿Los procesos operativos están documentados y son conocidos por el equipo?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 8,
          documentId: "resp-008",
          pregunta:
            "¿Se utilizan indicadores para medir la eficiencia de las operaciones?",
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
          pregunta:
            "¿La organización tiene una estructura organizacional clara?",
          respuesta: "",
          valor: 0,
        },
        {
          id: 10,
          documentId: "resp-010",
          pregunta:
            "¿Se realizan evaluaciones de desempeño periódicas al personal?",
          respuesta: "",
          valor: 0,
        },
      ],
    },
  ],
};
