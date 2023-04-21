import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Platform,
  FlatList,
} from "react-native";

import { themes } from "../utils/themes";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface ISkillData {
  id: string;
  title: string;
  date?: Date;
}

function Home(): JSX.Element {
  const [newSkill, setNewSkill] = useState<ISkillData>({ id: "", title: "" });
  const [skills, setSkills] = useState<ISkillData[]>([]);
  const [greetings, setGreetings] = useState<string>("");

  const handleAddNewSkill = () => {
    setSkills((oldSkills) => [...oldSkills, newSkill]);
  };
  const handleRemoveSkill = (skillId: string) => {
    setSkills((oldState) => oldState.filter((skill) => skill.id != skillId));
  };

  const handleInputChange = (text: string) => {
    const data: ISkillData = {
      id: String(new Date().getTime()) + text + Math.random(),
      title: text,
      date: new Date(0),
    };

    setNewSkill(data);
  };

  useEffect(() => {
    const currentHour = new Date().getHours() - 3;
    if (currentHour < 12) {
      setGreetings("Good morning");
    } else if (currentHour < 18) {
      setGreetings("Good afternoon");
    } else {
      setGreetings("Good night");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Giovani</Text>
      <Text style={styles.greetings}>{greetings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor={themes.colors.gray.light}
        onChangeText={(text) => handleInputChange(text)}
      />
      <Button onPress={handleAddNewSkill} title="Add" />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            onPress={() => handleRemoveSkill(item.id)}
            title={item.title}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.black.main,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    color: themes.colors.white.main,
    fontSize: 24,
    fontWeight: "bold",
  },
  greetings: {
    color: themes.colors.white.main,
  },
  input: {
    backgroundColor: themes.colors.gray.dark,
    color: themes.colors.white.main,
    fontSize: 18,
    padding: Platform.OS == "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
});
export { Home };
