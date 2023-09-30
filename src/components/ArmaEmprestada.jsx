import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

import { Input } from "./Input";

    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editArmasEmprestadas(data) {
        await props.editArmasEmprestadas({ ...data, id: props.arma.id });
        setIsUpdated(false);
    }

  return (
    <Card className="mb-3 bg-light">
      <Card.Body>
        <Card.Title><strong>Arma emprestada</strong></Card.Title>
        <Card.Text>
          <strong>ID:</strong> {props.armaEmprestada.id}
        </Card.Text>
        <Card.Text>d
          <strong>Número de Série da Arma:</strong> {props.armaEmprestada.arma.numero_de_serie}
        </Card.Text>
        <Card.Text>
          <strong>Data de Empréstimo:</strong> {props.armaEmprestada.data_emprestimo}
        </Card.Text>
        <Card.Text>
          <strong>Data de Devolução:</strong> {props.armaEmprestada.data_devolucao}
        </Card.Text>
        {isEditing ? (
          <Form>
            <Form.Group controlId={`observacoes-${armaEmprestada.id}`}>
              <Form.Label>Observações:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observacoes}
                onChange={handleObservacoesChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveClick}>
              Salvar
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>
              <strong>Observações:</strong> {armaEmprestada.observacoes || "Nenhuma observação"}
            </Card.Text>
            <Button variant="info" onClick={handleEditClick}>
              Editar Observações
            </Button>
            <Button variant="danger" onClick={removerArmaEmprestada}>
              Devolver Arma
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
