import React from 'react';
import {Text, ScrollView, TouchableHighlight, View} from 'react-native';
import { styles } from './style';
import Transaction from '../Transaction/Transaction';
function AccountDetails({navigation}) {
    return(
        <>
            <ScrollView contentContainerStyle={styles.accountDetails}>
                <Text style={styles.accountName}>Tatra banka</Text>
                <Text style={styles.balance}>Balance: <Text style={styles.balanceValue}>12000</Text>€</Text>
                <Text style={styles.textLastTransactions}>Last transactions:</Text>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="2.20" account="Wallet" timestamp="today"/>
                <Transaction navigation={navigation} category="Payroll" amount="350" account="Tatrabanka" timestamp="yesterday"/>
                <Transaction navigation={navigation} category="Food" description="obed v eate" amount="-1.70" account="Wallet" timestamp="today"/>
            </ScrollView>
            <TouchableHighlight underlayColor="snow" style={styles.editAccount} onPress={() => navigation.navigate('Add account')}>
                <Text style={styles.editAccountText}>Edit account</Text>
            </TouchableHighlight>
        </>
    )
}

export default AccountDetails