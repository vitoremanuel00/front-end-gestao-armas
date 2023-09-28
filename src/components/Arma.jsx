import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Arma(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editArma(data) {
        await props.editArma({ ...data, id: props.arma.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                { <Card.Title><strong>Nome: </strong>{props.arma.nome_arma}</Card.Title>}
                <Card.Text><strong>Modelo: </strong>{props.arma.modelo}</Card.Text>
                <Card.Text><strong>Marca: </strong>{props.arma.marca}</Card.Text>
                <Card.Text><strong>Numero de Serie: </strong>{props.arma.numero_de_serie}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeArma}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar arma: {props.arma.nome_arma}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editArma)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.arma.nome_arma}
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
                            defaultValue={props.arma.marca}
                            label='Nome da arma'
                            placeholder='Insira a marca da arma'
                            required={true}
                            name='Marca'
                            error={errors.nome_arma}
                            validations={register('marca', {
                                required: {
                                    value: true,
                                    message: 'Marca da arma é obrigatória.'
                                }
                            })}
                        />
                        <Form.Group>
                            <Form.Label>Selecione o modelo da arma:</Form.Label>
                            <Form.Select {...register('modelo')} defaultValue={props.arma.modelo}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Pistola'}>Pistola</option>
                                <option value={'Fuzil'}>Fuzil</option>
                                <option value={'Escopeta'}>Escopeta</option>
                            </Form.Select>
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
export default Arma;
