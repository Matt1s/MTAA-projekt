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
    global.token = data.token
    global.userId = data.id
  } catch(e){
    console.log(e)
  } finally {
    loadPhoto()
  }
}

async function loadPhoto(){
  let imageUriLocal = ''
  let token = global.token
  let id = global.userId
  var config = {
    method: 'get',
    url: `http://budgetprogram.herokuapp.com/userPhoto/${id}`,
    headers: { 'Authorization': `bearer ${token}`,
              'Content-Type':'image/jpg' },
  };
  axios(config)
  .then(function (response) {
    console.log('SUCCESS - photo loaded')
      let byteArray = response.data
      console.log(response)
      console.log('length: ',byteArray.length)
      imageUriLocal = `data:image/jpg;base64,${byteArray}`
      console.log('length: ',imageUriLocal.length)
      console.log(byteArray)
      global.photo = imageUriLocal
  })
  .catch(function (error) {
    console.log(error)
  })
  
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
  })
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