import { api } from "./api";

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
            nome_arma: data.nameArma,
            modelo: data.modelo,
            marca: data.marca,
            numero_de_serie: data.numero_de_serie,
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result;
}


export async function createArma(data) {
        const accessToken = sessionStorage.getItem('token');
        const result = await api.post('/arma', {
            nome_arma: data.nameArma,
            modelo: data.modelo,
            marca: data.marca,
            numero_de_serie: data.numero_de_serie,
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result;

}



