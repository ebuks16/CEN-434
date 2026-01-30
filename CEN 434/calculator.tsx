import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value: string) :void => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        // ⚠️ eval is used for simplicity; in production use a math parser
        setResult(eval(input).toString());
      } catch (e) {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C"],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // fixed hex color
    padding: 16,
    justifyContent: "flex-start",
  },
  display: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  input: {
    fontSize: 28,
    color: "#333",
  },
  result: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  buttons: {
    flex: 2,
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#000",
  },
});