import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { List, InputItem, WhiteSpace } from '@ant-design/react-native';
import { loginOrRegister } from '../utils/functions/loginOrRegister';


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const LoginScreen = ({ navigation }: { navigation: ScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    loginOrRegister(email, password, navigation)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default LoginScreen;
