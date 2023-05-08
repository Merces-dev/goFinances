import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import * as St from "./styles";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/InputForm";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

interface IFormData {
  name: string;
  amount: string;
}

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const handleTransactionSelect = (type: "income" | "outcome") =>
    setTransactionType(type);

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  const handleRegister = (form: IFormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <St.Container>
      <St.Header>
        <St.Title>Cadastro</St.Title>
      </St.Header>

      <St.Form>
        <St.Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="words"
            autoCorrect={false}
          />

          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
          />

          <St.TransactionButtons>
            <TransactionTypeButton
              type="income"
              onPress={() => handleTransactionSelect("income")}
              isActive={transactionType === "income"}
            />
            <TransactionTypeButton
              type="outcome"
              onPress={() => handleTransactionSelect("outcome")}
              isActive={transactionType === "outcome"}
            />
          </St.TransactionButtons>
          <CategorySelectButton
            title={category.name}
            onPress={() => handleOpenSelectCategoryModal()}
          />
        </St.Fields>
        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
