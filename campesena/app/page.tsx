'use client';
import { Link } from '@heroui/react';
import { Card } from '@heroui/react';
import { Button } from '@heroui/react';
import { useState, useMemo } from 'react';

import { useAsociacionesStore } from '@/store/asociaciones.store';

// Íconos de ejemplo, puedes reemplazarlos por los tuyos
const AssociationIcon = () => (
  <span aria-label="asociaciones" role="img">
    🤝
  </span>
);

const ReportsIcon = () => (
  <span aria-label="reportes" role="img">
    📊
  </span>
);

const PieChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const [hoveredSegment, setHoveredSegment] = useState<{
    label: string;
    percentage: string;
  } | null>(null);

  const colorMap: { [key: string]: string } = {
    'bg-violet-500': '#8b5cf6',
    'bg-blue-500': '#3b82f6',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-pink-500': '#ec4899',
    'bg-indigo-500': '#6366f1',
    'bg-red-500': '#ef4444',
    'bg-teal-500': '#14b8a6',
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
      <svg className="w-full max-w-xs h-auto transform -rotate-90" viewBox="0 0 100 100">
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
            <span className="text-sm font-bold text-gray-800">{hoveredSegment.label}</span>
            <span className="block text-xl font-bold text-gray-900">{hoveredSegment.percentage}%</span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-lg font-bold text-gray-700">Total</span>
            <span className="block text-2xl font-bold text-gray-900">{totalValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  console.log('Renderizando Home');
  const asociaciones = useAsociacionesStore((state) => state.data);
  const loading = useAsociacionesStore((state) => state.loading);

  const estados = useMemo(() => {
    const estadosMap: { [key: string]: { value: number; color: string } } = {
      Registrada: { value: 0, color: 'bg-violet-500' },
      Diagnosticada: { value: 0, color: 'bg-blue-500' },
      'En formación': { value: 0, color: 'bg-yellow-500' },
      'En formulación de proyecto': { value: 0, color: 'bg-pink-500' },
      'En evaluación de proyecto': { value: 0, color: 'bg-indigo-500' },
    };

    console.log('estadosMap inicial:', estadosMap);
    asociaciones.forEach((asociacion) => {
      if (estadosMap[asociacion.estado.trim()]) {
        estadosMap[asociacion.estado.trim()].value++;
      }
    });

    return Object.entries(estadosMap).map(([label, { value, color }]) => ({
      label,
      value,
      color,
    }));
  }, [asociaciones]);

  return (
    <section className="flex flex-col gap-8 py-3 md:py-10 w-full">
      <h1 className="text-2xl font-bold">Programa campeSENA</h1>
      {/* Fila 1: Indicadores Principales */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
        <Card className="bg-gradient-to-br from-violet-100 to-white shadow-lg p-4 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-violet-700">{loading ? '...' : asociaciones.length}</span>
          <span className="font-semibold mt-2 text-center">Asociaciones atendidas</span>
          <small className="text-gray-500 text-center">Total de asociaciones en el programa</small>
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
          <small className="text-gray-500 mt-2 text-center">Administrar asociaciones</small>
        </Card>
        <Card className="bg-gradient-to-br from-pink-100 to-white shadow-lg p-4 flex flex-col items-center justify-center">
          <Link className="w-full" href="/reportes">
            <Button className="w-full flex items-center justify-center gap-2">
              <ReportsIcon /> Reportes
            </Button>
          </Link>
          <small className="text-gray-500 mt-2 text-center">Ver reportes y estadísticas</small>
        </Card>
      </div>

      {/* Fila 3: Estado de asociaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="bg-gradient-to-br from-gray-50 to-white shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Estado de las asociaciones</h2>
          <div className="space-y-3">
            {estados.map((estado) => (
              <div key={estado.label} className="flex justify-between items-center">
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
