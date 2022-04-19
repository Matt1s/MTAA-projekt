import React from 'react';
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import {styles} from './style';
import CheckBox from '@react-native-community/checkbox'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toCount: false,
            balance: '',
            name: '',
        }
    }

    componentDidMount() {
        if(this.props.route.params) {
            let params = this.props.route.params
            this.setState({
                balance: params.balance,
                name: params.name,
            })
        }
    }

    toggleToCount() {
        // toggle between recurring and non-recurring
        if (this.state.toCount) {
            this.setState({
                toCount: false
            })
        } else {
            this.setState({
                toCount: true
            })
        }
    }

    addAccount = async () => {
        /* get current categories */
            let token = await AsyncStorage.getItem('token')
            .then(value =>{
                return JSON.parse(value)
            })
            let id = await AsyncStorage.getItem('id')
            .then(value =>{
                return JSON.parse(value)
            })

            let name = this.state.name
            let balance = this.state.balance

            var config = {
                method: 'post',
                url: `http://budgetprogram.herokuapp.com/api/account/${id}`,
                headers: { 'Authorization': `bearer ${token}` },
                "name": name,
                "value": balance
              };
            
            axios.post(
                `http://budgetprogram.herokuapp.com/api/account/${id}`,
                config
            )
            .then(function (response) {
                console.log('SUCCESS')
                let resStatus = response.status
                console.log(resStatus)
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
            console.log(error.response)
            console.log('token', token);
            console.log('id', id);
            })
            .finally(() => {
                this.props.navigation.navigate('Accounts')
            });
    }

    render()
    {
    return(
<View style={styles.holder}>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Name of the account
                </Text>
                <TextInput style={styles.textInput} onChangeText={(name) => this.setState({name})}>
                    {this.state.name}
                </TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Balance
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(balance) => this.setState({balance})}>
                    {this.state.balance}
                </TextInput>
            </View>

            <View style={[styles.formGroup,{flexDirection: 'row', alignItems:'center'} ]}>
            <CheckBox
            tintColors={{true: 'green', false: 'red'}}  
                value={this.state.toCount}
                onValueChange={ () => this.toggleToCount()}
                style={styles.checkbox}
                />
            <Text style={styles.formLabel}>Add change of balance into transactions?</Text>
            </View>

            <TouchableHighlight underlayColor="snow" style={styles.confirmButton} onPress={this.addAccount}>
                <Text style={styles.toggleText}>Save</Text>
            </TouchableHighlight>

        </View>
    )
}
}