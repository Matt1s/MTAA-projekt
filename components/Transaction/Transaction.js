import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from "./style.js";

function Transaction(props) {

    let typeColor = 'red';

    if(props.amount >= 0){
        typeColor = 'green';
    }

    return (
    <TouchableHighlight underlayColor="snow" onPress={() => props.navigation.navigate('Add transaction')}>
      <View style={[styles.transaction, {backgroundColor: props.amount >= 0 ? '#88FF75' : '#FF7575'}]}>
        <View style={styles.leftSide}>
            <Text style={styles.category}>{props.category}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>
        <View style={styles.top}>
            <Text style={styles.timestamp}>
                {props.timestamp}
            </Text>
        </View>
        <View style={styles.rightSide}>
            <Text style={styles.amount}>{props.amount}€</Text>
            <Text style={styles.account}>{props.amount >= 0 ? 'to: ' : 'from: '}{props.account}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
} 

export default Transaction;