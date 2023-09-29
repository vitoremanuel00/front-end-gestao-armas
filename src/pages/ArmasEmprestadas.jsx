import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArmaEmprestada } from "../components/ArmaEmprestada";
import {
  criarArmaEmprestada,
  listarArmasEmprestadas,
  atualizarObservacoes,
  devolverArma,
} from "../services/arma-emprestada-services";

export default function ArmasEmprestadas() {
  const [armasEmprestadas, setArmasEmprestadas] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listarArmasEmprestadas();
        const armasemprestadas = response.data;
        setArmasEmprestadas(armasemprestadas);
      } catch (error) {
        console.error("Erro ao listar armas emprestadas:", error);
        navigate("/armas-emprestadas");
      }
    }

    fetchData(); // Chame a função dentro do useEffect
  }, [navigate]);

  async function criarNovaArmaEmprestada(data) {
    try {
      const response = await criarArmaEmprestada(data);
      const novaArmaEmprestada = response.data;
      setSuccessMessage(`Arma emprestada cadastrada com sucesso! ID: ${novaArmaEmprestada.id}`);
      setIsCreated(false);
      await listarArmasEmprestadas(); // Você pode manter esta chamada aqui, já que é necessária após a criação
    } catch (error) {
      console.error("Erro ao criar arma emprestada:", error);
    }
  }

  async function removerArmaEmprestada(id) {
    try {
      await devolverArma(id);
      await listarArmasEmprestadas();
    } catch (error) {
      console.error("Erro ao remover arma emprestada:", error);
    }
  }

  async function editarObservacoesArmaEmprestada(data) {
    try {
      await atualizarObservacoes(data.id, data);
      await listarArmasEmprestadas();
    } catch (error) {
      console.error("Erro ao editar observações da arma emprestada:", error);
    }
  }

  return (
    <Container fluid>
      <Row className="w-50 m-auto mb-5 mt-5 ">
        <Col md="10">
          <Button onClick={() => setIsCreated(true)}>Emprestar arma:</Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => {
              sessionStorage.removeItem("token");
              navigate("/");
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
              removerArmaEmprestada={async () => await removerArmaEmprestada(armaEmprestada.id)}
              editarObservacoesArmaEmprestada={editarObservacoesArmaEmprestada}
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
        <Form noValidate onSubmit={handleSubmit(criarNovaArmaEmprestada)} validated={!!errors}>
          {/* Formulário para criar nova arma emprestada */}
        </Form>
      </Modal>
    </Container>
  );
}

