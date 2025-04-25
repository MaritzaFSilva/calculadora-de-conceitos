

const writeXlsxFile = require('write-excel-file/node')
const readXlsxFile = require('read-excel-file/node');
const args = require('minimist')(process.argv.slice(2))


const initialFile = args['file'] ?? 'notas';
const finalFile = args['finalFile'] ?? 'notas-finalizado';
const debug = args['debug'] ?? false;
let HEADER_ROW = [];
let data = [];

//Realizando leitura dos dados
readXlsxFile(`${initialFile}.xlsx`).then(rows => {
  //CABEÇALHO
  rows[0].forEach(row => {
    HEADER_ROW = [...HEADER_ROW, {
      value: row,
      fontWeight: 'bold'
    }];
  });


  //DADOS
  const rowsSliced = rows.slice(1);

  for (const columns of rowsSliced) {
    if (debug) console.log(".")
    let row = [];

    let mediaFinal = '';
    let inicial = '';

    for (let index = 0; index < columns.length; index++) {
      const notaAtual = columns[index];
      // A célula recebe o valor que está na planilha anterior
      row = [...row, { value: notaAtual }];
      if (index == 1) {
        if (debug) console.log(columns[1])
      }
      // Só faz isso se o indice for de nota, ignora o indice de matricula e nome
      if (index > 1) {
        if (inicial == '') {
          inicial = mediaFinal = notaAtual;
        } else {
          if (inicial == 'A' && notaAtual == 'A') mediaFinal = 'A';
          else if (inicial == 'B' && notaAtual == 'A') mediaFinal = 'A';
          else if (inicial == 'C' && notaAtual == 'A') mediaFinal = 'B';
          else if (inicial == 'D' && notaAtual == 'A') mediaFinal = 'C';
          else if (inicial == 'A' && notaAtual == 'B') mediaFinal = 'B';
          else if (inicial == 'B' && notaAtual == 'B') mediaFinal = 'B';
          else if (inicial == 'C' && notaAtual == 'B') mediaFinal = 'C';
          else if (inicial == 'D' && notaAtual == 'B') mediaFinal = 'C';
          else if (inicial == 'A' && notaAtual == 'C') mediaFinal = 'C';
          else if (inicial == 'B' && notaAtual == 'C') mediaFinal = 'C';
          else if (inicial == 'C' && notaAtual == 'C') mediaFinal = 'C';
          else if (inicial == 'D' && notaAtual == 'C') mediaFinal = 'C';
          else if (inicial == 'A' && notaAtual == 'D') mediaFinal = 'C';
          else if (inicial == 'B' && notaAtual == 'D') mediaFinal = 'C';
          else if (inicial == 'C' && notaAtual == 'D') mediaFinal = 'D';
          else if (inicial == 'D' && notaAtual == 'D') mediaFinal = 'D';


          if (debug) console.log(inicial + " + " + notaAtual + " = " + mediaFinal)
          inicial = mediaFinal;
        }
      }
    }
    row = [...row, { value: mediaFinal, fontWeight: 'bold' }];
    data = [...data, row];

  }


}).then(async e => {

  await writeXlsxFile([
    [...HEADER_ROW, { value: "Nota Final", fontWeight: 'bold' }], ...data

  ], {

    filePath: `${finalFile}.xlsx`
  }).then(e => {
    // console.log("deu")
  })
});


