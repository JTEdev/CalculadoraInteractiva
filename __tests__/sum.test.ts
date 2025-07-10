import { Operator } from '../types';

// Simula la función de suma de la calculadora
function sumar(a: number, b: number): number {
  return a + b;
}

describe('Pruebas de suma', () => {
  it('suma dos números positivos', () => {
    expect(sumar(2, 3)).toBe(5);
    expect(sumar(10, 20)).toBe(30);
  });

  it('suma números negativos', () => {
    expect(sumar(-2, -3)).toBe(-5);
    expect(sumar(-10, 5)).toBe(-5);
  });

  it('suma con cero', () => {
    expect(sumar(0, 0)).toBe(0);
    expect(sumar(0, 7)).toBe(7);
    expect(sumar(7, 0)).toBe(7);
  });
});
