
import 'react-native-gesture-handler'
import React, {useState} from 'react';
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
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';


/* navigation stuff */
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


function App() {


  const [singleFile, setSingleFile] = useState(null);

  const uploadImage = async (uri, type, name) => {

    /* get ID from async storage */
    let id = await AsyncStorage.getItem('id')
    .then(value =>{
        return JSON.parse(value)
    })



    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      let data = new FormData();
      data.append("imageFile", {
        uri: uri,
        type: type,
        name: name,
    });

      // Please change file upload URL
      let res = await fetch(
        `http://budgetprogram.herokuapp.com/uploadPhoto/${id}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data
        }
      );
      console.log(`http://budgetprogram.herokuapp.com/uploadPhoto/${id}`)
      let responseJson = await res.json();
      if (responseJson.status) {
        console.log(responseJson.status)
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
      console.log('RES:    ',res[0].uri)
      setTimeout(() => {
        uploadImage(res[0].uri, res[0].type, res[0].name)}, 3000);
        
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderUser}>Logged in as {global.email}</Text>
            <TouchableOpacity style={styles.photoHolder} onPress={() => selectFile()}><Text style={{color: "black", textAlign:"center"}}>Upload photo</Text></TouchableOpacity>
            <Image style={styles.image} source={{uri: global.photo}} />
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

