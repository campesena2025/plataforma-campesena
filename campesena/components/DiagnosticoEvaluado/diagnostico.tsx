import React, { useEffect } from 'react';
import { ClipboardList, BarChart3, FileCheck, Calendar, Save } from 'lucide-react';

import ProgressBar from './ProgressBar';
import ResultsPanel from './ResultsPanel';
import SectionCard from './SectionCard';

import { useDiagnosticStore } from '@/store/diagnostico.store';
import { DiagnosticoAsociacion } from '@/types/diagnostico';

interface DiagnosticoProps {
	diagnostico: DiagnosticoAsociacion;
	loading: boolean;
	onSave: (updatedDiagnostico: DiagnosticoAsociacion) => Promise<void>;
}

function Diagnostico({ diagnostico: initialDiagnostico, loading, onSave }: DiagnosticoProps) {
	const {
		diagnostic,
		setDiagnostic,
		toggleSection,
		expandedSection,
		setShowResults,
		showResults,
		saveDiagnostic,
		getCompletedQuestions,
		getTotalQuestions,
		getMaxPossibleScore,
	} = useDiagnosticStore();

	useEffect(() => {
		setDiagnostic(initialDiagnostico);
	}, [initialDiagnostico]);

	const handleSave = async () => {
		if (diagnostic) {
			await saveDiagnostic(diagnostic.documentId);
			onSave(diagnostic); // Call the original onSave prop after saving to store
		}
	};

	const totalAnsweredQuestions = getCompletedQuestions();
	const totalQuestions = getTotalQuestions();
	const maxPossibleScore = getMaxPossibleScore();
	const isComplete = totalAnsweredQuestions === totalQuestions;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="bg-blue-100 p-3 rounded-lg">
								<ClipboardList className="h-8 w-8 text-blue-600" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">{diagnostic?.nombrePlantila}</h1>
								<div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
									<div className="flex items-center space-x-1">
										<Calendar className="h-4 w-4" />
										<span>{diagnostic && new Date(diagnostic.fechaAplicacion).toLocaleDateString()}</span>
									</div>
									<div className="flex items-center space-x-1">
										<FileCheck className="h-4 w-4" />
										<span>Tipo: {diagnostic?.tipoDiagnostico}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							<button
								className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
									isComplete
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-gray-200 text-gray-500 cursor-not-allowed'
								}`}
								disabled={!isComplete}
								onClick={() => setShowResults(!showResults)}
							>
								<BarChart3 className="h-4 w-4" />
								<span>{showResults ? 'Ver Diagnóstico' : 'Ver Resultados'}</span>
							</button>
							<button
								className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
								disabled={loading}
								onClick={handleSave}
							>
								<Save className="h-4 w-4" />
								<span>{loading ? 'Guardando...' : 'Guardar'}</span>
							</button>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="mt-6">
						<div className="flex justify-between text-sm text-gray-600 mb-2">
							<span>Progreso del Diagnóstico</span>
							<span>
								{totalAnsweredQuestions} de {totalQuestions} preguntas respondidas
							</span>
						</div>
						<ProgressBar current={totalAnsweredQuestions} showPercentage={false} total={totalQuestions} />
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{showResults && isComplete && diagnostic ? (
					<ResultsPanel diagnostic={diagnostic} maxPossibleScore={maxPossibleScore} />
				) : (
					<div className="space-y-8">
						{/* Instructions */}
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
							<h2 className="text-lg font-semibold text-blue-800 mb-2">Instrucciones para el Diagnóstico</h2>
							<ul className="text-blue-700 space-y-1 text-sm">
								<li>• Lea cada pregunta cuidadosamente antes de responder</li>
								<li>• Seleccione el puntaje que mejor refleje la situación actual de su organización</li>
								<li>• 0: Deficiente - No cumple o cumple de manera muy limitada</li>
								<li>• 1: Regular - Cumple parcialmente o necesita mejoras</li>
								<li>• 2: Excelente - Cumple completamente y de manera óptima</li>
								<li>• Complete todas las preguntas para acceder a los resultados</li>
							</ul>
						</div>

						{/* Sections */}
						<div className="space-y-6">
							{diagnostic?.seccion_diagnosticos.map((section) => (
								<SectionCard
									key={section.id}
									isExpanded={expandedSection === section.id}
									section={section}
									onToggleExpand={() => toggleSection(section.id)}
								/>
							))}
						</div>

						{/* Completion Message */}
						{isComplete && !showResults && (
							<div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
								<div className="flex justify-center mb-4">
									<FileCheck className="h-12 w-12 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold text-green-800 mb-2">¡Diagnóstico Completado!</h3>
								<p className="text-green-700 mb-4">
									Has respondido todas las preguntas. Ahora puedes ver los resultados y recomendaciones.
								</p>
								<button
									className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
									onClick={() => setShowResults(true)}
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

export default Diagnostico;
