export const scoreLevels: any[] = [
  {
    value: 0,
    label: 'Deficiente',
    description: 'No cumple o cumple de manera muy limitada',
    color: 'bg-red-500 border-red-600 text-white',
  },
  {
    value: 1,
    label: 'Regular',
    description: 'Cumple parcialmente o necesita mejoras',
    color: 'bg-yellow-500 border-yellow-600 text-white',
  },
  {
    value: 2,
    label: 'Excelente',
    description: 'Cumple completamente y de manera óptima',
    color: 'bg-green-500 border-green-600 text-white',
  },
];

export const getResultByScore = (totalScore: number, maxPossibleScore: number): string => {
  const percentage = (totalScore / maxPossibleScore) * 100;

  if (percentage >= 85) {
    return 'Excelente - La organización demuestra fortalezas significativas en todas las áreas evaluadas.';
  } else if (percentage >= 70) {
    return 'Bueno - La organización tiene bases sólidas con algunas oportunidades de mejora.';
  } else if (percentage >= 50) {
    return 'Regular - La organización requiere atención en varias áreas para mejorar su desempeño.';
  } else {
    return 'Deficiente - La organización necesita implementar mejoras urgentes en múltiples áreas críticas.';
  }
};

export const getScoreColor = (percentage: number): string => {
  if (percentage >= 85) return 'text-green-600';
  if (percentage >= 70) return 'text-blue-600';
  if (percentage >= 50) return 'text-yellow-600';

  return 'text-red-600';
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 85) return 'bg-green-500';
  if (percentage >= 70) return 'bg-blue-500';
  if (percentage >= 50) return 'bg-yellow-500';

  return 'bg-red-500';
};
