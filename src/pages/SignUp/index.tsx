import React, { FormEvent, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Form } from "./styles";

import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSignUp = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!username || !email || !password) {
        setError("Preencha todos os dados para se cadastrar.");
        return;
      }

      try {
        await api.post("/users", { username, email, password });
        history.push("/");
      } catch (error) {
        setError("Ocorreu um erro ao cadastrar sua conta.");
      }
    },
    [username, email, password, history]
  );

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="Airbnb" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
};

export default SignUp;
