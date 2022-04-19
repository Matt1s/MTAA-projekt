import React, {useState} from 'react';
import {View, TextInput, Text, TouchableHighlight} from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

async function saveData(data, navigation){
  try{
    await AsyncStorage.setItem('token', JSON.stringify(data.token))
    await AsyncStorage.setItem('id', JSON.stringify(data.id))
    await AsyncStorage.setItem('role', JSON.stringify(data.role))
    await AsyncStorage.setItem('email', JSON.stringify(data.email))
    console.log('USER SAVED TO STORAGE')
    console.log('Logged in as: '+ JSON.stringify(data.email))
    navigation.navigate('Transactions')

    global.email = data.email
  } catch(e){
    console.log(e)
  }
}

async function getToken(email, password, navigation) {
  
  var config = {
    method: 'post',
    url: 'http://budgetprogram.herokuapp.com/login',
    data: {
      email:email,
      password:password
    },
  };
  
  axios(config)
  .then(function (response) {
    console.log('LOGIN SUCCESS')
    let resStatus = response.status
    if(resStatus == 200){
      saveData(response.data, navigation)
    }
  })
  .catch(function (error) {
    console.log(error)
    alert('Invalid email or password')
  });
}



function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.loginHolder}>
            <Text style={styles.appName}>BudgetApp</Text>
            <Text>Welcome back</Text>
            <TextInput placeholderTextColor="grey" style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder="email"></TextInput>
            <TextInput placeholderTextColor="grey" secureTextEntry={true} style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder="password"></TextInput>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => getToken(email,password, navigation)}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => navigation.navigate('Register')}><Text style={styles.buttonText}>Register</Text></TouchableHighlight>
        </View>
    )
}

export default Login;