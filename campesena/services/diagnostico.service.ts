/* eslint-disable no-console */
import qs from 'qs';

import { getSession } from './auth';

import ApiClient from '@/app/api/axios/apiClient';
import {
	castDiagnosticoAsociaciontoRequest,
	DiagnosticoAsociacion,
	DiagnosticoAsociacionRequest,
	SeccionDiagnosticoRequest,
	RespuestaDiagnosticoRequest,
} from '@/types/diagnostico';
import { useAsociacionesStore } from '@/store/asociaciones.store';

export const getDiagnosticoByDocumentIdAsociacion = async (documentId: string) => {
	try {
		const session = getSession();
		const asociacion = useAsociacionesStore.getState().data?.find((a: any) => a.documentId === documentId);

		if (!session) throw new Error('No session found');

		// Add validation for documentId
		if (!documentId) {
			throw new Error('Document ID is required');
		}

		const query = qs.stringify(
			{
				populate: [
					'diagnostico_asociacions',
					'diagnostico_asociacions.seccion_diagnosticos',
					'diagnostico_asociacions.seccion_diagnosticos.respuesta_diagnosticos',
				],
			},
			{
				encodeValuesOnly: true,
			},
		);

		const response = await ApiClient.get(`/asociacions/${documentId}?${query}`);

		// Add validation for response
		if (!response.data) {
			throw new Error('No data received from API');
		}

		const diagnosticos = response.data.data.diagnostico_asociacions;

		if (!diagnosticos || diagnosticos.length === 0) {
			const diagnosticoGenerado = await generateDiagnosticoAsociacion(String(asociacion?.id));

			return diagnosticoGenerado;
		}

		return diagnosticos[0]; // Assuming you want the first one if multiple exist
	} catch (error: any) {
		// Improve error handling
		const errorMessage = error.response?.data?.error || error.message || 'Unknown error';

		console.error('Error in getDiagnosticoByDocumentIdAsociacion:', errorMessage);
		throw new Error(`Failed to fetch diagnostico: ${errorMessage}`);
	}
};

export const generateDiagnosticoAsociacion = async (documentIdAsociacion: string) => {
	try {
		const session = getSession();

		if (!session) throw new Error('No session found');

		const query = qs.stringify(
			{
				populate: ['seccion_planillas', 'seccion_planillas.pregunta_seccions'],
			},
			{
				encodeValuesOnly: true,
			},
		);
		// Assuming there's only one template or you want the first one
		const response = await ApiClient.get(`/diagnostico-plantillas?${query}`);

		const diagnosticoAsociacion: DiagnosticoAsociacionRequest = await poblarDiagnosticoAsociacion(
			documentIdAsociacion,
			response.data,
		);

		const querydiagnostico = qs.stringify(
			{
				populate: ['seccion_diagnosticos', 'seccion_diagnosticos.respuesta_diagnosticos'],
			},
			{
				encodeValuesOnly: true,
			},
		);

		const response2 = await ApiClient.post(`/diagnostico-asociacions?${querydiagnostico}`, {
			data: diagnosticoAsociacion,
		});

		return response2.data;
	} catch (error) {
		console.error('Error fetching session:', error);
		throw error;
	}
};

async function poblarDiagnosticoAsociacion(
	documentIdAsociacion: string,
	data: any,
): Promise<DiagnosticoAsociacionRequest> {
	try {
		const nombrePlantilla = data.data[0].nombrePlantilla;
		const diagnostico_asociacions: DiagnosticoAsociacionRequest = {
			nombrePlantila: nombrePlantilla,
			fechaAplicacion: new Date().toISOString(),
			tipoDiagnostico: 'Inicial',
			observaciones: '',
			totalPuntaje: 0,
			resultado: 'No evaluado',
			asociacion: documentIdAsociacion,
			seccion_diagnosticos: await poblarSeccionesDiagnostico(data.data[0].seccion_planillas),
		};

		return diagnostico_asociacions;
	} catch (error) {
		console.error('Error fetching session:', error);
		throw error;
	}
}

async function poblarSeccionesDiagnostico(seccionesData: any[]): Promise<number[]> {
	const codigos: number[] = [];

	try {
		for (let i = 0; i < seccionesData.length; i++) {
			const datapost = {
				nombreSeccion: seccionesData[i].nombreSeccion,
				puntajeSeccion: 0, // This will be calculated later
				partiacipacion: seccionesData[i].participacion || 1,
				respuesta_diagnosticos: await poblarRespuestasDiagnostico(seccionesData[i].pregunta_seccions),
			};

			const response = await ApiClient.post('/seccion-diagnosticos', {
				data: datapost,
			});

			codigos.push(response.data.data.id);
		}
	} catch (error) {
		console.error('Error fetching session:', error);
		throw error;
	}

	return codigos;
}

