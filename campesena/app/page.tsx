"use client";
import { Link } from "@heroui/react";
import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";

import { useAuthenticatedStrapi } from "@/hooks/useAuthenticatedStrapi";

// Íconos de ejemplo, puedes reemplazarlos por los tuyos
const AssociationIcon = () => (
  <span aria-label="asociaciones" role="img">
    🤝
  </span>
);
const CapacityIcon = () => (
  <span aria-label="capacidades" role="img">
    🧑‍🏫
  </span>
);
const ReportsIcon = () => (
  <span aria-label="reportes" role="img">
    📊
  </span>
);

// --- DATOS DE EJEMPLO ---
const estados = [
  { label: "Registradas", value: 12, color: "bg-violet-500" },
  { label: "Diagnosticadas", value: 8, color: "bg-blue-500" },
  { label: "Asignadas a servicio", value: 6, color: "bg-green-500" },
  { label: "En formación", value: 5, color: "bg-yellow-500" },
  { label: "En formulación de proyecto", value: 3, color: "bg-pink-500" },
  { label: "En evaluación de proyecto", value: 2, color: "bg-indigo-500" },
  { label: "Evaluada en impactos", value: 1, color: "bg-red-500" },
  { label: "En entrega de insumos", value: 4, color: "bg-teal-500" },
];

const totalAsociaciones = estados.reduce((acc, e) => acc + e.value, 0);
const cursos = 7; // Dato de ejemplo

// --- COMPONENTES DE GRÁFICOS (EJEMPLO) ---
const PieChart = ({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<{
    label: string;
    percentage: string;
  } | null>(null);

  const colorMap: { [key: string]: string } = {
    "bg-violet-500": "#8b5cf6",
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#22c55e",
    "bg-yellow-500": "#eab308",
    "bg-pink-500": "#ec4899",
    "bg-indigo-500": "#6366f1",
    "bg-red-500": "#ef4444",
    "bg-teal-500": "#14b8a6",
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  const segments = data.map((item) => {
    const percent = item.value / totalValue;
    const startAngle = cumulativePercent * 2 * Math.PI;

    cumulativePercent += percent;
    const endAngle = cumulativePercent * 2 * Math.PI;

    return { ...item, percent, startAngle, endAngle };
  });

  const getCoords = (angle: number, radius: number) => ({
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  });

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        className="w-full max-w-xs h-auto transform -rotate-90"
        viewBox="0 0 100 100"
      >
        {segments.map((segment) => {
          // Ignorar segmentos con valor 0
          if (segment.value === 0) return null;

          const startCoords = getCoords(segment.startAngle, 45);
          const endCoords = getCoords(segment.endAngle, 45);
          const largeArcFlag = segment.percent > 0.5 ? 1 : 0;

          const pathData = `M 50,50 L ${startCoords.x},${startCoords.y} A 45,45 0 ${largeArcFlag} 1 ${endCoords.x},${endCoords.y} Z`;

          return (
            <path
              key={segment.label}
              className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
              d={pathData}
              style={{ fill: colorMap[segment.color as keyof typeof colorMap] }}
              onMouseEnter={() =>
                setHoveredSegment({
                  label: segment.label,
                  percentage: (segment.percent * 100).toFixed(1),
                })
              }
              onMouseLeave={() => setHoveredSegment(null)}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {hoveredSegment ? (
          <div className="text-center bg-white bg-opacity-75 rounded-lg p-2">
            <span className="text-sm font-bold text-gray-800">
              {hoveredSegment.label}
            </span>
            <span className="block text-xl font-bold text-gray-900">
              {hoveredSegment.percentage}%
            </span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-lg font-bold text-gray-700">Total</span>
            <span className="block text-2xl font-bold text-gray-900">
              {totalValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {


  return (
    <section className="flex flex-col gap-8 py-3 md:py-10 w-full">
      <h1 className="text-2xl font-bold">Programa campesena</h1>
      {/* Fila 1: Indicadores Principales */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
        <Card className="bg-gradient-to-br from-violet-100 to-white shadow-lg p-4 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-violet-700">
            {totalAsociaciones}
          </span>
          <span className="font-semibold mt-2 text-center">
            Asociaciones atendidas
          </span>
          <small className="text-gray-500 text-center">
            Total de asociaciones en el programa
          </small>
        </Card>
      </div>

      {/* Fila 2: Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className="bg-gradient-to-br from-blue-100 to-white shadow-lg p-4 flex flex-col items-center justify-center">
          <Link className="w-full" href="/asociaciones">
            <Button className="w-full flex items-center justify-center gap-2">
              <AssociationIcon /> Asociaciones
            </Button>
          </Link>
          <small className="text-gray-500 mt-2 text-center">
            Administrar asociaciones
          </small>
        </Card>
        <Card className="bg-gradient-to-br from-pink-100 to-white shadow-lg p-4 flex flex-col items-center justify-center">
          <Link className="w-full" href="/reportes">
            <Button className="w-full flex items-center justify-center gap-2">
              <ReportsIcon /> Reportes
            </Button>
          </Link>
          <small className="text-gray-500 mt-2 text-center">
            Ver reportes y estadísticas
          </small>
        </Card>
      </div>

      {/* Fila 3: Estado de asociaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="bg-gradient-to-br from-gray-50 to-white shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Estado de las asociaciones</h2>
          <div className="space-y-3">
            {estados.map((estado) => (
              <div
                key={estado.label}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${estado.color}`} />
                  <span className="text-gray-700">{estado.label}</span>
                </div>
                <span className="font-bold text-gray-800">{estado.value}</span>
              </div>
            ))}
          </div>
          <small className="text-gray-500 block mt-4">
            Distribución de asociaciones según su avance en el proceso.
          </small>
        </Card>
        <Card className="bg-gradient-to-br from-gray-50 to-white shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Distribución porcentual</h2>
          <PieChart
            data={estados.map((e) => ({
              label: e.label,
              value: e.value,
              color: e.color,
            }))}
          />
        </Card>
      </div>
    </section>
  );
}
