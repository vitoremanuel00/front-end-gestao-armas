// import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import ArmaEmprestada from "../components/ArmaEmprestada";

// import {
//     createArmaEmprestada,
//     deleteArmasEmprestadas,
//     updateArmasEmprestadas,
//     getArmasEmprestadas,
// } from "../services/arma-emprestada-services";

// export default function ArmasEmprestadas() {
//     const [armasEmprestadas, setArmasEmprestadas] = useState([]);
//     const [isCreated, setIsCreated] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");
//     const { handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();


//     useEffect(() => {
//         findArmasEmprestadas();
//         // eslint-disable-next-line
//     }, []);


//     async function findArmasEmprestadas() {
//         try {
//             const response = await getArmasEmprestadas();
//             const armasemprestadas = response.data;
//             console.log(armasemprestadas);
//             setArmasEmprestadas(armasemprestadas);
//         } catch (error) {
//             console.error("Erro ao listar armas emprestadas:", error);
//             navigate("/listaremprestimos");
//         }
//     }

//     async function addArmaEmprestada(data) {
//         try {
//             const response = await createArmaEmprestada(data);
//             const novaArmaEmprestada = response.data;
//             setSuccessMessage(`Arma emprestada cadastrada com sucesso! ID: ${novaArmaEmprestada.id}`);
//             setIsCreated(false);
//             await findArmasEmprestadas();
//         } catch (error) {
//             console.error("Erro ao criar arma emprestada:", error);
//         }
//     }

//     async function removeArmaEmprestada(id) {
//         try {
//             await deleteArmasEmprestadas(id);
//             await findArmasEmprestadas();
//         } catch (error) {
//             console.error("Erro ao remover arma emprestada:", error);
//         }
//     }

//     async function editArmasEmprestadas(data) {
//         try {
//             await updateArmasEmprestadas({
//                 observacoes: data.observacoes
//             });
//             await findArmasEmprestadas();
//         } catch (error) {
//             console.error("Erro ao editar observações da arma emprestada:", error);
//         }
//     }


//     return (
//         <Container fluid>
//             <Row className="w-50 m-auto mb-5 mt-5 ">
//                 <h1>Gestao de Armas - Lista de armas emprestadas</h1>
//                 <Col md="10">
//                     <Button onClick={() => setIsCreated(true)}>Emprestar arma:</Button>
//                 </Col>
//                 <Col>
//                     <Button
//                         variant="outline-secondary"
//                         onClick={() => {
//                             sessionStorage.removeItem("token");
//                             navigate("/emprestar");
//                         }}
//                     >
//                         Sair
//                     </Button>
//                 </Col>
//             </Row>
//             {successMessage && (
//                 <Row className="w-50 m-auto mb-3">
//                     <Col>
//                         <Alert variant="success">{successMessage}</Alert>
//                     </Col>
//                 </Row>
//             )}
//             <Col className="w-50 m-auto">
//                 {armasEmprestadas && armasEmprestadas.length > 0 ? (
//                     armasEmprestadas.map((armaEmprestada, index) => (
//                         <ArmaEmprestada
//                             key={index}
//                             armaEmprestada={armaEmprestada}
//                             removeArmaEmprestada={async () => await removeArmaEmprestada(armaEmprestada.id)}
//                             editArmasEmprestadas={editArmasEmprestadas}
//                         />
//                     ))
//                 ) : (
//                     <p className="text-center">Não existe nenhuma arma emprestada!</p>
//                 )}
//             </Col>
//             <Modal show={isCreated} onHide={() => setIsCreated(false)}>
//                 <Modal.Header>
//                     <Modal.Title>Emprestar</Modal.Title>
//                 </Modal.Header>
//                 <Form noValidate onSubmit={handleSubmit(addArmaEmprestada)} validated={!!errors}>
//                     {/* Formulário para criar nova arma emprestada */}
//                 </Form>
//             </Modal>
//         </Container>
//     );

// }

import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Modal, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ArmaEmprestada } from "../components/ArmaEmprestada";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import {
    createArmaEmprestada,
    deleteArmaEmprestada,
    getArmasEmprestadas,
    updateArmaEmprestada
} from "../services/arma-emprestada-services";

export default function ArmasEmprestadas() {
    const [armasEmprestadas, setArmasEmprestadas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        findArmasEmprestadas();
    }, []);

    async function addArmaEmprestada(data) {
        try {
            const response = await createArmaEmprestada(data);
            const newArmaEmprestada = response.data;
            setSuccessMessage(`Arma emprestada com sucesso! Nome: ${newArmaEmprestada.nome_arma}, Marca: ${newArmaEmprestada.marca}, Número de Série: ${newArmaEmprestada.numero_de_serie}, Modelo: ${newArmaEmprestada.modelo}`);
            setIsCreated(false);
            await findArmasEmprestadas();
        } catch (error) {
            if (error.response) {
                console.error("Resposta de erro do servidor:", error.response.data);
            }
        }
    }

    async function findArmasEmprestadas() {
        try {
            const response = await getArmasEmprestadas();
            const armasEmprestadas = response.data;
            //console.log(armasEmprestadas);
            setArmasEmprestadas(armasEmprestadas);
        } catch (error) {
            console.error(error);
            navigate('/listaremprestimos');
        }
    }

    async function removeArmaEmprestada(id) {
        try {
            await deleteArmaEmprestada(id);
            await findArmasEmprestadas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editArmaEmprestada(data) {
        try {
            await updateArmaEmprestada({
                id: data.id,
                observacoes: data.observacoes
            });
            await findArmasEmprestadas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Armas Emprestadas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Emprestar arma</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            {successMessage && (
                <Row className="w-50 m-auto mb-3">
                    <Col>
                        <Alert variant="success">{successMessage}</Alert>
                    </Col>
                </Row>
            )}
            <Col className="w-50 m-auto">
                {armasEmprestadas && armasEmprestadas.length > 0
                    ? armasEmprestadas.map((armaEmprestada, index) => (
                        <ArmaEmprestada
                            key={index}
                            armaEmprestada={armaEmprestada}
                            removeArmaEmprestada={async () => await removeArmaEmprestada(armaEmprestada.id)}
                            editArmaEmprestada={editArmaEmprestada}
                        />
                    ))
                    : <p className="text-center">Não existe nenhuma arma cadastrada!</p>}
            </Col>
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Emprestar nova arma</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addArmaEmprestada)} validated={!!errors}>
                    <Modal.Body>
                    <Input
                            className="mb-3"
                            type='text'
                            label='Numero de serie'
                            placeholder='Insira uma Numero de serie'
                            required={true}
                            name='OBS:'
                            error={errors.numero_de_serie}
                            validations={register('Numero de serie', {
                                required: {
                                    value: true,
                                    message: 'Numero de serie é obrigatória.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Emprestar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

