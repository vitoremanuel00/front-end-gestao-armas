import { Container, Col, Modal, Form, Button, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Arma } from "../components/Arma";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createArma, deleteArma, getArmas, updateArma } from "../services/arma-services";

export function Armas() {
    const [armas, setArmas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        findArmas();
        // eslint-disable-next-line
    }, []);

        async function addArma(data) {
        try {

            const response = await createArma(data);
            const newArma = response.data;
            setSuccessMessage(`Arma cadastrada com sucesso! Dados da arma: Nome: ${newArma.nome_arma}, Marca: ${newArma.marca}, Número de Série: ${newArma.numero_de_serie}, Modelo: ${newArma.modelo}`);
            setIsCreated(false);
            await findArmas();
        } catch (error) {

            if (error.response) {
                console.error("Resposta de erro do servidor:", error.response.data);
            }
        }
    }

    async function findArmas() {
        try {
            const response = await getArmas();
            const armas= response.data;

            setArmas(armas);
        } catch (error) {
            console.error(error);
            navigate('/armas');
        }
    }

    async function removeArma(id) {
        try {
            await deleteArma(id);
            await findArmas();
        } catch (error) {
            console.error(error);
        }
    }



    async function editArma(data) {
        try {
            await updateArma({
                id: data.id,
                nome_arma: data.nome_arma,
                modelo: data.modelo,
                marca: data.marca,
                numero_de_serie: data.numero_de_serie
            });
            await findArmas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Armas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar nova arma</Button>
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
                {armas && armas.length > 0
                    ? armas.map((arma, index) => (
                        <Arma
                            key={index}
                            arma={arma}
                            removeArma={async () => await removeArma(arma.id)}
                            editArma={editArma}
                        />
                    ))
                    : <p className="text-center">Não existe nenhuma arma cadastrada!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova arma</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addArma)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome da arma'
                            placeholder='Insira o nome da arma'
                            required={true}
                            name='nome_arma'
                            error={errors.nome_arma}
                            validations={register('nome_arma', {
                                required: {
                                    value: true,
                                    message: 'Nome da arma é obrigatória.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Marca da arma'
                            placeholder='Insira a marca da arma'
                            required={true}
                            name='marca'
                            error={errors.marca}
                            validations={register('marca', {
                                required: {
                                    value: true,
                                    message: 'Marca da arma é obrigatória.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Número de Série da arma'
                            placeholder='Insira o número de série da arma'
                            required={true}
                            name='numero_de_serie'
                            error={errors.numero_de_serie}
                            validations={register('numero_de_serie', {
                                required: {
                                    value: true,
                                    message: 'Número de série da arma é obrigatória.'
                                }
                            })}
                        />
                        <Form.Group>
                            <Form.Label>Seleciona o modelo da arma</Form.Label>
                            <Form.Select {...register('modelo')}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Pistola'}>Pistola</option>
                                <option value={'Fuzil'}>Fuzil</option>
                                <option value={'Escopeta'}>Escopeta</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
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
export default Armas;
