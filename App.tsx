import React, { useState, useCallback } from 'react';
import { CalculatorButton } from './components/CalculatorButton.tsx';
import { Operator } from './types.ts';

export const App: React.FC = () => {
  // Estado para el valor mostrado en la pantalla
  const [displayValue, setDisplayValue] = useState<string>('0');
  // Estado para el valor previo (antes de una operación)
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  // Estado para el operador seleccionado (+, -, *, /)
  const [operator, setOperator] = useState<Operator | null>(null);
  // Estado para saber si se espera un nuevo operando
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  // Realiza el cálculo según el operador y los valores actuales
  const performCalculation = useCallback(() => {
    if (previousValue === null || operator === null) return previousValue;

    const currentValue = parseFloat(displayValue);
    let result: number;

    switch (operator) {
      case Operator.Add:
        result = previousValue + currentValue;
        break;
      case Operator.Subtract:
        result = previousValue - currentValue;
        break;
      case Operator.Multiply:
        result = previousValue * currentValue;
        break;
      case Operator.Divide:
        if (currentValue === 0) {
            return NaN; // Indica error por división entre cero
        }
        result = previousValue / currentValue;
        break;
      default:
        return currentValue;
    }
    return result;
  }, [previousValue, operator, displayValue]);
  
  // Reinicia todos los estados a su valor inicial
  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // Maneja el clic en un número
  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  // Maneja el clic en el punto decimal
  const handleDecimalClick = () => {
    if (waitingForOperand) {
        setDisplayValue('0.');
        setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Maneja el clic en un operador (+, -, *, /)
  const handleOperatorClick = (op: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForOperand) {
      const result = performCalculation();
      if (isNaN(result as number)) {
        setDisplayValue("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      const resultStr = String(parseFloat((result as number).toPrecision(15)));
      setDisplayValue(resultStr);
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }
    
    setWaitingForOperand(true);
    setOperator(op);
  };
  
  // Maneja el clic en el botón igual (=)
  const handleEqualsClick = () => {
      if(operator === null || previousValue === null) return;

      const result = performCalculation();
      if(isNaN(result as number)) {
          setDisplayValue("Error");
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return;
      }
      
      const resultStr = String(parseFloat((result as number).toPrecision(15)));
      setDisplayValue(resultStr);
      setPreviousValue(result);
      // Mantiene el valor previo para cálculos encadenados, pero reinicia el operador
      setOperator(null); 
      setWaitingForOperand(true);
  };

  // Maneja el clic en los botones de función (AC, +/-, %)
  const handleFunctionClick = (func: string) => {
    const currentValue = parseFloat(displayValue);
    switch (func) {
      case 'AC':
        clearAll();
        break;
      case '+/-':
        if(displayValue !== '0') {
            setDisplayValue(String(currentValue * -1));
        }
        break;
      case '%':
        setDisplayValue(String(currentValue / 100));
        setWaitingForOperand(true);
        break;
    }
  };

  // Definición de los botones de la calculadora
  const buttonLayout = [
    { label: 'AC', type: 'function', style: 'bg-gray-400 text-black' },
    { label: '+/-', type: 'function', style: 'bg-gray-400 text-black' },
    { label: '%', type: 'function', style: 'bg-gray-400 text-black' },
    { label: Operator.Divide, type: 'operator', style: 'bg-orange-500 text-white' },
    { label: '7', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '8', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '9', type: 'number', style: 'bg-gray-600 text-white' },
    { label: Operator.Multiply, type: 'operator', style: 'bg-orange-500 text-white' },
    { label: '4', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '5', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '6', type: 'number', style: 'bg-gray-600 text-white' },
    { label: Operator.Subtract, type: 'operator', style: 'bg-orange-500 text-white' },
    { label: '1', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '2', type: 'number', style: 'bg-gray-600 text-white' },
    { label: '3', type: 'number', style: 'bg-gray-600 text-white' },
    { label: Operator.Add, type: 'operator', style: 'bg-orange-500 text-white' },
    { label: '0', type: 'number', style: 'bg-gray-600 text-white col-span-2' },
    { label: '.', type: 'decimal', style: 'bg-gray-600 text-white' },
    { label: '=', type: 'equals', style: 'bg-orange-500 text-white' },
  ];

  return (
    // Contenedor principal centrado
    <main className="bg-[#231F20] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-0">
        {/* Logo UTP */}
        <div className="flex justify-center mt-4 mb-2">
          <img src="/Utplogonuevo.svg.png" alt="Logo UTP" className="h-12" />
        </div>
        {/* Título de la calculadora */}
        <h1 className="text-2xl font-bold text-center text-[#C8102E] mb-2">Bienvenidos a la calculadora UTP</h1>
        {/* Pantalla de la calculadora */}
        <div className="bg-[#231F20] text-white text-right p-4 rounded-xl shadow-inner mx-4">
          <p className="font-orbitron text-5xl break-words">{displayValue}</p>
        </div>
        {/* Botones de la calculadora */}
        <div className="grid grid-cols-4 gap-3 p-4 pb-4">
          {buttonLayout.map(({ label, type }) => (
            <CalculatorButton
              key={label}
              label={label}
              className={
                label === '0'
                  ? 'bg-gray-700 text-white col-span-2'
                  : type === 'operator' || type === 'equals'
                  ? 'bg-[#C8102E] text-white'
                  : type === 'function'
                  ? 'bg-gray-300 text-black'
                  : 'bg-gray-700 text-white'
              }
              onClick={() => {
                if (type === 'number') handleNumberClick(label);
                else if (type === 'operator') handleOperatorClick(label as Operator);
                else if (type === 'function') handleFunctionClick(label);
                else if (type === 'decimal') handleDecimalClick();
                else if (type === 'equals') handleEqualsClick();
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
