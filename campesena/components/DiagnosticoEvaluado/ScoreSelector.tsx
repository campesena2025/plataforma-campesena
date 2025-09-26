import React from 'react';

import { useDiagnosticStore } from '@/store/diagnostico.store';
import { scoreLevels } from '@/utils/scoreUtils';

interface ScoreSelectorProps {
	questionId: number;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({ questionId }) => {
	const { diagnostic, updateResponse, updateResponseHallazgos } = useDiagnosticStore();

	const response = diagnostic?.seccion_diagnosticos
		.flatMap((s) => s.respuesta_diagnosticos)
		.find((r) => r.id === questionId);

	if (!response) {
		return <div>Respuesta no encontrada</div>;
	}

	const scoreListener = (score: number) => {
		updateResponse(questionId, score);
	};

	return (
		<div className="space-y-2">
			<div className="text-s font-medium text-gray-700 mb-1">
				Seleccione su evaluación: Cumplimiento: {response.cumplimiento !== undefined ? response.cumplimiento : 0}
			</div>
			<div className="grid grid-cols-3 gap-2">
				{scoreLevels.map((level) => (
					<button
						key={`${questionId}-${level.value}`}
						className={`p-2 rounded-md border-2 transition-all duration-200 hover:shadow-sm ${
							response.puntaje === level.value
								? level.color
								: 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
						}`}
						onClick={() => scoreListener(level.value)}
					>
						<div className="text-center">
							<div className="text-base font-bold">{level.value}</div>
							<div className="text-xs font-medium">{level.label}</div>
							<div className="text-xs opacity-80 leading-tight mt-1">{level.description}</div>
						</div>
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 gap-2">
				<textarea
					className="w-full border border-gray-300 rounded-md p-2"
					placeholder="Notas sobre la respuesta..."
					value={response.hallazgos || ''}
					onChange={(e) => updateResponseHallazgos(questionId, e.target.value)}
				/>
			</div>
		</div>
	);
};

export default ScoreSelector;
