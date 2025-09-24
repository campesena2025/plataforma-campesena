import React from "react";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

import ProgressBar from "./ProgressBar";

import { DiagnosticoAsociacion } from "@/types/diagnostico";
import { getScoreColor } from "@/utils/scoreUtils";

interface ResultsPanelProps {
  diagnostic: DiagnosticoAsociacion;
  maxPossibleScore: number;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  diagnostic,
  maxPossibleScore,
}) => {
  const percentage =
    maxPossibleScore > 0
      ? (diagnostic.totalPuntaje / maxPossibleScore) * 100
      : 0;

  const getResultIcon = () => {
    if (percentage >= 85)
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    if (percentage >= 70)
      return <TrendingUp className="h-8 w-8 text-blue-500" />;
    if (percentage >= 50)
      return <AlertTriangle className="h-8 w-8 text-yellow-500" />;

    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  const getRecommendations = () => {
    if (percentage >= 85) {
      return [
        "Mantenga las buenas prácticas implementadas",
        "Considere compartir experiencias con otras organizaciones",
        "Establezca procesos de mejora continua",
        "Implemente sistemas de monitoreo y evaluación",
      ];
    } else if (percentage >= 70) {
      return [
        "Refuerce las áreas que obtuvieron menor puntuación",
        "Desarrolle planes de mejora específicos",
        "Capacite al personal en áreas identificadas",
        "Establezca indicadores de seguimiento",
      ];
    } else if (percentage >= 50) {
      return [
        "Priorice las áreas críticas para intervención inmediata",
        "Busque asesoría técnica especializada",
        "Implemente un plan de fortalecimiento organizacional",
        "Considere alianzas estratégicas para el desarrollo",
      ];
    } else {
      return [
        "Requiere intervención urgente en todas las áreas",
        "Busque acompañamiento técnico especializado",
        "Desarrolle un plan de fortalecimiento integral",
        "Considere reestructuración organizacional",
      ];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">{getResultIcon()}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Resultado del Diagnóstico
        </h2>
        <p className="text-gray-600">
          Evaluación completada el{" "}
          {new Date(diagnostic.fechaAplicacion).toLocaleDateString()}
        </p>
      </div>

      {/* Score Overview */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <div
            className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}
          >
            {diagnostic.totalPuntaje} / {maxPossibleScore}
          </div>
          <div
            className={`text-2xl font-semibold ${getScoreColor(percentage)}`}
          >
            {Math.round(percentage)}%
          </div>
        </div>
        <ProgressBar
          current={diagnostic.totalPuntaje}
          size="lg"
          total={maxPossibleScore}
        />
      </div>

      {/* Result Description */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Interpretación</h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {diagnostic.resultado}
        </p>
      </div>

      {/* Section Breakdown */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Detalle por Secciones
        </h3>
        <div className="space-y-4">
          {diagnostic.seccion_diagnosticos.map((section) => {
            const sectionMaxScore = section.respuesta_diagnosticos.length * 2;
            const sectionPercentage =
              sectionMaxScore > 0
                ? (section.puntajeSeccion / sectionMaxScore) * 100
                : 0;

            return (
              <div key={section.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {section.nombreSeccion}
                  </h4>
                  <span
                    className={`font-bold ${getScoreColor(sectionPercentage)}`}
                  >
                    {section.puntajeSeccion} / {sectionMaxScore} (
                    {Math.round(sectionPercentage)}%)
                  </span>
                </div>
                <ProgressBar
                  current={section.puntajeSeccion}
                  showPercentage={false}
                  size="sm"
                  total={sectionMaxScore}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recomendaciones
        </h3>
        <ul className="space-y-2">
          {getRecommendations().map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsPanel;
