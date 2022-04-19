import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';

import Account from '../Account/Account';
import { styles } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Accounts({navigation}) {

    const [accounts, setAccounts] = useState([])
    const [total, setTotal] = useState(0)

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
            `http://budgetprogram.herokuapp.com/api/accounts/${id}`,
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

      useEffect(() => {
        getAccounts()
        const unsubscribe = navigation.addListener('focus', () => {
            getAccounts()
        });
    
        return unsubscribe;
      }, [navigation]);

    return (
        <>
        <ScrollView>
            <Text style={styles.total}>Total: <Text style={{fontWeight: 'bold'}}>{total}</Text>€</Text>
            {accounts ? accounts.map((account, index) => {
                return <Account navigation={navigation} key={index} name={account.name} id={account.id} amount={account.value} delete={() => deleteaccount(account.id)}/>
            }) : console.log('No accounts')}
        </ScrollView>
        <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add account')}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableHighlight>
        </>
    )
}