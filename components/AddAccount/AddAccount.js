import React from 'react';
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import {styles} from './style';
import CheckBox from '@react-native-community/checkbox'



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

    render()
    {
    return(
<View style={styles.holder}>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Name of the account
                </Text>
                <TextInput style={styles.textInput}>
                    {this.state.name}
                </TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Balance
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric'>
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

            <TouchableHighlight underlayColor="snow" style={styles.confirmButton}>
                <Text style={styles.toggleText}>Save</Text>
            </TouchableHighlight>

        </View>
    )
}
}