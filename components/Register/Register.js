import React, {useState} from 'react';
import {View, TextInput, Text, TouchableHighlight} from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
const baseUrl = 'http://localhost:12345';


/* to do */
async function registerUser(email, password) {
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

function Register({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return(
        <View style={styles.loginHolder}>
            <Text style={styles.appName}>BudgetApp</Text>
            <Text>Welcome in our app</Text>
            <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder="email"></TextInput>
            <TextInput style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder="password"></TextInput>
            <TextInput style={styles.textInput} onChangeText={(password) => setConfirmPassword(password)} placeholder="confirm password"></TextInput>
            <TouchableHighlight style={styles.button} onPress={() => registerUser(email,password)}><Text style={styles.buttonText}>Register</Text></TouchableHighlight>
            <Text style={styles.registerText}>Already have an account?</Text>
            <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
        </View>
    )
}

export default Register;