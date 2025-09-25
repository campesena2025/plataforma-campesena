import React, { useState, useEffect } from "react";
import { ClipboardList, BarChart3, FileCheck, Calendar } from "lucide-react";
import { getResultByScore } from "@/utils/scoreUtils";
import SectionCard from "./SectionCard";
import ResultsPanel from "./ResultsPanel";
import ProgressBar from "./ProgressBar";
import { DiagnosticoAsociacion, SeccionDiagnostico } from "@/types/diagnostico";
import { mockDiagnostic } from "@/data/mockData";

function DiagnosticoEvaluado() {
  const [diagnostic, setDiagnostic] =
    useState<DiagnosticoAsociacion>(mockDiagnostic);
  const [expandedSection, setExpandedSection] = useState<number>(1);
  const [showResults, setShowResults] = useState(false);

  // Calculate totals
  const maxPossibleScore = diagnostic.seccion_diagnosticos.reduce(
    (total, section) => total + section.respuesta_diagnosticos.length * 2,
    0,
  );

  const totalAnsweredQuestions = diagnostic.seccion_diagnosticos.reduce(
    (total, section) =>
      total + section.respuesta_diagnosticos.filter((r) => r.valor > 0).length,
    0,
  );

  const totalQuestions = diagnostic.seccion_diagnosticos.reduce(
    (total, section) => total + section.respuesta_diagnosticos.length,
    0,
  );

  // Update scores when responses change
  useEffect(() => {
    setDiagnostic((prev) => {
      const updated = { ...prev };

      // Update section scores
      updated.seccion_diagnosticos = updated.seccion_diagnosticos.map(
        (section) => ({
          ...section,
          puntajeSeccion: section.respuesta_diagnosticos.reduce(
            (sum, response) => sum + response.valor,
            0,
          ),
        }),
      );

      // Update total score
      updated.totalPuntaje = updated.seccion_diagnosticos.reduce(
        (sum, section) => sum + section.puntajeSeccion,
        0,
      );

      // Update result
      updated.resultado = getResultByScore(
        updated.totalPuntaje,
        maxPossibleScore,
      );

      return updated;
    });
  }, [maxPossibleScore]);

  const handleResponseChange = (responseId: number, value: number) => {
    setDiagnostic((prev) => ({
      ...prev,
      seccion_diagnosticos: prev.seccion_diagnosticos.map((section) => ({
        ...section,
        respuesta_diagnosticos: section.respuesta_diagnosticos.map(
          (response) =>
            response.id === responseId
              ? { ...response, valor: value }
              : response,
        ),
      })),
    }));
  };

  const handleToggleSection = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? 0 : sectionId);
  };

  const isComplete = totalAnsweredQuestions === totalQuestions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ClipboardList className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {diagnostic.nombrePlantila}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(
                        diagnostic.fechaAplicacion,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileCheck className="h-4 w-4" />
                    <span>Tipo: {diagnostic.tipoDiagnostico}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowResults(!showResults)}
                disabled={!isComplete}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  isComplete
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>
                  {showResults ? "Ver Diagnóstico" : "Ver Resultados"}
                </span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso del Diagnóstico</span>
              <span>
                {totalAnsweredQuestions} de {totalQuestions} preguntas
                respondidas
              </span>
            </div>
            <ProgressBar
              current={totalAnsweredQuestions}
              total={totalQuestions}
              showPercentage={false}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showResults && isComplete ? (
          <ResultsPanel
            diagnostic={diagnostic}
            maxPossibleScore={maxPossibleScore}
          />
        ) : (
          <div className="space-y-8">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Instrucciones para el Diagnóstico
              </h2>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Lea cada pregunta cuidadosamente antes de responder</li>
                <li>
                  • Seleccione el puntaje que mejor refleje la situación actual
                  de su organización
                </li>
                <li>
                  • 0: Deficiente - No cumple o cumple de manera muy limitada
                </li>
                <li>• 1: Regular - Cumple parcialmente o necesita mejoras</li>
                <li>
                  • 2: Excelente - Cumple completamente y de manera óptima
                </li>
                <li>
                  • Complete todas las preguntas para acceder a los resultados
                </li>
              </ul>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {diagnostic.seccion_diagnosticos.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onResponseChange={handleResponseChange}
                  isExpanded={expandedSection === section.id}
                  onToggleExpand={() => handleToggleSection(section.id)}
                />
              ))}
            </div>

            {/* Completion Message */}
            {isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <FileCheck className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ¡Diagnóstico Completado!
                </h3>
                <p className="text-green-700 mb-4">
                  Has respondido todas las preguntas. Ahora puedes ver los
                  resultados y recomendaciones.
                </p>
                <button
                  onClick={() => setShowResults(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Ver Resultados del Diagnóstico
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosticoEvaluado;
