// import { api } from './api'

// export async function registerUser(data) {
//     const result = await api.post('/register', data);
//     sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
// }

// export async function loginUser(data) {
//     const result = await api.post('/login', data);
//     sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
// }
import { api } from './api';

// Registrar um novo usuário
export async function registerUser(data) {
    try {
        const result = await api.post('/register', data);
        sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
        return result.data;
    } catch (error) {
        throw error; // Você pode tratar os erros aqui de acordo com sua necessidade
    }
}

// Logar um usuário
export async function loginUser(data) {
    try {
        const result = await api.post('/login', data);
        sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
        sessionStorage.setItem('id', JSON.stringify(result.data.id));

        debugger
        return result.data;
    } catch (error) {
        throw error; // Você pode tratar os erros aqui de acordo com sua necessidade
    }
}

// Obter dados de um usuário por ID
export async function getUserById(userId) {
    const accessToken = sessionStorage.getItem('token');
    try {
        const result = await api.get(`/perfil/${userId}`,{
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result.data;
    } catch (error) {
        throw error; // Você pode tratar os erros aqui de acordo com sua necessidade
    }
}

// Atualizar os dados de um usuário por ID
export async function updateUser(userId, userData) {
    try {
        const result = await api.put(`/users/${userId}`, userData);
        return result.data;
    } catch (error) {
        throw error; // Você pode tratar os erros aqui de acordo com sua necessidade
    }
}

// Deletar um usuário por ID
export async function deleteUser(userId) {
    try {
        const result = await api.delete(`/users/${userId}`);
        return result.data;
    } catch (error) {
        throw error; // Você pode tratar os erros aqui de acordo com sua necessidade
    }
}



