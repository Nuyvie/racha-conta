import { calcularGorjeta , paraCentavos , formatarReais } from './conta.js';

test("gorjeta de 10% sobre R$ 187,50 é de 18,75", () => {
  expect(calcularGorjeta(18750, 10)).toBe(1875);
});

test.each([
    [18750, 10, 1875],
    [3330, 15, 500],
    [18755, 10, 1876],
    [8000, 0, 0],

])('calcularGorjeta(%i, %i) da %i', (subtotal, percentual, esperado) => {
    expect(calcularGorjeta(subtotal, percentual)).toBe(esperado);
});

test('Sem o percentual, a gorjeta e de 10%', () => {
    expect(calcularGorjeta(18750)).toBe(1875)
});

test('Coverter R$10 para centavos:1000', () => {
    expect(paraCentavos(10)).toBe(1000)
});

test('Coverter R$72.9 para centavos:7290', () => {
    expect(paraCentavos(72.9)).toBe(7290)
});

test('Coverter R$0.1 + 0.2 para centavos:30', () => {
    expect(paraCentavos(0.1 + 0.2)).toBe(30)
});

test('Formatar 18750 centavos para R$ 187.50', () => {
    expect(formatarReais(18750)).toBe("R$ 187.50")
});

test('Formatar 5 centavos para R$ 0.05', () => {
    expect(formatarReais(5)).toBe("R$ 0.05")
});