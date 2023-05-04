import React, { useState } from "react";
import { Modal } from "react-native";

import * as St from "./styles";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [selectedTransactionButton, setSelectedTransactionButton] =
    useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleTransactionSelect = (type: "income" | "outcome") =>
    setSelectedTransactionButton(type);

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  return (
    <St.Container>
      <St.Header>
        <St.Title>Cadastro</St.Title>
      </St.Header>

      <St.Form>
        <St.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" keyboardType="numeric" />
          <St.TransactionButtons>
            <TransactionTypeButton
              type="income"
              onPress={() => handleTransactionSelect("income")}
              isActive={selectedTransactionButton === "income"}
            />
            <TransactionTypeButton
              type="outcome"
              onPress={() => handleTransactionSelect("outcome")}
              isActive={selectedTransactionButton === "outcome"}
            />
          </St.TransactionButtons>
          <CategorySelectButton
            title={category.name}
            onPress={() => handleOpenSelectCategoryModal()}
          />
        </St.Fields>
        <Button title="Enviar" />
      </St.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => handleCloseSelectCategoryModal()}
        />
      </Modal>
    </St.Container>
  );
}
