const axios = require('axios');
const fs = require('fs');

const STRAPI_URL = 'http://127.0.0.1:1337/api';
const API_TOKEN = 'TU_TOKEN_DE_API'; // Clave de API con permisos de "Crear"
const MUNICIPIOS_FILE = './municipios.json';

/**
 * Función que obtiene los departamentos de la API de Strapi
 * y crea un mapa de divipola a ID.
 */
const obtenerMapaDepartamentos = async () => {
  console.log('--- Obteniendo mapa de departamentos de Strapi ---');
  try {
    const response = await axios.get(`${STRAPI_URL}/departamentos?pagination[pageSize]=40`,{
        params: {
            'fields[0]': 'documentId',
            'fields[1]': 'divipola',
        },
    });

    console.log('✅ Respuesta de la API (para depuración):');
    console.log(JSON.stringify(response.data, null, 2));
    const departamentos = response.data.data;
    return departamentos;
  } catch (error) {
    console.error('❌ Error al obtener los departamentos de Strapi:', error.response ? error.response.data : error.message);
    throw new Error('No se pudo crear el mapa de departamentos. Abortando.');
  }
};

/**
 * Función principal que orquesta la importación.
 */

const importarMunicipios = async () => {
     // 1. Obtener el mapa de departamentos desde la API
    const mapaDepartamentos = await obtenerMapaDepartamentos();
     // 2. Cargar los datos de municipios desde el archivo local
    console.log('--- Importando municipios ---');
    const municipiosData = JSON.parse(fs.readFileSync(MUNICIPIOS_FILE, 'utf-8'));
    const municipiosMap = {};  
    console.log(`✅ ${municipiosData.length} municipios cargados desde el archivo local.`);  

    let datapost = null;
    //3. Iterar sobre cada municipio y subirlo a Strapi
    for (const item of municipiosData) {
        try {

            const encontrado = mapaDepartamentos.find(dpto => dpto.divipola === item.id_dpto);
            if (!encontrado) {
            console.error(`❌ Departamento no encontrado para la divipola: ${item.id_dpto} del municipio: ${item.nombre}. Saltando.`);
            break;
            }
             // 4. Construir el objeto de municipio con la relación
            const { id_dpto, ...itemSinDpto } = item;
            const municipioConRelacion = {
                ...itemSinDpto,
                departamento: encontrado.id, // Usar el ID del departamento encontrado
            };
            datapost = { data: municipioConRelacion }
            console.log(`Subiendo municipio: ${item.nombre} con departamento: ${encontrado.documentId}`);
            const response = await axios.post(`${STRAPI_URL}/municipios`, datapost);

            console.log(`✅ municipio subido: ${response.data.data.id}`);
        } catch (error) {
            console.error(`❌ Error subiendo departamento: ${datapost}.`, error.response?.data);
            break;
        }
    }

   
};

importarMunicipios();