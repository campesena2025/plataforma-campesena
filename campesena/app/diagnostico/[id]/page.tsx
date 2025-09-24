"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { DiagnosticAssociation } from "@/types/diagnostico";
import Diagnostico from "@/components/DiagnosticoEvaluado/diagnostico";

export default function DiagnosticoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diagnostico, setDiagnostico] = useState<DiagnosticAssociation | null>(
    null,
  );

  // Cargar el diagnóstico
  useEffect(() => {
    const fetchDiagnostico = async () => {
      try {
        setLoading(true);
        setError(null);

        // Aquí deberías reemplazar esto con tu lógica real de API
        const response = await fetch(`/api/diagnosticos/${params.id}`);

        if (!response.ok) {
          throw new Error("Error al cargar el diagnóstico");
        }

        const data = await response.json();

        setDiagnostico(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchDiagnostico();
    }
  }, [params?.id]);

  // Manejar el guardado del diagnóstico
  const handleSaveDiagnostico = async (
    updatedDiagnostico: DiagnosticAssociation,
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Aquí deberías reemplazar esto con tu lógica real de API
      const response = await fetch(`/api/diagnosticos/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDiagnostico),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el diagnóstico");
      }

      const savedData = await response.json();

      setDiagnostico(savedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-gray-600">Cargando diagnóstico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar el diagnóstico
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/diagnosticos")}
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!diagnostico) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Diagnóstico no encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              El diagnóstico que buscas no existe o no tienes acceso a él.
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/diagnosticos")}
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Diagnostico
        diagnostico={diagnostico}
        loading={loading}
        onSave={handleSaveDiagnostico}
      />
    </div>
  );
}
