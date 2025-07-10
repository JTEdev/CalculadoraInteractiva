// Pruebas unitarias para la multiplicación
function multiplicar(a: number, b: number): number {
  return a * b;
}

describe('Pruebas de multiplicación', () => {
  it('multiplica dos números positivos', () => {
    expect(multiplicar(2, 3)).toBe(6);
    expect(multiplicar(10, 5)).toBe(50);
  });

  it('multiplica números negativos', () => {
    expect(multiplicar(-2, -3)).toBe(6);
    expect(multiplicar(-4, 2)).toBe(-8);
  });

  it('multiplica con cero', () => {
    expect(multiplicar(0, 7)).toBe(0);
    expect(multiplicar(7, 0)).toBe(0);
    expect(multiplicar(0, 0)).toBe(0);
  });
});
