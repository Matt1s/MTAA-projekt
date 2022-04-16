import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native';

import { styles } from './style';

function Account(props){
    return (
    <TouchableHighlight underlayColor="snow" style={styles.accountHolder} onPress = { () => {props.navigation.navigate('Account details')}}>
        <>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.amount}>{props.amount}</Text>
        </>
    </TouchableHighlight>
    )
}

export default Account;