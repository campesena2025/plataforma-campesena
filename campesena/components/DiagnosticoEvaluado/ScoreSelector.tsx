import React from "react";

import { scoreLevels } from "@/utils/scoreUtils";

interface ScoreSelectorProps {
  selectedScore: number;
  onScoreChange: (score: number) => void;
  questionId: number;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({
  selectedScore,
  onScoreChange,
  questionId,
}) => {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-700 mb-1">
        Seleccione su evaluación:
      </div>
      <div className="grid grid-cols-3 gap-2">
        {scoreLevels.map((level) => (
          <button
            key={`${questionId}-${level.value}`}
            className={`p-2 rounded-md border-2 transition-all duration-200 hover:shadow-sm ${
              selectedScore === level.value
                ? level.color
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onScoreChange(level.value)}
          >
            <div className="text-center">
              <div className="text-base font-bold">{level.value}</div>
              <div className="text-xs font-medium">{level.label}</div>
              <div className="text-xs opacity-80 leading-tight mt-1">
                {level.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScoreSelector;
