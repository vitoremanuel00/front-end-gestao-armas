import {api} from "./api";

export default async function createArmaEmprestada(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log('Token:', accessToken);
    console.log('Data:', data);
    try {
        const result = await api.post('/emprestar', data, {
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

export async function getArmasEmprestadas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/listaremprestimos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log("Após a requisição bem-sucedida");
    return result;
}

export async function deleteArmaEmprestada(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/arma-devolucao?id=${id}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    try {
      return result;
    } catch (error) {
      throw error;
    }
  }

export async function updateArmaEmprestada(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/arma-emprestada/observacoes/${data.id}`, data,{
        observacoes: data.observacoes,
        headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
    return result;
}


