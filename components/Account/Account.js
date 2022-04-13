import React from 'react'
import {View, Text} from 'react-native';

import { styles } from './style';

function Account(props){
    return (
    <View style={styles.accountHolder}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.amount}>{props.amount}</Text>
    </View>
    )
}

export default Account;