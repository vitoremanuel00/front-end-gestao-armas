import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';

import './styles.css'; // Importe o arquivo de estilo da página de login

export default function HomePage() {
  return (
    <Container className="text-center mt-5">
      <h1>Bem-vindo à Página Inicial</h1>
      <div className="my-4">
        <div className="mb-2">
          <Link to="/armas" className="btn btn-custom btn-lg btn-block d-block mx-auto">
            Armas em estoque <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="mb-2">
          <Link to="/listaremprestimos" className="btn btn-custom btn-lg btn-block d-block mx-auto">
            Armas Emprestadas  <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div>
          <Link to="/dashboard" className="btn btn-custom btn-lg btn-block d-block mx-auto">
            Dashboard <FontAwesomeIcon icon={faChartBar} />
          </Link>
        </div>
        <div>
          <Link to="/perfil" className="btn btn-custom btn-lg btn-block d-block mx-auto">
            Perfil <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </Container>
  );
}
