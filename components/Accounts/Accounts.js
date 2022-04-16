import React from 'react'
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';

import Account from '../Account/Account';
import { styles } from './style';

function Accounts({navigation}) {
    return (
        <>
        <ScrollView>
            <Text style={styles.total}>Total: <Text style={{fontWeight: 'bold'}}>4180</Text></Text>
            <Account navigation={navigation} name="Tatrabanka" amount="1500"/>
            <Account navigation={navigation} name="Finax" amount="2000"/>
            <Account navigation={navigation} name="Fiobanka" amount="600"/>
            <Account navigation={navigation} name="Wallet" amount="80"/>
        </ScrollView>
        <TouchableHighlight underlayColor="snow" style={styles.addButton} onPress={() => navigation.navigate('Add account')}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableHighlight>
        </>
    )
}

export default Accounts;