import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View, StatusBar } from "react-native";
import Todo from "./pages/Todo";

export default function App() {
  return (
    <View style={styles.container}>
      <ExpoStatusBar style="auto" />
      <Todo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 20,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
});
