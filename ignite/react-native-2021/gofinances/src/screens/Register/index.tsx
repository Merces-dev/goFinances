import React from "react";
import * as St from "./styles";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";

export function Register() {
  return (
    <St.Container>
      <St.Header>
        <St.Title>Cadastro</St.Title>
      </St.Header>
      <St.Form>
        <St.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </St.Fields>

        <Button title="Enviar" />
      </St.Form>
    </St.Container>
  );
}
