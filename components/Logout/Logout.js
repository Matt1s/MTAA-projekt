import React, {useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Logout({navigation}) {

    /* remove token from async storage and navigate to login screen */
    useEffect(() => {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('id')
        AsyncStorage.removeItem('role')},
        console.log('LOGOUT'));



    return(
        <>{navigation.navigate('Login')}</>    
    )
}

export default Logout