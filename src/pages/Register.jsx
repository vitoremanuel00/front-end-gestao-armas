import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerUser } from "../services/user-services";

export function Register() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            setResult({
                title: 'Cadastro bem-sucedido!',
                message: 'Seu usuário foi criado com sucesso.',
            });
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error,
            });
        }
    }

    const handleLoginClick = () => {
        navigate("/login");
    }

    return (
        <Container>
            {result && (
                <Modal
                    show={result}
                    title={result?.title}
                    message={result?.message}
                >
                    <Button onClick={handleLoginClick}>Logar</Button>
                </Modal>
            )}
            <Header title="Crie sua conta" />
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>
                    <Input
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Insira seu nome"
                        error={errors.nome}
                        required={true}
                        name="nome"
                        validations={register('nome', {
                            required: {
                                value: true,
                                message: 'Nome é obrigatório'
                            },
                        })}
                    />
                    <Input
                        className="mb-4"
                        label="Matrícula"
                        type="text"
                        placeholder="Insira sua matrícula"
                        error={errors.matricula}
                        required={true}
                        name="matricula"
                        validations={register('matricula', {
                            required: {
                                value: true,
                                message: 'Matrícula é obrigatória'
                            },
                        })}
                    />
                    <Input
                        className="mb-4"
                        label="E-mail"
                        type="text"
                        placeholder="Insira seu e-mail"
                        error={errors.email}
                        required={true}
                        name="email"
                        validations={register('email', {
                            required: {
                                value: true,
                                message: 'E-mail é obrigatório'
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
                                message: 'Senha é obrigatória'
                            }
                        })}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/">Já tenho uma conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}
