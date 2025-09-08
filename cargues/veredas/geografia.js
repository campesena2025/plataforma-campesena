const axios = require('axios');
const fs = require('fs');
const qs = require('qs');

const query = qs.stringify({
  populate: {
    municipios: {
      populate: ['veredas'],
      fields: ['documentId', 'nombre', 'divipola'],
    },
  },
  fields: ['documentId', 'nombre'],
  pagination: {
    page: 1,
    pageSize: 50,
  },
}, {
  encodeValuesOnly: true,
});

const apiUrl = `http://localhost:1337/api/departamentos?${query}`;

axios.get(apiUrl)
  .then(response => {
    const data = response.data;
    fs.writeFileSync('geografia.json', JSON.stringify(data, null, 2));
    console.log('El archivo geografia.json ha sido creado exitosamente.');
  })
  .catch(error => {
    console.error('Error al consumir el servicio:', error);
  });