'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ModeloNegocioContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      <h1>Modelo de Negocio</h1>
      <p>ID del proyecto: {id}</p>
    </div>
  );
}

export default function ModeloNegocioPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ModeloNegocioContent />
    </Suspense>
  );
}