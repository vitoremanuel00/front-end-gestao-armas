import { Container, Col, Modal, Form, Button, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

//import { User } from "../components/User";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { getUserById, updateUser, deleteUser } from "../services/user-services";

export function Users() {
    const [user, setUser] = useState();
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        findUserById(userId);

    }, []);

    async function findUserById(userId) {
        try {
            const response = await getUserById(userId); // Passe o modelo selecionado
            const user = response.data;
            setUser(user);
        } catch (error) {
            console.error(error);
        }
    }

//     async function findArmas() {
//         try {
//             const response = await getArmas(selectedModelo); // Passe o modelo selecionado
//             const armas = response.data;
//             setArmas(armas);
//         } catch (error) {
//             console.error(error);
//             navigate('/armas');
//         }
//     }


//     async function removeArma(id) {
//         try {
//             await deleteArma(id);
//             await findArmas();
//         } catch (error) {
//             console.error(error);
//         }
//     }


//     async function editArma(data) {
//         try {
//             await updateArma({
//                 id: data.id,
//                 nome_arma: data.nome_arma,
//                 modelo: data.modelo,
//                 marca: data.marca,
//                 numero_de_serie: data.numero_de_serie
//             });
//             await findArmas();
//         } catch (error) {
//             console.error(error);
//         }
//     }


// async function findArmasByModelo() {
//   try {
//     const response = await getArmas(selectedModelo); // Passa o modelo como parâmetro
//     const armas = response.data;
//     setArmas(armas);
//   } catch (error) {
//     console.error(error);
//     navigate('/armas');
//   }
// }


    return (
        <Container fluid>


        </Container>
    );
}
export default Users;
