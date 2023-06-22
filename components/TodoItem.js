import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TodoItem({ todo, chooseTodo, chooseTodoForDelete }) {
  return (
    <Pressable
      onPress={() => {
        chooseTodo(todo);
      }}
    >
      <View style={styles.item}>
        <Text>{todo.title}</Text>
        <Pressable
          onPress={() => {
            chooseTodoForDelete(todo);
          }}
        >
          <Ionicons name="trash" size={20} color="red" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TodoItem;
