// Pruebas unitarias para la división
function dividir(a: number, b: number): number {
  if (b === 0) return NaN;
  return a / b;
}

describe('Pruebas de división', () => {
  it('divide dos números positivos', () => {
    expect(dividir(6, 3)).toBe(2);
    expect(dividir(10, 2)).toBe(5);
  });

  it('divide números negativos', () => {
    expect(dividir(-6, -3)).toBe(2);
    expect(dividir(-8, 2)).toBe(-4);
  });

  it('divide con cero', () => {
    expect(dividir(0, 7)).toBe(0);
    expect(dividir(7, 0)).toBeNaN();
    expect(dividir(0, 0)).toBeNaN();
  });
});
