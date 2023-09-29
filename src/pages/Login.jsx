import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";

import { loginUser } from "../services/user-services";
import './styles.css';

export function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      setResult(user);
      navigate('/home');
    } catch (error) {
      setResult({
        title: 'Houve um erro no login!',
        message: error.response.data.error,
      });
    }
  };

  return (
    <Container>
      <Modal
        show={result}
        title={result?.title}
        message={result?.message}
        handleClose={() => setResult(null)}
      />
      <Header title="Entre na sua conta" />
      <Form
        noValidate
        validated={!!errors}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light rounded p-5 shadow w-50 m-auto"
      >
        <Col>
          <Input
            className="mb-4"
            label="E-mail ou Matricula"
            type="text"
            placeholder="Insira seu e-mail ou matricula"
            error={errors.email}
            required={true}
            name="email"
            validations={register('email', 'matricula', {
              required: {
                value: true,
                message: 'E-mail ou matricula são obrigatórios'
              },
              pattern: {
                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                message: 'E-mail inválido!'
              }
            })}
          />
          <Input
            className="mb-4"
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            error={errors.password}
            required={true}
            name="password"
            validations={register('password', {
              required: {
                value: true,
                message: 'Senha é obrigatório'
              }
            })}
          />
          <div className="d-flex justify-content-between">
            <Button className="btn btn-primary btn-block" type="submit">
              Entrar
            </Button>
            <Link to="/register" className="btn btn-custom btn-block">
              Criar conta
            </Link>
          </div>
        </Col>
      </Form>
    </Container>
  );
}
