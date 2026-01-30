import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

interface Expense {
  id: number;
  desc: string;
  amount: number;
}

const PersonalBudgetApp = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setBalance(income - totalExpenses);
  }, [income, expenses]);

  const addExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, { id: Date.now(), desc: description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  // Snippet for querying a web service (e.g., external bank accounts)
  // This fetches mock transaction data from a placeholder API and adds to expenses
  const fetchBankTransactions = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Placeholder for bank API
      const data = await response.json();
      // Assuming data is transactions: map to expenses (in real app, parse amounts in Naira)
      const newExpenses = data.slice(0, 3).map((item: any, index: number) => ({
        id: Date.now() + index,
        desc: `Transaction ${item.id}`,
        amount: Math.random() * 100, // Mock amount
      }));
      setExpenses(prevExpenses => [...prevExpenses, ...newExpenses]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseDesc}>{item.desc}</Text>
      <Text style={styles.expenseAmount}>₦{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Budget App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter monthly income"
        keyboardType="numeric"
        value={income.toString()}
        onChangeText={(text) => setIncome(parseFloat(text) || 0)}
      />
      <Text style={styles.balance}>Balance: ₦{balance.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.buttonRow}>
        <Button title="Add Expense" onPress={addExpense} />
        <Button title="Fetch Transactions" onPress={fetchBankTransactions} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExpense}
        style={styles.expenseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a4d2e',
  },
  input: {
    height: 48,
    borderColor: '#b0b0b0',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 17,
    marginBottom: 12,
    backgroundColor: '#fafbfc',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a4d2e',
    backgroundColor: '#e6f7ef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  expenseList: {
    marginTop: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseDesc: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalBudgetApp;