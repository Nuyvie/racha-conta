import fs from "node:fs";
import pc from "picocolors";
import {
  paraCentavos,
  calcularGorjeta,
  formatarReais,
} from "../regras/conta.js";

const texto = fs.readFileSync("src/data/conta.json", "utf-8");
const conta = JSON.parse(texto);
const subtotal = conta.itens.reduce(
  (total, item) => total + item.preco * item.quantidade,
  0,
);
const unitpedidos = conta.itens.reduce(
  (total, item) => total + item.quantidade,
  0,
);
const acima50 = conta.itens.filter((item) => item.preco > 50).length;
const subtotalCentavos = paraCentavos(subtotal);
const gorjetaCentavos = calcularGorjeta(subtotalCentavos, conta.gorjeta);
const totalCentavos = subtotalCentavos + gorjetaCentavos;
const porpessoa = Math.floor(totalCentavos / conta.pessoas);
const porsobra = totalCentavos % conta.pessoas;

console.log(pc.bold("Racha-conta:"), pc.yellow(conta.restaurante));
console.log(pc.bold("Pessoas na mesa:"), conta.pessoas);
console.log(pc.bold("Itens na conta:"), conta.itens.length);
console.log(`Subtotal: ${pc.yellow(formatarReais(subtotalCentavos))}`);
console.log(
  `Gorjeta (${conta.gorjeta}%): ${pc.yellow(formatarReais(gorjetaCentavos))}`,
);
console.log(`Total: ${pc.yellow(formatarReais(totalCentavos))}`);
console.log(pc.bold("Quantidade de itens:"), pc.yellow(unitpedidos));
console.log(pc.bold("Itens acima de R$ 50:"), pc.yellow(acima50));
console.table(conta.itens);
console.log(
  `Boa noite o seu pedido no ${pc.bold(conta.restaurante)} deu um total de ${pc.yellow(formatarReais(subtotalCentavos))}`,
);

console.log(`Por pessoa: ${pc.yellow(formatarReais(porpessoa))}`);
console.log(`Centavos que sobram :${pc.yellow(porsobra)}`);
