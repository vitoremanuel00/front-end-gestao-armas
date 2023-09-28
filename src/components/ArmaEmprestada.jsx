import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export function ArmaEmprestada({ armaEmprestada, removerArmaEmprestada, editarObservacoesArmaEmprestada }) {
  const [observacoes, setObservacoes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setObservacoes(armaEmprestada.observacoes || "");
    setIsEditing(true);
  }

  async function handleSaveClick() {
    await editarObservacoesArmaEmprestada({ id: armaEmprestada.id, observacoes });
    setIsEditing(false);
  }

  return (
    <Card className="mb-3">
      <Card.Header>
        <strong>Arma emprestada ID: {armaEmprestada.id}</strong>
      </Card.Header>
      <Card.Body>
        <Form.Group controlId={`observacoes-${armaEmprestada.id}`}>
          <Form.Label>Observações:</Form.Label>
          {isEditing ? (
            <>
              <Form.Control as="textarea" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
              <Button variant="primary" className="mt-3" onClick={handleSaveClick}>
                Salvar
              </Button>
            </>
          ) : (
            <Form.Control plaintext readOnly defaultValue={observacoes} />
          )}
        </Form.Group>
        <Button variant="danger" className="mr-2" onClick={removerArmaEmprestada}>
          Devolver Arma
        </Button>
        <Button variant="secondary" onClick={handleEditClick}>
          Editar Observações
        </Button>
      </Card.Body>
    </Card>
  );
}
