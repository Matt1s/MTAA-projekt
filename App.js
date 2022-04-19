
import 'react-native-gesture-handler'
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Transactions from './components/Transactions/Transactions';
import AddTransaction from './components/AddTransaction/AddTransaction';
import Categories from './components/Categories/Categories';
import Accounts from './components/Accounts/Accounts';
import AccountDetails from './components/AccountDetails/AccountDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CallSupport from './components/CallSupport/CallSupport';
import Logout from './components/Logout/Logout';
import AddAccount from './components/AddAccount/AddAccount';
import SpendingReport from './components/SpendingReport/SpendingReport';
import RecurringTransactions from './components/RecurringTransactions/RecurringTransactions';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';


/* navigation stuff */
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function changePhoto() {
  alert('change photo');
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawer}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderUser}>Logged in as {global.email}</Text>
          <TouchableOpacity style={styles.photoHolder} onPress={() => changePhoto()}><Text style={{color: "black", textAlign:"center"}}>Upload photo</Text></TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Call support"
          style={{backgroundColor: '#88FF75' }}
          onPress={() => props.navigation.navigate('Call support')}
          />
        <DrawerItem style={{backgroundColor:'red'}}
          label="Logout"
          onPress={() => props.navigation.navigate('Logout')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function App() {

    return (
      <NavigationContainer>
        <Drawer.Navigator email={AsyncStorage.getItem('email')} initialRouteName="Login" drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
        drawerStyle: {
          backgroundColor: 'snow',
          display: 'flex',
          flexDirection:'column',
        },
      }}
    >
          <Drawer.Screen  name="Transactions" component={Transactions} />
          <Drawer.Screen  name="Categories" component={Categories} />
          <Drawer.Screen  name="Accounts" component={Accounts} />
          <Drawer.Screen  name="Recurring transactions" component={RecurringTransactions} />
          <Drawer.Screen  name="Spending report" component={SpendingReport} />
          <Drawer.Screen name="Login" component={Login} 
            options={{
              drawerItemStyle: { height: 0 }
            }}
          />
          <Drawer.Screen name="Register" component={Register} 
            options={{
              drawerItemStyle: { height: 0 }
            }}
          />
          <Drawer.Screen  name="Add transaction" component={AddTransaction} 
            options={{
            drawerItemStyle: { height: 0 }
          }}/>
          <Drawer.Screen  name="Call support" component={CallSupport} 
            options={{
            drawerItemStyle: { height: 0 }
          }}/>
          <Drawer.Screen  name="Logout" component={Logout} 
            options={{
            drawerItemStyle: { height: 0 }
          }}/>
          <Drawer.Screen  name="Account details" component={AccountDetails} 
            options={{
            drawerItemStyle: { height: 0 }
          }}/>
          <Drawer.Screen  name="Add account" component={AddAccount} 
            options={{
            drawerItemStyle: { height: 0 }
          }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
}

export default App

