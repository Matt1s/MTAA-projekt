import React, {Component, useEffect} from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import Transaction from '../Transaction/Transaction';
import { styles } from './style';

export default function RecurringTransactions({navigation}) {


    return(
        <View style={styles.transactions}>
            <ScrollView>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="2.20" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add transaction')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
        </View>
    )
}