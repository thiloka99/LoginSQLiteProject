import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { checkUser, showDataTable } from './db';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   
    checkUser(username, password, isLoggedIn => {
      if (isLoggedIn) {
        Alert.alert('Success', 'Login successful');
        console.log('username:Login:',username);
        console.log('password:Login:',password);
        navigation.navigate('Home'); // Navigate to the home screen after successful login
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    });
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    showDataTable();
  },[])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        // secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
