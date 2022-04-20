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
        const unsubscribe = navigation.addListener('focus', () => {
        for(let i = 0; i<navigation.getState().routes.length; i++){
            if(navigation.getState().routes[i].name == "Add account"){
                console.log("=== ADD ACCOUNT ROUTES ===")
                console.log('route: ',navigation.getState().routes[i])
                try{
                    setEdited(navigation.getState().routes[i].params.edited)
                    if(navigation.getState().routes[i].params.edited){
                        console.log(navigation.getState().routes[i].params)
                        setAccountId(navigation.getState().routes[i].params.id)
                        setBalance(navigation.getState().routes[i].params.balance)
                        setName(navigation.getState().routes[i].params.name)
                        console.log('Editing account: ',accountId)
                    } else{
                        setName('')
                        setBalance(0)
                        setAccountId(null)
                        console.log('Adding new account')
                    }
                }
                catch(e) {
                    null
                }
            }
        }
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
            let id = global.userId
            console.log('USER ID',id)

            let config = {}
            let postURL = `http://budgetprogram.herokuapp.com/api/account/${id}`
            let putURL = `http://budgetprogram.herokuapp.com/api/account/${accountId}`
            if(accountId) {
                console.log('EDITING ACCOUNT')
                config = {
                    method: 'put',
                    url: putURL,
                    headers: { 'Authorization': `bearer ${token}`,
                'Content-type':'application/json' },
                    data:{"value": balance}
                  };
            } else {
                console.log('ADDING NEW ACCOUNT')
            config = {
                url: `${postURL}`,
                method: 'post',
                headers: { 'Authorization': `bearer ${token}` },
                data:{"name": name,
                "value": balance}
              };
            }
            axios(
                config
            )
            .then(function (response) {
                console.log(postURL)
                console.log('SUCCESS')
                let resStatus = response.status
                console.log(resStatus)
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
                console.log(postURL)
                console.log(name, balance)
            console.log('ERROR EDITING ACCOUNT')
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
                console.log(`http://budgetprogram.herokuapp.com/api/user/${id}/account/${accountId}`)
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