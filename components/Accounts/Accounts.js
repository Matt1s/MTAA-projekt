import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';

import Account from '../Account/Account';
import { styles } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";

const URLweb = 'http://budgetprogram.herokuapp.com/'


export default function Accounts({navigation}) {
    
    useEffect(() => {
    getAccounts()
    connect()
    const unsubscribe = navigation.addListener('focus', () => {
        getAccounts()
    });

    return unsubscribe;
    }, [navigation]);

    const [accounts, setAccounts] = useState([])
    const [total, setTotal] = useState(0)

    function connect() {
        var socket = new SockJS(`${URLweb}stomp-endpoint`);
        var stompClient = stompClient = Stomp.over(socket);
        console.log('ACCOUNTS CONNECT...')
        stompClient.connect({}, function(frame) {
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/account', function(message) {
            console.log('SUBSCRIBED!')
            console.log('Received accounts: ' + message.body);
            let data = JSON.parse(message.body)
            let newAccounts = accounts
            console.log("data:", data)
            console.log("data: statusCodeValue:",data["statusCodeValue"])
            console.log("data: statusCodeValue:",data.statusCodeValue)

            if ((data.statusCodeValue != 204 && data.statusCodeValue != 404) || data.statusCodeValue == undefined){
                newAccounts.push(data)
            }

            getAccounts(newAccounts)
            console.log('ACCOUNT NEW:', accounts)
        })
    });
    }

    async function getAccounts() {
        let fetchAccounts = []
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })
        let id = await AsyncStorage.getItem('id')
        .then(value =>{
            return JSON.parse(value)
        })
  
        const config = {
            headers: { Authorization: `bearer ${token}` }
        };
        
        axios.get(
            `${URLweb}api/accounts/${id}`,
            config
        )
        .then(function (response) {
          console.log('SUCCESS')
            let resStatus = response.status
            fetchAccounts = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            setAccounts(fetchAccounts)
            let total = 0
            for(let i = 0; i < fetchAccounts.length; i++){
                total += fetchAccounts[i].value
            }
            setTotal(total)
        });

      }

    return (
        <>
        <ScrollView>
            <Text style={styles.total}>Total: <Text style={{fontWeight: 'bold'}}>{total}</Text>€</Text>
            {accounts ? accounts.map((account, index) => {
                return <Account navigation={navigation} key={index} name={account.name} id={account.id} amount={account.value} delete={() => deleteaccount(account.id)}/>
            }) : console.log('No accounts')}
        </ScrollView>
        <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add account', {edited: false})}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableHighlight>
        </>
    )
}