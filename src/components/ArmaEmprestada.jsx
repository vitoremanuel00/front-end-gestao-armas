import { useState } from "react";
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
        <Card.Title><strong>ID: </strong>{props.armaEmprestada.id}</Card.Title>
        <Card.Text><strong>Data de Empréstimo: </strong>{props.armaEmprestada.data_emprestimo}</Card.Text>
        <Card.Text><strong>Data de Devolução: </strong>{props.armaEmprestada.data_devolucao}</Card.Text>
        <Card.Text><strong>Status </strong>{props.armaEmprestada.status}</Card.Text>
        <Row xs="auto" className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
          <Button
            variant="outline-danger"
            className="ms-3"
            onClick={props.removeArmasEmprestadas}
          >
            Devolver
          </Button>
        </Row>
      </Card>
      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar Arma Emprestada: ID {props.armaEmprestada.id}</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(editArmaEmprestada)} validated={!!errors}>
          <Modal.Body>
            {/* Inclua os campos que deseja editar aqui */}
            <Input
              className="mb-3"
              type="text"
              defaultValue={props.armaEmprestada.observacoes}
              label="Observações"
              placeholder="Insira observações"
              required={true}
              name="observacoes"
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
