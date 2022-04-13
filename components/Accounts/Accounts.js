import React from 'react'
import {View, Text} from 'react-native';

import Account from '../Account/Account';

function Accounts(){
    return (
        <View>
            <Account name="Food" amount="200"/>
            <Account name="Cigarety" amount="400"/>
            <Account name="Palenka" amount="900"/>
            <Account name="Fety" amount="50"/>
            <Account name="Skola" amount="10"/>
        </View>
    )
}

export default Accounts;