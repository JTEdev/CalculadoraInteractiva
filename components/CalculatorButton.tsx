
import React from 'react';

interface CalculatorButtonProps {
  label: string;  // El texto o símbolo que muestra el botón
  onClick: () => void; // Función que se ejecuta al hacer clic
  className?: string; //Clases CSS adicionales para personalizar el estilo
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, className }) => {
  const baseStyle = "flex items-center justify-center h-16 rounded-full text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-150 ease-in-out active:scale-95";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className || 'bg-gray-600 text-white'}`}
      aria-label={`Botón de la calculadora: ${label}`}
    >
      {label}
    </button>
  );
};
