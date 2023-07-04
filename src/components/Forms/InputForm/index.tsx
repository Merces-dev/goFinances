import React from "react";
import { TextInputProps } from "react-native";

import * as St from "./styles";
import { Control, Controller } from "react-hook-form";
import { Input } from "../Input";

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

export const InputForm = ({ control, name, error, ...rest }: IProps) => {
  return (
    <St.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <St.Error>{error}</St.Error>}
    </St.Container>
  );
};
