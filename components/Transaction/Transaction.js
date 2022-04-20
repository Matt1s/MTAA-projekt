import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from "./style.js";

function Transaction(props) {

    let typeColor = 'red';

    if(props.amount >= 0){
        typeColor = 'green';
    }

    useEffect(() => {

    }, [])

    return (
    <TouchableHighlight underlayColor="snow" onPress={() => props.navigation.navigate('Add transaction',
    {
        id: props.id,
        edited: props.edited,
        category: props.categoryName,
        account: props.accountName,
        amount: props.amount,
        description: props.description,
        date: props.date
    })}>
      <View style={[styles.transaction, {backgroundColor: props.amount >= 0 ? '#88FF75' : '#FF7575'}]}>
        <View style={styles.leftSide}>
            <Text style={styles.category}>{props.categoryName}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>
        <View style={styles.top}>
            <Text style={styles.timestamp}>
                {props.timestamp}
            </Text>
        </View>
        <View style={styles.rightSide}>
            <Text style={styles.amount}>{props.amount}€</Text>
            <Text style={styles.account}>{props.amount >= 0 ? 'to: ' : 'from: '}{props.accountName}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
} 

export default Transaction;