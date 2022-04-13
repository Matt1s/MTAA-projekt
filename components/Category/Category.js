import React from 'react'
import {View, Text} from 'react-native';

import {Account} from '..Accounts/Account';

function Accounts(){
    return (
    <View>
        <Account name="Food" amount="200"/>
        <Account name="Food" amount="200"/>
        <Account name="Food" amount="200"/>
        <Account name="Food" amount="200"/>
        <Account name="Food" amount="200"/>
    </View>
    )
}

export default Accounts;