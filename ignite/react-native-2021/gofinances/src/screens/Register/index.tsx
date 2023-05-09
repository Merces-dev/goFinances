import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Control, FieldValues, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Preço não pode ser negativo")
    .required("Preço é obrigatório"),
});
export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit, formState: {errors} } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });
  const formControl = control as unknown as Control<FieldValues, any>

  const handleTransactionSelect = (type: "income" | "outcome") =>
    setTransactionType(type);

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  const handleRegister = (form: IFormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <St.Container>
        <St.Header>
          <St.Title>Cadastro</St.Title>
        </St.Header>

        <St.Form>
          <St.Fields>
            <InputForm
              name="name"
              control={formControl}
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              error={errors.name && errors?.name.message}
            />

            <InputForm
              name="amount"
              control={formControl}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors?.amount.message}
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
    </TouchableWithoutFeedback>
  );
}
