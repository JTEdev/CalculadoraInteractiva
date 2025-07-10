// Pruebas unitarias para la resta
function restar(a: number, b: number): number {
  return a - b;
}

describe('Pruebas de resta', () => {
  it('resta dos números positivos', () => {
    expect(restar(5, 3)).toBe(2);
    expect(restar(20, 10)).toBe(10);
  });

  it('resta números negativos', () => {
    expect(restar(-2, -3)).toBe(1);
    expect(restar(-10, 5)).toBe(-15);
  });

  it('resta con cero', () => {
    expect(restar(0, 0)).toBe(0);
    expect(restar(0, 7)).toBe(-7);
    expect(restar(7, 0)).toBe(7);
  });
});
