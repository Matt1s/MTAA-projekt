import React, {Component, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import Transaction from '../Transaction/Transaction';
import { styles } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Transactions({navigation}) {

    React.useEffect(() => {
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
          console.log('SUCCESS')
            let resStatus = response.status
            console.log(resStatus)
            console.log(JSON.stringify(response.data))
            transactions = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            setTransactions(transactions)
            console.log(transactions)
        });
    }

    useEffect(() => {
        getTransactions()
    }, [])

    function getDays(timestamp){
        /* current date */
        let date = new Date(timestamp)
        let currentDate = new Date()
        console.log(currentDate)
        let currentDay = currentDate.getDate()
        console.log(timestamp)

        /* count difference in days */
        let diff = Math.abs(date.getTime() - currentDate.getTime())
        let diffDays = Math.floor(diff / (1000 * 3600 * 24))
        console.log(diffDays)

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


    return(
        <View style={styles.transactions}>
            <ScrollView>
                {transactions ? transactions.map((transaction, index) => {
                    let days = getDays(transaction.addedAt)
                    console.log('single: ',transaction['id'])
                    return <Transaction id={transaction['id']} key={index} edited={true} navigation={navigation} categoryName={transaction.category.name} categoryId={transaction.category.id} description={transaction.description} amount={transaction.amount} accountName={transaction.account.name} accountId={transaction.account.id} timestamp={days}/>
                }) : console.log('No categories')}
                {/*<Transaction navigation={navigation} category="Food" description="obed v eate" amount="2.20" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
            <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>*/}
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add transaction', {edited: false})}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
        </View>
    )
}