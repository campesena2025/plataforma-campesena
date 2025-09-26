import { create } from 'zustand';

import { DiagnosticoAsociacion, RespuestaDiagnostico } from '@/types/diagnostico';
import { getResultByScore } from '@/utils/scoreUtils';
import { getDiagnosticoByDocumentIdAsociacion, saveDiagnosticoAsociacion } from '@/services/diagnostico.service';

interface DiagnosticStore {
	diagnostic: DiagnosticoAsociacion | null;
	loading: boolean;
	error: string | null;
	fetchDiagnostic: (documentId: string) => Promise<void>;
	saveDiagnostic: (documentId: string) => Promise<void>;
	setDiagnostic: (diagnostic: DiagnosticoAsociacion) => void;
	updateResponse: (responseId: number, value: number | null) => void;
	updateResponseHallazgos: (responseId: number, hallazgos: string) => void;
	updateResponseCumplimiento: (responseId: number, cumplimiento: number | null) => void;
	toggleSection: (sectionId: number) => void;
	expandedSection: number | null;
	setShowResults: (show: boolean) => void;
	showResults: boolean;
	calculateTotals: () => void;
	getCompletedQuestions: () => number;
	getTotalQuestions: () => number;
	getMaxPossibleScore: () => number;
}

export const useDiagnosticStore = create<DiagnosticStore>((set, get) => ({
	diagnostic: null,
	loading: false,
	error: null,
	expandedSection: null,
	showResults: false,

	fetchDiagnostic: async (documentId: string) => {
		set({ loading: true, error: null });
		try {
			const diagnostic = await getDiagnosticoByDocumentIdAsociacion(documentId);

			set({ diagnostic, loading: false });
		} catch (error) {
			set({ error: error instanceof Error ? error.message : 'Failed to fetch diagnostic', loading: false });
		}
	},

	saveDiagnostic: async (documentId: string) => {
		set({ loading: true, error: null });
		try {
			const { diagnostic } = get();

			if (!diagnostic) {
				throw new Error('No diagnostic to save');
			}

			// Calculate totals before saving
			get().calculateTotals();

			await saveDiagnosticoAsociacion(documentId, diagnostic);
			set({ loading: false });
		} catch (error) {
			set({ error: error instanceof Error ? error.message : 'Failed to save diagnostic', loading: false });
		}
	},

	setDiagnostic: (diagnostic: DiagnosticoAsociacion) => {
		set({ diagnostic });
	},

	updateResponse: (responseId: number, value: number | null) => {
		set((state) => {
			if (!state.diagnostic) return state;

			const updatedDiagnostic = { ...state.diagnostic };

			// Find the response to update and update its score
			const updatedSections = updatedDiagnostic.seccion_diagnosticos.map((section) => {
				let targetResponse: RespuestaDiagnostico | undefined;

				const updatedResponses = section.respuesta_diagnosticos.map((response) => {
					if (response.id === responseId) {
						targetResponse = response;

						return { ...response, puntaje: value };
					}

					return response;
				});

				// Calculate cumplimiento based on the score if we found the target response
				if (targetResponse) {
					const participacion = targetResponse.participacion || 0;
					let cumplimientoScore = 0;

					if (value === 0) {
						cumplimientoScore = 0;
					} else if (value === 1) {
						cumplimientoScore = participacion !== null ? participacion / 2 : 0;
					} else if (value === 2) {
						cumplimientoScore = participacion !== null ? participacion * 1 : 0;
					}

					// Update the cumplimiento value in the responses
					return {
						...section,
						respuesta_diagnosticos: updatedResponses.map((r) =>
							r.id === responseId ? { ...r, cumplimiento: cumplimientoScore } : r,
						),
						puntajeSeccion: updatedResponses.reduce((sum, resp) => sum + (resp.puntaje ?? 0), 0),
					};
				}

				return {
					...section,
					respuesta_diagnosticos: updatedResponses,
					puntajeSeccion: updatedResponses.reduce((sum, resp) => sum + (resp.puntaje ?? 0), 0),
				};
			});

			// Update the total score
			const totalPuntaje = updatedSections.reduce((sum, section) => sum + section.puntajeSeccion, 0);
			const maxPossibleScore = get().getMaxPossibleScore();
			const resultado = getResultByScore(totalPuntaje, maxPossibleScore);

			return {
				...state,
				diagnostic: {
					...updatedDiagnostic,
					seccion_diagnosticos: updatedSections,
					totalPuntaje,
					resultado,
				},
			};
		});
	},

	updateResponseHallazgos: (responseId: number, hallazgos: string) => {
		set((state) => {
			if (!state.diagnostic) return state;

			const updatedDiagnostic = { ...state.diagnostic };
			const updatedSections = updatedDiagnostic.seccion_diagnosticos.map((section) => ({
				...section,
				respuesta_diagnosticos: section.respuesta_diagnosticos.map((response) =>
					response.id === responseId ? { ...response, hallazgos } : response,
				),
			}));

			return {
				...state,
				diagnostic: {
					...updatedDiagnostic,
					seccion_diagnosticos: updatedSections,
				},
			};
		});
	},

	updateResponseCumplimiento: (responseId: number, cumplimiento: number | null) => {
		set((state) => {
			if (!state.diagnostic) return state;

			const updatedDiagnostic = { ...state.diagnostic };
			const updatedSections = updatedDiagnostic.seccion_diagnosticos.map((section) => ({
				...section,
				respuesta_diagnosticos: section.respuesta_diagnosticos.map((response) =>
					response.id === responseId ? { ...response, cumplimiento } : response,
				),
			}));

			return {
				...state,
				diagnostic: {
					...updatedDiagnostic,
					seccion_diagnosticos: updatedSections,
				},
			};
		});
	},

	toggleSection: (sectionId: number) => {
		set((state) => ({
			expandedSection: state.expandedSection === sectionId ? null : sectionId,
		}));
	},

	setShowResults: (show: boolean) => {
		set({ showResults: show });
	},

	calculateTotals: () => {
		set((state) => {
			if (!state.diagnostic) return state;

			const diagnostic = { ...state.diagnostic };

			// Update section scores
			const updatedSections = diagnostic.seccion_diagnosticos.map((section) => ({
				...section,
				puntajeSeccion: section.respuesta_diagnosticos.reduce((sum, response) => sum + (response.puntaje ?? 0), 0),
			}));

			// Update total score
			const totalPuntaje = updatedSections.reduce((sum, section) => sum + section.puntajeSeccion, 0);
			const maxPossibleScore = updatedSections.reduce(
				(total, section) => total + section.respuesta_diagnosticos.length * 2,
				0,
			);
			const resultado = getResultByScore(totalPuntaje, maxPossibleScore);

			return {
				...state,
				diagnostic: {
					...diagnostic,
					seccion_diagnosticos: updatedSections,
					totalPuntaje,
					resultado,
				},
			};
		});
	},

	getCompletedQuestions: (): number => {
		const { diagnostic } = get();

		if (!diagnostic) return 0;

		return diagnostic.seccion_diagnosticos.reduce(
			(total, section) => total + section.respuesta_diagnosticos.filter((r) => r.puntaje !== null).length,
			0,
		);
	},

	getTotalQuestions: (): number => {
		const { diagnostic } = get();

		if (!diagnostic) return 0;

		return diagnostic.seccion_diagnosticos.reduce((total, section) => total + section.respuesta_diagnosticos.length, 0);
	},

	getMaxPossibleScore: (): number => {
		const { diagnostic } = get();

		if (!diagnostic) return 0;

		return diagnostic.seccion_diagnosticos.reduce(
			(total, section) => total + section.respuesta_diagnosticos.length * 2,
			0,
		);
	},
}));
