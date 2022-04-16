import React, {useState} from 'react';
import {View, TextInput, Text, TouchableHighlight} from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
const baseUrl = 'http://localhost:12345';

async function getUser(email, password) {
    try {
      const response = await axios.get(baseUrl+'/login', {
          params: {
                email: email,
                password: password
          }
      })
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.loginHolder}>
            <Text style={styles.appName}>BudgetApp</Text>
            <Text>Welcome back</Text>
            <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder="email"></TextInput>
            <TextInput style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder="password"></TextInput>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => getUser(email,password)}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => navigation.navigate('Register')}><Text style={styles.buttonText}>Register</Text></TouchableHighlight>
        </View>
    )
}

export default Login;