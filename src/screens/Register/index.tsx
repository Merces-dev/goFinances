import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Control, FieldValues, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import * as St from "./styles";
import { InputForm } from "../../components/Forms/InputForm";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { useAuth } from "../../hooks/auth";

interface IFormData {
  name: string;
  amount: string;
}
type NavigationProps = {
  navigate: (screen: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Preço não pode ser negativo")
    .required("Preço é obrigatório"),
});
export function Register() {
  const navigation = useNavigation<NavigationProps>();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();
  const collectionKey = `@gofinances:transactions_user:${user.id}`;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });
  const formControl = control as unknown as Control<FieldValues, any>;

  const handleTransactionSelect = (type: "positive" | "negative") =>
    setTransactionType(type);

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  const handleRegister = async (form: IFormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const convertedData = data ? JSON.parse(data) : [];
      const newData = [...convertedData, newTransaction];

      await AsyncStorage.setItem(collectionKey, JSON.stringify(newData));
      clearData();
      navigation.navigate("Listagem");
    } catch (error) {
      Alert.alert("Não foi possível salvar!");
      console.log(error);
    }
  };
  const clearData = () => {
    reset();
    setTransactionType("");
    setCategory({
      key: "category",
      name: "Categoria",
    });
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
                type="positive"
                onPress={() => handleTransactionSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="negative"
                onPress={() => handleTransactionSelect("negative")}
                isActive={transactionType === "negative"}
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
