import React, {Component, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableHighlight, Image} from 'react-native';
import Transaction from '../Transaction/Transaction';
import { styles } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";

const URLweb = 'http://budgetprogram.herokuapp.com/'

export default function Transactions({navigation}) {

    useEffect(() => {
        connect()
        getTransactions()
        const unsubscribe = navigation.addListener('focus', () => {
          getTransactions()
          console.log('===== TRANSACTIONS FOCUSED =====')
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const [transactions, setTransactions] = useState([])


    function connect() {
        var socket = new SockJS(`${URLweb}stomp-endpoint`);
        var stompClient = stompClient = Stomp.over(socket);
        console.log('TRANSACTIONS CONNECT...')
        stompClient.connect({}, function(frame) {
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/transaction', function(message) {
            console.log('SUBSCRIBED!')
            console.log('Received transactions: ' + message.body);
            let data = JSON.parse(message.body)

            let newTransactions = transactions

            console.log("data: statusCodeValue:",data["statusCodeValue"])
            console.log("data: statusCodeValue:",data.statusCodeValue)

            if ((data.statusCodeValue != 204 && data.statusCodeValue != 404) || data.statusCodeValue == undefined){
                newTransactions.push(data)
            }
            getTransactions()
        })
    });
    }

    async function getTransactions() {
        let transactions = []
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })
        let id = await AsyncStorage.getItem('id')
        .then(value =>{
            return JSON.parse(value)
        })
  
        const config = {
            headers: { Authorization: `bearer ${global.token}` },
            params: {
                'id': id
            }
        };
        
        axios.get(
            `http://budgetprogram.herokuapp.com/api/getTransactions`,
            config
        )
        .then(function (response) {
          console.log('SUCCESS 1')
            let resStatus = response.status
            console.log(resStatus)
            /*console.log(JSON.stringify(response.data))*/
            transactions = response.data
            console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            setTransactions(transactions)
            console.log("TRANSACTIONS:",transactions)
        });
    }

    function getDays(timestamp){
        /* current date */
        let date = new Date(timestamp)
        let currentDate = new Date()

        /* count difference in days */
        let diff = Math.abs(date.getTime() - currentDate.getTime())
        let diffDays = Math.floor(diff / (1000 * 3600 * 24))

        if(diffDays === 0){
            return 'Today'
        }
        else if(diffDays === 1){
            return 'Yesterday'
        }
        else{
            return diffDays + ' days ago'
        }

    }

    const[imageUri, setImageUri] = useState('https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png')

    async function loadPhoto(){
        let imageUriLocal = ''
        let token = global.token
        let id = global.userId
        var config = {
          method: 'get',
          url: `http://budgetprogram.herokuapp.com/userPhoto/${id}`,
          headers: { 'Authorization': `bearer ${token}` },
        };
        axios(config)
        .then(function (response) {
          console.log('SUCCESS - photo loaded')
            let byteArray = response.data
            imageUriLocal =  `data:image/png;base64,${byteArray}`
            console.log(imageUriLocal)
            /*setImageUri(imageUriLocal)*/
        })
        .catch(function (error) {
          console.log(error)
        })
        
      }

    return(
        <View style={styles.transactions}>
            <Image style={styles.imageHolder} source={{uri: global.photo}}/>
            <ScrollView contentContainerStyle={styles.transactions} >
                {transactions ? transactions.map((transaction, index) => {
                    let days = getDays(transaction.addedAt)
                    console.log('single transaction: ',transaction)
                    return <Transaction id={transaction['id']} key={index} edited={true} navigation={navigation} categoryName={transaction.category.name} categoryId={transaction.category.id} description={transaction.description} amount={transaction.amount} accountName={transaction.account.name} accountId={transaction.account.id} timestamp={days}/>
                }) : console.log('No categories')}
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add transaction', {edited: false})}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
        </View>
    )
}