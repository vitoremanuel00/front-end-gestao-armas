import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
<<<<<<< HEAD
    return (
      <div>
        <h1>Bem-vindo à Página Inicial</h1>
        <Link to="/armas">
          <button>Ir para Armas</button>
        </Link>
        <Link to="/listaremprestimos">
          <button>Ir para Armas Emprestadas</button>
        </Link>
      </div>
    );
  }


=======
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
>>>>>>> d418b88e7bb8243683b4faf1d1964d04065a94e7
