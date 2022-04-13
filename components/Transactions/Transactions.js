import React, {Component} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import Transaction from '../Transaction/Transaction';
import { styles } from './style';

export default function Transactions(navigation) {
    return(
        <View style={styles.transactions}>
            <ScrollView>
                <Transaction category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>

                <Transaction category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
                <Transaction category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
            </ScrollView>
            <View style={styles.addButton}>
                <Button title="+" style={styles.addButton} onPress={() => navigation.navigate('AddTransaction')}>
                    <Text style={styles.addButtonText}>+</Text>
                </Button>
            </View>
        </View>
    )
}