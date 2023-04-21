import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { themes } from "../utils/themes";

interface ISkillCard extends TouchableOpacityProps {
  title: string;
}

export const SkillCard = ({ title, ...rest }: ISkillCard) => {
  return (
    <TouchableOpacity
      style={[styles.buttonSkill]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.textSkill]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: themes.colors.gray.dark,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 5,
  },
  textSkill: {
    color: themes.colors.white.main,
    fontSize: 22,
    fontWeight: "bold",
  },
});
