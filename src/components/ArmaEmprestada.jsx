import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function ArmaEmprestada(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editArmaEmprestada(data) {
        await props.editArmaEmprestada({ ...data, numero_de_serie: props.armaEmprestada.arma.numero_de_serie });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.armaEmprestada.usuario.nome}</Card.Title>
                <Card.Text><strong>Modelo: </strong>{props.armaEmprestada.arma.modelo}</Card.Text>
                <Card.Text><strong>Marca: </strong>{props.armaEmprestada.arma.marca}</Card.Text>
                <Card.Text><strong>Número de Série: </strong>{props.armaEmprestada.arma.numero_de_serie}</Card.Text>
                <Card.Text><strong>Status: </strong>{props.armaEmprestada.status}</Card.Text>
                <Card.Text><strong>Observações: </strong>{props.armaEmprestada.observacoes}</Card.Text>
                <Card.Text><strong>Data de emprestimo: </strong>{props.armaEmprestada.data_emprestimo}</Card.Text>
                <Card.Text><strong>Data de devoluçao: </strong>{props.armaEmprestada.data_devolucao}</Card.Text>


                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>


                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeArmaEmprestada}
                    >
                        Devolver
                    </Button>


                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar arma emprestada: {props.armaEmprestada.nome_arma}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editArmaEmprestada)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Observações:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register('observacoes')}
                                defaultValue={props.armaEmprestada.observacoes}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

