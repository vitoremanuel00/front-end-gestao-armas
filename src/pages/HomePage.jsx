import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
      <div>
        <h1>Bem-vindo à Página Inicial</h1>
        <Link to="/armas">
          <button>Ir para Armas</button>
        </Link>
        <Link to="/armas-emprestadas">
          <button>Ir para Armas Emprestadas</button>
        </Link>
      </div>
    );
  }
