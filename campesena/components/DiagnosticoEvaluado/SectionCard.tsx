import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import ProgressBar from "./ProgressBar";
import ScoreSelector from "./ScoreSelector";

import { SeccionDiagnostico } from "@/types/diagnostico";

interface SectionCardProps {
  section: SeccionDiagnostico;
  onResponseChange: (responseId: number, value: number | null) => void;
  onResponseHallazgosChange: (responseId: number, hallazgos: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  readOnly?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  onResponseChange,
  onResponseHallazgosChange,
  isExpanded = false,
  onToggleExpand,
}) => {
  const maxSectionScore = section.respuesta_diagnosticos.length * 2;
  const completedQuestions = section.respuesta_diagnosticos.filter(
    (r) => r.puntaje !== null,
  ).length;

  const responseChangeListener = (responseId: number, value: number | null) => {
    onResponseChange(responseId, value);
    section.respuesta_diagnosticos.find((r) => r.id === responseId)!.puntaje =
      value;
    section.puntajeSeccion = section.respuesta_diagnosticos.reduce(
      (sum, response) => sum + (response.puntaje ?? 0),
      0,
    );
  };

  const onResponseHallazgosChangeListener = (
    responseId: number,
    hallazgos: string,
  ) => {
    onResponseHallazgosChange(responseId, hallazgos);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        aria-expanded={isExpanded}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 w-full text-left hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200"
        type="button"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {section.nombreSeccion}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Preguntas completadas: {completedQuestions} /{" "}
                {section.respuesta_diagnosticos.length}
              </div>
              <div className="text-lg font-semibold text-blue-600">
                {section.puntajeSeccion} / {maxSectionScore} puntos
              </div>
            </div>
            <div className="mt-3 w-full max-w-md">
              <ProgressBar
                current={section.puntajeSeccion}
                size="sm"
                total={maxSectionScore}
              />
            </div>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronRight className="h-6 w-6 text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {section.respuesta_diagnosticos.map((response, index) => (
            <div
              key={response.id}
              className="border-l-3 border-blue-200 pl-4 py-2"
            >
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-medium text-gray-800 leading-snug pr-2">
                    {index + 1}. {response.pregunta}
                  </h4>
                </div>

                <ScoreSelector
                  hallazgos={response.hallazgos}
                  questionId={response.id}
                  selectedScore={response.puntaje}
                  onHallazgosChange={(value) =>
                    onResponseHallazgosChangeListener(response.id, value)
                  }
                  onScoreChange={(value) =>
                    responseChangeListener(response.id, value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionCard;
