import React, {useState, useEffect} from 'react';
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import {styles} from './style';
import CheckBox from '@react-native-community/checkbox'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



function AddAccount({navigation},props) {

    const [toCount, setCount] = useState(false)
    const [balance, setBalance] = useState(0)
    const [name, setName] = useState('')
    const [edited, setEdited] = useState(false)
    const [accountId, setAccountId] = useState(0)

    useEffect(() => {
        console.log('routes')
        console.log(navigation.getState().routes)
        for(let i = 0; i<navigation.getState().routes.length; i++){
            console.log('route: ',navigation.getState().routes[i])
            if(navigation.getState().routes[i].name == "Add account"){
                try{
                    console.log('PARAMS ADD ACCOUNT')
                    console.log(navigation.getState().routes[i].params)
                    setAccountId(navigation.getState().routes[i].params.id)
                    setEdited(navigation.getState().routes[i].params.edited)
                    setBalance(navigation.getState().routes[i].params.balance)
                    setName(navigation.getState().routes[i].params.name)
                    console.log('Editing account: ',accountId)
                    console.log(edited)
                }
                catch(e) {
                    null
                }
            }
        }
        const unsubscribe = navigation.addListener('focus', () => {

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    function toggleToCount() {
        // toggle between recurring and non-recurring
        if (toCount) {
            setCount = false
        } else {
            setCount = true
        }
    }

    async function addAccount(accountId) {
        /* get current categories */
            let token = await AsyncStorage.getItem('token')
            .then(value =>{
                return JSON.parse(value)
            })
            let id = await AsyncStorage.getItem('id')
            .then(value =>{
                return JSON.parse(value)
            })

            let name = name

            let config = {}
            let putURL = `http://budgetprogram.herokuapp.com/api/account/${accountId}`
            if(accountId) {
                config = {
                    method: 'put',
                    url: putURL,
                    headers: { 'Authorization': `bearer ${token}`,
                'Content-type':'application/json' },
                    "value": balance
                  };
            } else {
            config = {
                url: `http://budgetprogram.herokuapp.com/api/account/${id}`,
                headers: { 'Authorization': `bearer ${token}` },
                "name": name,
                "value": balance
              };
            }
            axios.post(
                `http://budgetprogram.herokuapp.com/api/account/${id}`,
                config
            )
            .then(function (response) {
                console.log('SUCCESS')
                let resStatus = response.status
                console.log(resStatus)
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            console.log(putURL)
            console.log('ERROR EDITING ACCOUNT')
            console.log('token', token);
            console.log('id', accountId);
            })
            .finally(() => {
                navigation.navigate('Accounts')
            });
    }

    async function deleteAccount(accountId) {
        /* get current categories */
            let token = await AsyncStorage.getItem('token')
            .then(value =>{
                return JSON.parse(value)
            })
            let id = await AsyncStorage.getItem('id')
            .then(value => {
                return JSON.parse(value)
            })


            let config = {
                method: 'delete',
                url: `http://budgetprogram.herokuapp.com/api/user/${id}/account/${accountId}`,
                headers: { 'Authorization': `bearer ${token}` }
            };

            axios(
                config
            )
            .then(function (response) {
                console.log('SUCCESS DELETING')
                let resStatus = response.status
                console.log(resStatus)
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log('ERROR DELETING')
            console.log('token', token);
            console.log('id', id);
            })
            .finally(() => {
                navigation.navigate('Accounts')
            });
    }



    return(
<View style={styles.holder}>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Name of the account
                </Text>
                <TextInput style={styles.textInput} onChangeText={(name) => setName(name)}>
                    {name}
                </TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Balance
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(balance) => setBalance(balance)}>
                    {balance}
                </TextInput>
            </View>

            <View style={[styles.formGroup,{flexDirection: 'row', alignItems:'center'} ]}>
            <CheckBox
            tintColors={{true: 'green', false: 'red'}}  
                value={toCount}
                onValueChange={ () => toggleToCount()}
                style={styles.checkbox}
                />
            <Text style={styles.formLabel}>Add change of balance into transactions?</Text>
            </View>

            {edited ? 
            <>
                <TouchableHighlight underlayColor="snow" style={[styles.confirmButton,{backgroundColor: 'red', marginBottom: 20}]} onPress={() => deleteAccount(accountId)}>
                    <Text style={styles.toggleText}>Delete account</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="snow" style={styles.confirmButton} onPress={() => addAccount(accountId)}>
                    <Text style={styles.toggleText}>Change balance</Text>
                </TouchableHighlight>
            </>
            :
            <TouchableHighlight underlayColor="snow" style={styles.confirmButton} onPress={() => addAccount()}>
                <Text style={styles.toggleText}>Save new account</Text>
            </TouchableHighlight>
            }
        </View>
    )
}

export default AddAccount