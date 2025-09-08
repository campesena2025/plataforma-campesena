const csvtojson = require('csvtojson');
const fs = require('fs');

const inputFilePath = './municipios.csv';
const outputFilePath = './municipios2.json';

const convertCsvToJson = async () => {
  try {
    const jsonArray = await csvtojson({ delimiter: ';' }).fromFile(inputFilePath);
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
    console.log(`✅ Archivo convertido exitosamente. Revisa '${outputFilePath}'`);
  } catch (error) {
    console.error('❌ Error durante la conversión:', error);
  }
};

convertCsvToJson();