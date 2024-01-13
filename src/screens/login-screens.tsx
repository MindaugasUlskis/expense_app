import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { loginOrRegister } from '../utils/functions/loginOrRegister';
import Colors from '../utils/palette';


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const LoginScreen = ({ navigation }: { navigation: ScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    loginOrRegister(email, password, navigation)
      .catch((err) => {
        setError(err.message || 'An error occurred during login');
      });
  };

  const fillMockData = () => {
    setEmail('mindaugas@gmail.com');
    setPassword('mock1234');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text >{error}</Text> : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={fillMockData}>
        <Text style={styles.buttonText}>Mock</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    paddingBottom: 80,
    color: Colors.secondary
  },
  inputContainer: {
    marginBottom: 10,
    width: '80%',
  },
  label: {
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    padding: 10,
  },
  loginButton:{
    backgroundColor: Colors.helper1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    width: '50%',
    elevation: 10,
  },
  buttonText:{
    fontSize: 24,
  }
});

export default LoginScreen;