async function poblarRespuestasDiagnostico(criteriosData: any[]): Promise<number[]> {
	const codigos: number[] = [];

	try {
		for (let i = 0; i < criteriosData.length; i++) {
			const respuestaPost = {
				textoPregunta: criteriosData[i].textoPregunta,
				puntaje: null,
				participacion: criteriosData[i].participacion || 1,
				cumplimiento: criteriosData[i].cumplimiento || 1,
				hallazgos: '',
			};

			const response = await ApiClient.post('/respuesta-diagnosticos', {
				data: respuestaPost,
			});

			codigos.push(response.data.data.id);
		}

		return codigos;
	} catch (error) {
		console.error('Error fetching session:', error);
		throw error;
	}
}

export const saveDiagnosticoAsociacion = async (documentIdAsociacion: string, diagnostico: DiagnosticoAsociacion) => {
	try {
		const session = getSession();

		if (!session) throw new Error('No session found');

		const diagnosticoRequest = castDiagnosticoAsociaciontoRequest(diagnostico, documentIdAsociacion);

		const query = qs.stringify(
			{
				populate: ['seccion_diagnosticos', 'seccion_diagnosticos.respuesta_diagnosticos'],
			},
			{
				encodeValuesOnly: true,
			},
		);

		// Calculate totals before saving
		const calculatedDiagnostico = calcularTotalesDiagnostico(diagnosticoRequest);

		//metodo para guardar respuestasDiagnostico
		if (Array.isArray(calculatedDiagnostico.seccion_diagnosticos)) {
			for (const seccion of calculatedDiagnostico.seccion_diagnosticos) {
				// Check if seccion is a SeccionDiagnosticoRequest (not a string or number)
				if (typeof seccion === 'object' && seccion !== null && !Array.isArray(seccion)) {
					// Type guard to ensure respuesta_diagnosticos is an array of objects
					if (Array.isArray(seccion.respuesta_diagnosticos)) {
						// Filter out string/number IDs and keep only object responses
						const respuestaObjects = seccion.respuesta_diagnosticos.filter(
							(respuesta) => typeof respuesta === 'object' && respuesta !== null && !Array.isArray(respuesta),
						) as RespuestaDiagnosticoRequest[];

						for (const respuesta of respuestaObjects) {
							if (!respuesta.documentId) continue; // Skip if documentId is not available

							// Save the response
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							const { documentId, ...respuestaData } = respuesta; // Destructure to exclude documentId

							await ApiClient.put(`/respuesta-diagnosticos/${respuesta.documentId}`, {
								data: respuestaData,
							});
						}
					}
				}
			}
		}

		//metodo para guardar seccionDiagnostico
		if (Array.isArray(calculatedDiagnostico.seccion_diagnosticos)) {
			for (const seccion of calculatedDiagnostico.seccion_diagnosticos) {
				// Check if seccion is a SeccionDiagnosticoRequest (not a string or number)
				if (typeof seccion === 'object' && seccion !== null && !Array.isArray(seccion)) {
					if (!seccion.documentId) continue; // Skip if documentId is not available
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { documentId, respuesta_diagnosticos, ...seccionData } = seccion; // Destructure to exclude documentId

					// Save the section
					await ApiClient.put(`/seccion-diagnosticos/${seccion.documentId}`, {
						data: seccionData,
					});
				}
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { seccion_diagnosticos, documentId, ...diagnosticoData } = calculatedDiagnostico;
		//metodo para guardar diagnosticoAsociacion
		const response = await ApiClient.put(`/diagnostico-asociacions/${documentId}?${query}`, {
			data: diagnosticoData,
		});
		//validate the 3 hierarchies of data

		return response.data;
	} catch (error) {
		console.error('Error fetching session:', error);
		throw error;
	}
};

function calcularTotalesDiagnostico(diagnostico: DiagnosticoAsociacionRequest): DiagnosticoAsociacionRequest {
	// Calculate section scores and total score
	let totalPuntaje = 0;

	if (Array.isArray(diagnostico.seccion_diagnosticos)) {
		// If it's an array of IDs, we can't calculate scores from it
		// In a real scenario, you would need to fetch the full objects first
		return diagnostico;
	}

	// Calculate section scores and total score
	const updatedSecciones = (diagnostico.seccion_diagnosticos as SeccionDiagnosticoRequest[]).map(
		(seccion: SeccionDiagnosticoRequest) => {
			if (Array.isArray(seccion.respuesta_diagnosticos)) {
				// If respuesta_diagnosticos is an array of IDs, we can't calculate scores
				return seccion;
			}

			const puntajeSeccion = (seccion.respuesta_diagnosticos as RespuestaDiagnosticoRequest[]).reduce(
				(sum: number, respuesta: RespuestaDiagnosticoRequest) => {
					return sum + (respuesta.puntaje || 0);
				},
				0,
			);

			totalPuntaje += puntajeSeccion;

			return {
				...seccion,
				puntajeSeccion,
			};
		},
	);

	return {
		...diagnostico,
		seccion_diagnosticos: updatedSecciones,
		totalPuntaje,
	};
}
