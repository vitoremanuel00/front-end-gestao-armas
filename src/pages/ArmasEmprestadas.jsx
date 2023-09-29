import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ArmaEmprestada from "../components/ArmaEmprestada";

import {
    createArmaEmprestada,
    deleteArmasEmprestadas,
    updateArmasEmprestadas,
    getArmasEmprestadas,
} from "../services/arma-emprestada-services";

export default function ArmasEmprestadas() {
    const [armasEmprestadas, setArmasEmprestadas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        findArmasEmprestadas();
        // eslint-disable-next-line
    }, []);


    async function findArmasEmprestadas() {
        try {
            const response = await getArmasEmprestadas();
            const armasemprestadas = response.data;
            console.log(armasemprestadas);
            setArmasEmprestadas(armasemprestadas);
        } catch (error) {
            console.error("Erro ao listar armas emprestadas:", error);
            navigate("/listaremprestimos");
        }
    }

    async function addArmaEmprestada(data) {
        try {
            const response = await createArmaEmprestada(data);
            const novaArmaEmprestada = response.data;
            setSuccessMessage(`Arma emprestada cadastrada com sucesso! ID: ${novaArmaEmprestada.id}`);
            setIsCreated(false);
            await findArmasEmprestadas();
        } catch (error) {
            console.error("Erro ao criar arma emprestada:", error);
        }
    }

    async function removeArmaEmprestada(id) {
        try {
            await deleteArmasEmprestadas(id);
            await findArmasEmprestadas();
        } catch (error) {
            console.error("Erro ao remover arma emprestada:", error);
        }
    }

    async function editArmasEmprestadas(data) {
        try {
            await updateArmasEmprestadas({
                observacoes: data.observacoes
            });
            await findArmasEmprestadas();
        } catch (error) {
            console.error("Erro ao editar observações da arma emprestada:", error);
        }
    }


    return (
        <Container fluid>
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <h1>Gestao de Armas - Lista de armas emprestadas</h1>
                <Col md="10">
                    <Button onClick={() => setIsCreated(true)}>Emprestar arma:</Button>
                </Col>
                <Col>
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            sessionStorage.removeItem("token");
                            navigate("/emprestar");
                        }}
                    >
                        Sair
                    </Button>
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
                {armasEmprestadas && armasEmprestadas.length > 0 ? (
                    armasEmprestadas.map((armaEmprestada, index) => (
                        <ArmaEmprestada
                            key={index}
                            armaEmprestada={armaEmprestada}
                            removeArmaEmprestada={async () => await removeArmaEmprestada(armaEmprestada.id)}
                            editArmasEmprestadas={editArmasEmprestadas}
                        />
                    ))
                ) : (
                    <p className="text-center">Não existe nenhuma arma emprestada!</p>
                )}
            </Col>
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Emprestar</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addArmaEmprestada)} validated={!!errors}>
                    {/* Formulário para criar nova arma emprestada */}
                </Form>
            </Modal>
        </Container>
    );

}

