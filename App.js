
import 'react-native-gesture-handler'
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';


/* navigation stuff */
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

function App() {

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderUser}>Logged in as {global.email}</Text>
            <TouchableOpacity style={styles.photoHolder} onPress={() => handleChoosePhoto()}><Text style={{color: "black", textAlign:"center"}}>Upload photo</Text></TouchableOpacity>
            <Image style={styles.drawerHeaderPhoto} source={{uri: global.photo}} />
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

  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        handleUploadPhoto();
      }
    });
  };

  async function handleUploadPhoto() {

    let token = await AsyncStorage.getItem('token')
    .then(value =>{
        return JSON.parse(value)
    })
    let id = await AsyncStorage.getItem('id')
    .then(value =>{
        return JSON.parse(value)
    })


    axios.put(`http://budgetprogram.herokuapp.com/uploadPhoto/${id}`, {
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      params:{
        imageFile: 'multipart'
      },
      data: createFormData(photo),
    })
      .then((response) => {
        console.log('SUCCESS')
        console.log('response', response);
      })
      .catch((error) => {
        console.log('ERROR')
        console.log('USER ID: ', id)
        console.log(error);
      });
  };

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

