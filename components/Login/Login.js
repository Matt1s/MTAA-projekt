import React, {useState} from 'react';
import {View, TextInput, Text, TouchableHighlight} from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";


const URL = 'http://localhost:12345/'
const URLweb = 'http://budgetprogram.herokuapp.com/'

import axios from 'axios';

function connect() {
    global.socket = new SockJS(`${URLweb}stomp-endpoint/`);
    global.stompClient = stompClient = Stomp.over(socket);
    console.log('LOGIN CONNECT...')
    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/transactions', function(message) {
        console.log('SUBSCRIBED!')
        console.log('Received transactions: ' + message.body);
  })
  });
}

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

/*async function loadPhoto(){
  let imageUriLocal = ''
  let token = global.token
  let id = global.userId
  var config = {
    method: 'get',
    url: `${URLweb}userPhoto/${id}`,
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
  
}*/

async function getToken(email, password, navigation) {
  
  var config = {
    method: 'post',
    url: `${URLweb}login`,
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

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onError(){
      setError("Could not connect you to the server. Please refresh this page and try again!");
      console.log(error);
    };

    onConnected = () => {
      console.log("onConnected");

      // Subscribe to the Public Topic
      stompClient.subscribe("/topic/picture", this.onMessageReceived);
    
      // Tell your username to the server
      /*stompClient.send(
        "/api/chat/addUser/1",
        {},
        JSON.stringify({ sender: "Ali", type: "JOIN" })
      );*/
    }
    
    loadPhoto = () => {
      let id = global.userId
      console.log('LOADING PHOTO')
      if (id != null) {
        var socket = new SockJS(`${URLweb}userPhoto/${id}`);
        var stompClient = Stomp.over(socket);
        console.log('SOCKET CLIENT:')
        console.log(stompClient)
        stompClient.connect({}, this.onConnected, onError);
    
      }

      connect()
    }

    return(
        <View style={styles.loginHolder}>
            <Text style={styles.appName}>BudgetApp</Text>
            <Text style={{color: 'grey'}}>Welcome back</Text>
            <TextInput placeholderTextColor="grey" style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder="email"></TextInput>
            <TextInput placeholderTextColor="grey" secureTextEntry={true} style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder="password"></TextInput>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => getToken(email,password, navigation)}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableHighlight underlayColor="snow" style={styles.button} onPress={() => navigation.navigate('Register')}><Text style={styles.buttonText}>Register</Text></TouchableHighlight>
        </View>
    )
}

export default Login;