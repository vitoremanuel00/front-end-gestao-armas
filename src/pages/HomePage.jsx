import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md="12" className="text-center">
          <h1>Bem-vindo à Página Inicial</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md="12" className="text-center">
          <Link to="/armas">
            <Button variant="primary">Ir para Armas</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md="12" className="text-center">
          <Link to="/listaremprestimos">
            <Button variant="secondary">Ir para Armas Emprestadas</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
