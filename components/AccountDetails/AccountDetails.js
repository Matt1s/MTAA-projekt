import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TouchableHighlight, View} from 'react-native';
import { styles } from './style';
import Transaction from '../Transaction/Transaction';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
function AccountDetails({navigation},props) {

    const [amount, setAmount] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [accountId, setAccountId] = useState('');
    const [balance,setBalance] = useState(0);
    const [name, setName] = useState('');



    async function getAccountDetails(id){
        let transactions = [] 
        let token = await AsyncStorage.getItem('token')
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
            transactions = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            setTransactions(transactions)
        });
      }
    


      useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
            setName(navigation.getState().routes[0].params.account)
            setAccountId(navigation.getState().routes[0].params.id)
            setBalance(navigation.getState().routes[0].params.amount)
            console.log('NAV: ', navigation)
            console.log('NAV: ', navigation.getState())
            console.log('ACC NAME: '+name)
            console.log('ACC ID: '+accountId)
            getAccountDetails(accountId)
        });
        
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return(
        <>
            <ScrollView contentContainerStyle={styles.accountDetails}>
                <Text style={styles.accountName}>{name}</Text>
                <Text style={styles.balance}>Balance: <Text style={styles.balanceValue}>{balance}</Text>€</Text>
                <Text style={styles.textLastTransactions}>Last transactions:</Text>
                {transactions.map((transaction, index) => {
                    return(
                        <Transaction id={transaction['id']} key={index} edited={true} navigation={navigation} categoryName={transaction.category.name} categoryId={transaction.category.id} description={transaction.description} amount={transaction.amount} accountName={transaction.account.name} accountId={transaction.account.id} timestamp={days}/>
                    )
                })}
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.editAccount} onPress={() => navigation.navigate('Add account')}>
                <Text style={styles.editAccountText}>Edit account</Text>
            </TouchableHighlight>
        </>
    )
}

export default AccountDetails