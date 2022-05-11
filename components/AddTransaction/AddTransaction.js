import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, TextInput, ScrollView} from 'react-native';
import DatePickerX from '../DatePicker/DatePicker';
import DropDown from '../DropDownPicker/DropDownPicker'
import CheckBox from '@react-native-community/checkbox'
import { styles } from "./style.js";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransaction({navigation}, props) {

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [account, setAccount] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [date, setDate] = useState('')
    const [edited, setEdited] = useState(false)
    const [isCredit, setIsCredit] = useState(false)
    const [isDebit, setIsDebit] = useState(false)
    const [isRecurring, setIsRecurring] = useState(false)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        for(let i = 0; i<navigation.getState().routes.length; i++){
            if(navigation.getState().routes[i].name == "Add transaction"){
                console.log("=== ADD TRANSACTION ROUTES ===")
                console.log('route: ',navigation.getState().routes[i])
                console.log('PARAMS')
                console.log(navigation.getState().routes[i].params)
                setTransactionId(navigation.getState().routes[i].params.id)
                setEdited(navigation.getState().routes[i].params.edited)
                console.log('Editing transaction: ',transactionId)
            }
        }

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    function toggleType(value) {
        console.log('isCredit: ',value)
        // toggle between credit and debit
        if (value && amount >= 0) {
            setIsCredit(true)
            setIsDebit(false)
        } else {
            setIsCredit(false)
            setIsDebit(true)
        }
    }

    function toggleRecuring() {
        // toggle between recurring and non-recurring
        if (isRecurring) {
            setIsRecurring(false)
        } else {
            setIsRecurring(true)
        }
    }

    async function addTransaction(transactionId){
        let amountNew
        if( isCredit && amount > 0) {
                amountNew = amount
        }
        else if(isDebit && amount > 0) {
                amountNew = -amount
        } 
        else {
            alert('Please enter all data')
            return
        }
        console.log('amount: ', amount)
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })

        let id = await AsyncStorage.getItem('id')
        .then(value =>{
            return JSON.parse(value)
        })

        /*axios.post(`http://budgetprogram.herokuapp.com/api/transaction/${account}/${category}`,
            {headers: { 'Authorization': `bearer ${token}` },
            amount: amountNew}
        )
        .then(function (response) {
        console.log('SUCCESS')
        console.log(response.status)
        })
        .catch(function (error) {
            console.log('amount', amount, 'accountId', account, 'categoryId', category)
        })
        .finally(() => {
            navigation.navigate('Transactions')
        })*/
        let stompClient = global.stompClient
        if(transactionId){
            stompClient.send(`/app/putTransaction`, (JSON.stringify({"id":transactionId,"categoryId":category,"accountId":account,"amount":amountNew, "description":description, "isRecurring":isRecurring})))
            console.log('EDITING TRANSACTION')
        } else {
            /* generate random number between 1000 and 1000000 */
            let random = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000
            stompClient.send(`/app/postTransaction`, (JSON.stringify({"id":random, "categoryId":category, "accountId":account, "amount":amountNew, "description":description, "isRecurring":isRecurring})))
            console.log('ADDED TRANSACTION')
        }
        navigation.navigate('Transactions')
    }
    function handleAccount(account) {
        setAccount(account)
        console.log('changing account', account)
    }

    function handleCategory(category) {
        setCategory(category)
        console.log('changing cat', category)
    }

    async function removeTransaction(transactionId){
        let stompClient = global.stompClient
        stompClient.send(`/app/deleteTransaction`, transactionId)
        console.log('DELETING TRANSACTION')

        navigation.navigate('Transactions')
    }

    return (
        <ScrollView contentContainerStyle={styles.holder}>
            <View style={styles.formGroup}>
                {/* credit or debit toggle */}
                <Text style={styles.formLabel}>
                    Type of transaction
                </Text>
                <View style={styles.toggleHolder}>
                    <TouchableHighlight underlayColor="snow" style={[styles.toggle1, {backgroundColor: isCredit ? 'grey':'white'}]}  onPress={ () => toggleType(true) }>
                        <Text style={styles.toggleText}>
                            Credit
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="snow" style={[styles.toggle2, {backgroundColor: isDebit ? 'grey':'white'}]} onPress={() => toggleType(false)}>
                        <Text style={styles.toggleText}>
                            Debit
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Amount
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(amount) => {setAmount(amount)}}>
                    {amount}
                </TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    {isCredit ? 'To: ' : 'From: '}
                </Text>
                <View style={{position: 'relative',zIndex: 2000}}>
                    <DropDown type={"account"} handleChange={(account) => handleAccount(account)}/>
                </View>
                <Text style={styles.formLabel}>
                    Category
                </Text>
                <View style={{position: 'relative',zIndex: 1000}}>
                    <DropDown type={"category"} handleChange={(category) => handleCategory(category)}/>
                </View>
            </View>



            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Date and time
                </Text>
                <DatePickerX/>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Description
                </Text>
                <TextInput style={styles.textInput} onChangeText={(desc) => setDescription(desc)}>
                    {description}
                </TextInput>
            </View>

            <View style={[styles.formGroup,{flexDirection: 'row', alignItems:'center'} ]}>
            <CheckBox
            tintColors={{true: 'green', false: 'red'}}  
                value={isRecurring}
                onValueChange={ () => toggleRecuring()}
                style={styles.checkbox}
                />
            <Text style={styles.formLabel}>transaction is recurring</Text>
            </View>

            {isRecurring ?
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    How often should transaction occur? (days)
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric'>

                </TextInput>
            </View>
            : null}
            <View style={styles.toggleHolder}>
            {edited ? 
            <><TouchableHighlight underlayColor="snow" style={styles.removeButton} onPress={() => removeTransaction(transactionId)}>
                <Text style={styles.toggleText}>Remove transaction</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="snow" style={styles.confirmButton} onPress={() => addTransaction(transactionId)}>
                <Text style={styles.toggleText}>Confirm transaction</Text>
            </TouchableHighlight>
            </>
            : 
            <TouchableHighlight underlayColor="snow" style={styles.confirmButtonOrig} onPress={() => addTransaction()}>
                <Text style={styles.toggleText}>Confirm transaction</Text>
            </TouchableHighlight>
            }
        </View>

        </ScrollView>
    )
} 