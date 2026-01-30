import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const WeightConverter = () => {
  const [kg, setKg] = useState('');
  const pounds = kg ? (parseFloat(kg) * 2.20462).toFixed(2) : '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter weight in Kg: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kg}
        onChangeText= {setKg}
      />
      <Text style={styles.resultText}>Weight in Pounds: {pounds} lbs</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.screen}>
      <WeightConverter />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Shadow for Android
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
