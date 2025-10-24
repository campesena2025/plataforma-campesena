'use client';
import React from 'react';
import { Eye, Edit } from 'lucide-react';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';

import { ProyectoProductivo } from '@/types/proyectoProductivo';

interface CardProyectoProductivoProps {
  proyecto: ProyectoProductivo;
  onVer: (proyecto: ProyectoProductivo) => void;
  onEditar: (proyecto: ProyectoProductivo) => void;
  obtenerColorEstado: (estado: string) => string;
  obtenerTextoEstado: (estado: string) => string;
}

export const CardProyectoProductivo: React.FC<CardProyectoProductivoProps> = ({
  proyecto,
  onVer,
  onEditar,
  obtenerColorEstado,
  obtenerTextoEstado,
}) => {
  // Placeholder functions for the new buttons
  const handleModeloNegocio = () => console.log('Modelo de Negocio clicked', proyecto.nombreProyecto);
  const handleCostos = () => console.log('Costos clicked', proyecto.nombreProyecto);
  const handleVentas = () => console.log('Ventas clicked', proyecto.nombreProyecto);
  const handleFlujoCaja = () => console.log('Flujo de Caja clicked', proyecto.nombreProyecto);
  const handlePresupuesto = () => console.log('Presupuesto clicked', proyecto.nombreProyecto);
  const handleFichaProducto = () => console.log('Ficha Producto clicked', proyecto.nombreProyecto);
  const handleFichaServicio = () => console.log('Ficha Servicio clicked', proyecto.nombreProyecto);
  const handlePlanAccion = () => console.log('Plan de Acción clicked', proyecto.nombreProyecto);
  const handlePlanMercadeo = () => console.log('Plan de Mercadeo clicked', proyecto.nombreProyecto);

  return (
    <Card
      className="border border-default-200 bg-background/60 dark:bg-default-100/50 hover:shadow-lg transition-all duration-200"
      shadow="sm"
    >
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-2">{proyecto.nombreProyecto}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-600">
              <span>Duración: {proyecto.tiempoEstimado} meses</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span>Creado: {new Date(proyecto.createdAt).toLocaleDateString()}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${obtenerColorEstado(
                  proyecto.estado,
                )}`}
              >
                {obtenerTextoEstado(proyecto.estado)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              isIconOnly
              aria-label="Ver proyecto"
              color="primary"
              size="sm"
              variant="light"
              onPress={() => onVer(proyecto)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              aria-label="Editar proyecto"
              color="secondary"
              size="sm"
              variant="light"
              onPress={() => onEditar(proyecto)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom buttons section */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
          <Button color="success" size="sm" variant="ghost" onPress={handleModeloNegocio}>
            Modelo de Negocio
          </Button>
          <Button color="secondary" size="sm" variant="ghost" onPress={handleCostos}>
            Costos
          </Button>
          <Button color="secondary" size="sm" variant="ghost" onPress={handleVentas}>
            Ventas
          </Button>
          <Button color="secondary" size="sm" variant="ghost" onPress={handleFlujoCaja}>
            Flujo Caja
          </Button>
          <Button color="secondary" size="sm" variant="ghost" onPress={handlePresupuesto}>
            Presupuesto
          </Button>
          <Button color="primary" size="sm" variant="ghost" onPress={handleFichaProducto}>
            Ficha Producto
          </Button>
          <Button color="primary" size="sm" variant="ghost" onPress={handleFichaServicio}>
            Ficha Servicio
          </Button>
          <Button color="primary" size="sm" variant="ghost" onPress={handlePlanAccion}>
            Plan de Acción
          </Button>
          <Button color="primary" size="sm" variant="ghost" onPress={handlePlanMercadeo}>
            Plan de Mercadeo
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
