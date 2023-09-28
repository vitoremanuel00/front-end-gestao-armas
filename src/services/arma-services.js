import { api } from "./api";

export async function createArma(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log('Token:', accessToken);
    console.log('Data:', data);
    try {
        const result = await api.post('/arma', data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        console.log('Result:', result.data);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getArmas() {
        const accessToken = sessionStorage.getItem('token');
        const result = await api.get('/armas', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        console.log("Após a requisição bem-sucedida");
        return result;
}

export async function deleteArma(id) {
        const accessToken = sessionStorage.getItem('token');
        const result = await api.delete(`/arma/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result;
}

export async function updateArma(data) {
        const accessToken = sessionStorage.getItem('token');
        const result = await api.put(`/arma/${data.id}`, data, {
            id: data.id,
            nome_arma: data.nome_arma,
            modelo: data.modelo,
            marca: data.marca,
            numero_de_serie: data.numero_de_serie,
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result;
}



