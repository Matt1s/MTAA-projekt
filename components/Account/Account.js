import React, {useEffect} from 'react'
import {View, Text, TouchableHighlight} from 'react-native';

import { styles } from './style';

function Account(props){

    useEffect(() => {
        
    }, [])

    return (
    <TouchableHighlight underlayColor="snow" style={styles.accountHolder} onPress = { () => {props.navigation.navigate('Account details', {id: props.id, amount: props.amount,account: props.name})}}>
        <>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.amount}>{props.amount}</Text>
        </>
    </TouchableHighlight>
    )
}

export default Account;