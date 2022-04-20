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

        if( (isCredit || isDebit) && amount > 0) {
            let amountNew = amount
            if(isDebit) {
                amountNew = -amount
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

        let config = {};

        if(transactionId){
            config = {
                headers: { 'Authorization': `bearer ${token}` },
                amount: amount,
                method: 'put'
            }
        } else {
            config = {
                headers: { 'Authorization': `bearer ${token}` },
                amount: amount,
                method: 'post'
            }
        }
        axios.post(`http://budgetprogram.herokuapp.com/api/transaction/${account}/${category}`,
            config
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
        })
        } else {
            alert('Please enter all data')
        }
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
        console.log('deleting transaction id: ',transactionId)
        var config = {
            headers: { 'Authorization': `bearer ${token}` },
        };
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })
        axios.delete(`http://budgetprogram.herokuapp.com/api/transaction/${transactionId}`,
            config
        )
        .then(function (response) {
        console.log('SUCCESS')
        console.log(response.status)
        })

        .catch(function (error) {
            console.log(error)
        })
        .finally(() => {
            navigation.navigate('Transactions')
        })
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