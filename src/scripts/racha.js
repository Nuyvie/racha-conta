import fs from 'node:fs';
import pc from 'picocolors';

const texto = fs.readFileSync('src/data/conta.json','utf-8');
const conta = JSON.parse(texto);
const subtotal = conta.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
const unitpedidos = conta.itens.reduce((total, item) => total + item.quantidade, 0 );
const acima50 = conta.itens.filter(item => item.preco > 50).length;
const subtotalCentavos = Math.round(subtotal * 100);
const gorjetaCentavos = Math.round(subtotalCentavos * conta.gorjeta / 100);
const totalCentavos = subtotalCentavos + gorjetaCentavos;
const porpessoa = Math.floor(totalCentavos / conta.pessoas);
const porsobra = (totalCentavos%conta.pessoas);



console.log(pc.bold('Racha-conta:'), pc.yellow(conta.restaurante)); 
console.log(pc.bold('Pessoas na mesa:'), conta.pessoas);
console.log(pc.bold('Itens na conta:'), conta.itens.length);
console.log(`Subtotal: R$ ${pc.yellow((subtotalCentavos / 100).toFixed(2))}`);
console.log(`Gorjeta (${conta.gorjeta}%): R$ ${pc.yellow((gorjetaCentavos / 100).toFixed(2))}`);
console.log(`Total: R$ ${pc.yellow((totalCentavos / 100).toFixed(2))}`);
console.log(pc.bold('Quantidade de itens:'), pc.yellow(unitpedidos));
console.log(pc.bold('Itens acima de R$ 50:'), pc.yellow(acima50));
console.table(conta.itens);
console.log(`Boa noite o seu pedido no ${pc.bold(conta.restaurante)} deu um total de R$: ${pc.yellow(subtotal.toFixed(2))}`);

console.log(`Por pessoa: R$: ${pc.yellow(porpessoa / 100)}`);
console.log(`Centavos que sobram :${pc.yellow(porsobra)}`);
