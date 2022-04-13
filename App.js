
import 'react-native-gesture-handler'
import React from 'react';
import {View, Text} from 'react-native';
import Transactions from './components/Transactions/Transactions';
import AddTransaction from './components/AddTransaction/AddTransaction';
import Categories from './components/Categories/Categories';
import Accounts from './components/Accounts/Accounts';
import { styles } from './style';

/* navigation stuff */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Transactions">
          <Drawer.Screen  name="Transactions" component={Transactions} />
          <Drawer.Screen  name="Add transaction" component={AddTransaction} />
          <Drawer.Screen  name="Categories" component={Categories} />
          <Drawer.Screen  name="Accounts" component={Accounts} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
}

export default App

