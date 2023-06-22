import React, { useReducer } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import TodoItem from "../components/TodoItem";

const initialState = {
  todos: [],
  title: "",
  selectedTodo: null,
};

const actions = {
  CHANGE_TITLE: "change_title",
  ADD_TODO: "add_todo",
  CHOOSE_TODO: "choose_todo",
  UPDATE_TODO: "update_todo",
  CHOOSE_TODO_FOR_DELETE: "choose_todo_for_delete",
  DELETE_TODO: "delete_todo",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case actions.CHOOSE_TODO:
      const { title } = action.payload;
      return {
        ...state,
        selectedTodo: action.payload,
        title,
      };
    case actions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        title: "",
      };
    case actions.UPDATE_TODO:
      const todo = state.todos.find(
        (todo) => todo.id === state.selectedTodo.id
      );
      todo.title = state.title;
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== state.selectedTodo.id),
          todo,
        ],
        title: "",
        selectedTodo: null,
      };
    case actions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      break;
  }
};

function Todo() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  console.log(state);

  const addTodo = () => {
    if (!state.title) return;

    dispatch({
      type: actions.ADD_TODO,
      payload: { id: state.todos.length, title: state.title },
    });
  };

  const chooseTodoToUpdate = (todo) => {
    dispatch({ type: actions.CHOOSE_TODO, payload: todo });
  };

  const updateTodo = () => {
    if (!state.title) return;

    dispatch({ type: actions.UPDATE_TODO });
  };

  const deleteTodo = (todo) => {
    Alert.alert("Delete Confirmation", "Are you sure to delete this item?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch({ type: actions.DELETE_TODO, payload: todo.id });
        },
      },
    ]);
  };

  return (
    <View>
      <Text>Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={state.title}
          onChangeText={(text) =>
            dispatch({ type: actions.CHANGE_TITLE, payload: text })
          }
        />
        <Button
          title="Submit"
          onPress={state.selectedTodo ? updateTodo : addTodo}
        />
      </View>
      <View style={styles.todoContainer}>
        {state.todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            chooseTodo={chooseTodoToUpdate}
            chooseTodoForDelete={deleteTodo}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    columnGap: 8,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    flex: 1,
  },
  button: {
    alignItems: "center",
  },
  todoContainer: {
    paddingVertical: 8,
  },
});

export default Todo;
