import React, {useEffect} from 'react'
import {View, Text, TouchableHighlight} from 'react-native';

import { styles } from './style';

function Account(props){

    useEffect(() => {
        props.navigation.setParams({
            id: props.id,
            name: props.name,
            amount: props.amount,
        })
    }, [])

    return (
    <TouchableHighlight underlayColor="snow" style={styles.accountHolder} onPress = { () => {props.navigation.navigate('Account details', props.id)}}>
        <>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.amount}>{props.amount}</Text>
        </>
    </TouchableHighlight>
    )
}

export default Account;