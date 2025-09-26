export interface DiagnosticoAsociacion {
	id: number;
	documentId: string;
	nombrePlantila: string;
	fechaAplicacion: string;
	tipoDiagnostico: 'Inicial' | 'Intermedio' | 'Final';
	observaciones: string;
	totalPuntaje: number;
	resultado: string;
	seccion_diagnosticos: SeccionDiagnostico[];
}

export interface SeccionDiagnostico {
	id: number;
	documentId: string;
	nombreSeccion: string;
	puntajeSeccion: number;
	participacion: number | null;
	respuesta_diagnosticos: RespuestaDiagnostico[];
}

export interface RespuestaDiagnostico {
	id: number;
	documentId: string;
	pregunta: string;
	respuesta: string;
	puntaje: number | null;
	participacion: number | null;
	cumplimiento: number | null;
	hallazgos?: string | null;
}

export interface DiagnosticoAsociacionRequest {
	documentId?: string;
	nombrePlantila: string;
	fechaAplicacion: string;
	tipoDiagnostico: 'Inicial' | 'Intermedio' | 'Final';
	observaciones: string;
	totalPuntaje: number;
	resultado: string;
	asociacion: string | number;
	seccion_diagnosticos: string[] | number[] | SeccionDiagnosticoRequest[];
}

export interface SeccionDiagnosticoRequest {
	documentId?: string;
	nombreSeccion: string;
	puntajeSeccion: number;
	participacion: number | null;
	respuesta_diagnosticos: RespuestaDiagnosticoRequest[] | string[] | number[];
}

export interface RespuestaDiagnosticoRequest {
	documentId?: string;
	textoPregunta: string;
	puntaje: number | null;
	participacion: number | null;
	cumplimiento: number | null;
	hallazgos?: string | null;
}

export function castDiagnosticoAsociaciontoRequest(
	diagnostico: DiagnosticoAsociacion,
	asociacionId: string | number,
): DiagnosticoAsociacionRequest {
	return {
		nombrePlantila: diagnostico.nombrePlantila,
		fechaAplicacion: diagnostico.fechaAplicacion,
		tipoDiagnostico: diagnostico.tipoDiagnostico,
		observaciones: diagnostico.observaciones,
		totalPuntaje: diagnostico.totalPuntaje,
		resultado: diagnostico.resultado,
		asociacion: asociacionId,
		seccion_diagnosticos: diagnostico.seccion_diagnosticos.map((section) => ({
			documentId: section.documentId,
			nombreSeccion: section.nombreSeccion,
			puntajeSeccion: section.puntajeSeccion,
			participacion: section.participacion,
			respuesta_diagnosticos: section.respuesta_diagnosticos.map((response) => ({
				documentId: response.documentId,
				textoPregunta: response.pregunta,
				puntaje: response.puntaje,
				participacion: response.participacion,
				cumplimiento: response.cumplimiento,
				hallazgos: response.hallazgos || '',
			})),
		})),
	};
}
