import React, { FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { setToken } from "../../services/auth";

import Logo from "../../assets/airbnb-logo.svg";

import { Container, Form } from "./styles";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSignIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        setError("Preencha os campos e-mail e senha para continuar.");
        return;
      }

      try {
        const { data } = await api.post("/sessions", { email, password });
        setToken(data.token);

        history.push("/home");
      } catch (error) {
        setError("Usuário não encontrado.");
      }
    },
    [email, password, history]
  );

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="Airbnb" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
