import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import NavBar from './components/NavBar/NavBar';
import { styles } from './style';
import Transaction from './components/Transaction/Transaction';

export default class App extends Component {
  render() {
    return (
      <View style={styles.app}>
        <NavBar screen="Transactions" />
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
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>
    );
  }
}

