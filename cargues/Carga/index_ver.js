const path = require('path');
const fs = require('fs');
const axios = require('axios');

async function main(){
    console.log("🗑️ Iniciando creacion de veredas..." + new Date().toString());
    let x = 0;
    const superset = [];
    for (let index = 1; index < 18; index++) {
        const data = JSON.parse(fs.readFileSync("query"+index, "utf8"));
        superset.push(...data.features);
    }

    const municipiojson = await getData("http://127.0.0.1:1337/api/municipios?pagination[page]=1&pagination[pageSize]=2000");

    for (let index = 0; index < superset.length; index++) {
        const element =  superset[index];

        const mindex = municipiojson.findIndex((item) => parseInt(item.divipola) === parseInt(element.properties.DPTOMPIO));
          if(mindex >= 0){
            const dataToSave = {
              divipola:element.properties.CODIGO_VER,
              nombre:element.properties.NOMBRE_VER,
              municipio: municipiojson[mindex].id
          }
                   
          const resultado = await postData("http://127.0.0.1:1337/api/veredas",{
              data: dataToSave
          })
          fs.appendFileSync('veredas.log', `${dataToSave.divipola},${dataToSave.nombre},${municipiojson[mindex].nombre},${dataToSave.municipio}\n`);
          x++;
        }
         else{
            fs.appendFileSync('veredas_error.log', `${index},${element.properties.DPTOMPIO.toString()},${element.properties.NOMBRE_VER},${element.properties.CODIGO_VER}\n`);  
          }
    }
    console.log("🗑️ Terminando "+ x +"creacion de veredas..." + new Date().toString());
    console.log(superset.length);
}


async function getData(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
}


// Función para realizar petición POST
async function postData(url, data, options = {}) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // La respuesta fue hecha y el servidor respondió con un código de estado que no está en el rango 2xx
      console.error('Error de respuesta:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      throw new Error(`Error de servidor: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('Error de solicitud:', error.request);
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió al configurar la petición que provocó un error
      console.error('Error de configuración:', error.message);
      throw new Error(`Error al realizar la petición: ${error.message}`);
    }
  }
}



/*
`Error: HTTP error! status: 400
    at postData (C:\\Users\\yanne\\Downloads\\veredas\\veredas\\index.js:82:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async main (C:\\Users\\yanne\\Downloads\\veredas\\veredas\\index.js:25:31)`
*/

async function deleteAllVeredas() {
  try {
    console.log("🗑️ Iniciando eliminación de veredas..." + new Date().toString());
    // 1. Obtener todas las veredas (ajusta el límite si tienes muchas)
    const res = await axios.get(`http://127.0.0.1:1337/api/veredas?pagination[limit]=100000`);

    const veredas = res.data.data;

    if (veredas.length === 0) {
      console.log("⚠️ No hay veredas para eliminar.");
      return;
    }

    // 2. Borrar cada vereda
    for (const vereda of veredas) {
      const result = await axios.delete(`http://127.0.0.1:1337/api/veredas/${vereda.documentId}`);
      //console.log(`🗑️ Vereda ${vereda.id} eliminada`);
    }

    console.log("✅ Todas las veredas fueron eliminadas."+ new Date().toString());
  } catch (err) {
    console.error("❌ Error eliminando veredas:", err.response?.data || err.message);
  }
}

main();
//deleteAllVeredas();