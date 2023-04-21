import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from "react-native";
import { themes } from "../utils/themes";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}
export const Button = ({ title, ...rest }: IButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: themes.colors.purple.dark,
    padding: Platform.OS == "ios" ? 20 : 15,
    borderRadius: 7,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: themes.colors.white.main,
    fontSize: 17,
    fontWeight: "bold",
  },
});
