import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function ArmaEmprestada(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editArmaEmprestada(data) {
        await props.editArmaEmprestada({ ...data, id: props.armaEmprestada.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.armaEmprestada.nome_arma}d</Card.Title>
                <Card.Text><strong>Modelo: </strong>{props.armaEmprestada.modelo}</Card.Text>
                <Card.Text><strong>Marca: </strong>{props.armaEmprestada.marca}</Card.Text>
                <Card.Text><strong>Número de Série: </strong>{props.armaEmprestada.numero_de_serie}</Card.Text>
                <Card.Text><strong>Status: </strong>{props.armaEmprestada.status}</Card.Text>
                <Card.Text><strong>observacoes: </strong>{props.armaEmprestada.observacoes}</Card.Text>
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
                    <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.armaEmprestada.observacoes}
                            label='observacao'
                            placeholder='Insira uma observação'
                            required={true}
                            name='OBS:'
                            error={errors.nome_arma}
                            validations={register('observacao', {
                                required: {
                                    value: true,
                                    message: 'observaçao é obrigatória.'
                                }
                            })}
                        />
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
export default ArmaEmprestada;
