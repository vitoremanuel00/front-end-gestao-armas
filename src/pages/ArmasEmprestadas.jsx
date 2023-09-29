import { Container, Col, Modal, Form, Button, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { ArmaEmprestada } from "../components/ArmaEmprestada";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createArmasEmprestadas, deleteArmasEmprestadas, getArmasEmprestadas, updateArmasEmprestadas } from "../services/arma-emprestada-services";

export function ArmasEmprestadas() {
    const [armasEmprestadas, setArmasEmprestadas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        findArmasEmprestadas();
        // eslint-disable-next-line
    }, []);

    async function addArmaEmprestada(data) {
        try {
            const response = await createArmasEmprestadas(data);
            const newArmaEmprestada = response.data;
            setSuccessMessage(`Arma emprestada cadastrada com sucesso! ID: ${newArmaEmprestada.id}`);
            setIsCreated(false);
            await findArmasEmprestadas();
        } catch (error) {
            console.error(error);
        }
    }

    async function findArmasEmprestadas() {
        try {
            const response = await getArmasEmprestadas();
            const armasEmprestadas = response.data;
            setArmasEmprestadas(armasEmprestadas);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeArmasEmprestadas(id) {
        try {
            await deleteArmasEmprestadas(id);
            await findArmasEmprestadas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editArmaEmprestada(data) {
        try {
            await updateArmasEmprestadas({
                id: data.id,
                observacoes: data.observacoes
                // Adicione outros campos que deseja editar aqui
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
                    <Button onClick={() => setIsCreated(true)}>Emprestar nova arma</Button>
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
                            removeArmaEmprestada={async () => await removeArmasEmprestadas(armaEmprestada.id)}
                            editArmaEmprestada={editArmaEmprestada}
                        />
                    ))
                    : <p className="text-center">Não existe nenhuma arma emprestada!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Emprestar nova arma</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addArmaEmprestada)} validated={!!errors}>
                    <Modal.Body>
                        {/* Inclua os campos que deseja adicionar aqui */}
                        <Input
                            className="mb-3"
                            type='text'
                            label='Observações'
                            placeholder='Insira observações'
                            required={true}
                            name='observacoes'
                            error={errors.observacoes}
                            validations={register('observacoes', {
                                required: {
                                    value: true,
                                    message: 'Observações são obrigatórias.'
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
export default ArmasEmprestadas;
