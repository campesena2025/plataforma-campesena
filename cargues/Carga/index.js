const axios = require('axios');
const fs = require('fs');

const STRAPI_URL = 'http://127.0.0.1:1337/api';
const API_TOKEN = 'TU_TOKEN_DE_API'; // Clave de API con permisos de "Crear"
const DEPARTAMENTOS_FILE = './departamentos.json';

const importarDepartamentos = async () => {
    console.log('--- Importando Departamentos ---');
    const departamentosData = JSON.parse(fs.readFileSync(DEPARTAMENTOS_FILE, 'utf-8'));
    const departamentosMap = {};

    for (const item of departamentosData) {
        let datapost = { data: item }

        try {
            const response = await axios.post(`${STRAPI_URL}/departamentos`, datapost);
            const dpto = response.data.data;
            departamentosMap[dpto.documentId] = dpto.id;
            console.log(`✅ Departamento subido: ${dpto.id}`);
        } catch (error) {
            console.error(`❌ Error subiendo departamento: ${item.id}.`, error.response?.data);
            break;
        }
    }

    //Guardar el mapa en un archivo JSON para el siguiente paso
    fs.writeFileSync('departamentos_map.json', JSON.stringify(departamentosMap, null, 2), 'utf-8');
    console.log('\n¡Mapa de departamentos guardado en "departamentos_map.json"!');
    return ;
};

importarDepartamentos();