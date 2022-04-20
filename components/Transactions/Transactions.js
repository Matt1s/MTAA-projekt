import React, {Component, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableHighlight, Image} from 'react-native';
import Transaction from '../Transaction/Transaction';
import { styles } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Transactions({navigation}) {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getTransactions()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const [transactions, setTransactions] = useState([])



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
            headers: { Authorization: `bearer ${token}` }
        };
        
        axios.get(
            `http://budgetprogram.herokuapp.com/api/transactions/${id}`,
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
            /*console.log(transactions)*/
        });
    }

    useEffect(() => {
        getTransactions()
    }, [])

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
            <Image style={{width: 100, height: 100}} source={{uri: global.photo}}/>
            <ScrollView>
                {transactions ? transactions.map((transaction, index) => {
                    let days = getDays(transaction.addedAt)
                    console.log('single transaction: ',transaction['id'])
                    return <Transaction id={transaction['id']} key={index} edited={true} navigation={navigation} categoryName={transaction.category.name} categoryId={transaction.category.id} description={transaction.description} amount={transaction.amount} accountName={transaction.account.name} accountId={transaction.account.id} timestamp={days}/>
                }) : console.log('No categories')}
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add transaction', {edited: false})}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
        </View>
    )
}