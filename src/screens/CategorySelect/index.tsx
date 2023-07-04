import React from "react";

import * as St from "./styles";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import { Button } from "../../components/Forms/Button";

interface ICategoryProps {
  key: string;
  name: string;
}
interface IProps {
  category: ICategoryProps;
  setCategory: (category: ICategoryProps) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: IProps) => {
  const handleCategorySelect = (item: ICategoryProps) => setCategory(item);

  return (
    <St.Container>
      <St.Header>
        <St.Title>Categoria</St.Title>
      </St.Header>
      <FlatList
        data={categories}
        horizontal={false}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <St.Category
            onPress={() => handleCategorySelect(item)}
            isActive={item.key === category.key}
          >
            <St.Icon name={item.icon} />
            <St.Name>{item.name}</St.Name>
          </St.Category>
        )}
        ItemSeparatorComponent={() => <St.Separator />}
      />
      <St.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </St.Footer>
    </St.Container>
  );
};
