import React from 'react';
import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import DatePickerX from '../DatePicker/DatePicker';
import DropDown from '../DropDownPicker/DropDownPicker'
import CheckBox from '@react-native-community/checkbox'
import { styles } from "./style.js";

export default class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCredit:false,
            isDebit:false,
            isRecurring:false
        }
    }

    componentDidMount() {
        if(this.props.route.params) {
            let params = this.props.route.params
            this.setState({
                amount: params.amount,
                category: params.category,
                timestamp: params.category,
                description: params.description
            })
            if (params.amount >= 0){
                this.setState({
                    isCredit: true,
                    isDebit: false
                })
            }
        }
        alert(JSON.stringify(this.props))
    }

    toggleType(isTrue) {
        // toggle between credit and debit
        if (isTrue || this.props.amount >= 0) {
            this.setState({
                isCredit: true,
                isDebit: false
            })
        } else {
            this.setState({
                isCredit: false,
                isDebit: true
            })
        }
    }

    toggleRecuring() {
        // toggle between recurring and non-recurring
        if (this.state.isRecurring) {
            this.setState({
                isRecurring: false
            })
        } else {
            this.setState({
                isRecurring: true
            })
        }
    }

    render() {
    return (
        <View style={styles.holder}>
            <View style={styles.formGroup}>
                {/* credit or debit toggle */}
                <Text style={styles.formLabel}>
                    Type of transaction
                </Text>
                <View style={styles.toggleHolder}>
                    <TouchableHighlight underlayColor="snow" style={[styles.toggle1, {backgroundColor: this.state.isCredit ? 'grey':'white'}]}  onPress={ () => this.toggleType(true) }>
                        <Text style={styles.toggleText}>
                            Credit
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="snow" style={[styles.toggle2, {backgroundColor: this.state.isDebit ? 'grey':'white'}]} onPress={() => this.toggleType(false)}>
                        <Text style={styles.toggleText}>
                            Debit
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Amount
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric'>
                    {this.state.amount}
                </TextInput>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    {this.state.isCredit ? 'To: ' : 'From: '}
                </Text>
                <DropDown />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Date and time
                </Text>
                <DatePickerX/>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Description
                </Text>
                <TextInput style={styles.textInput}>
                    {this.state.description}
                </TextInput>
            </View>

            <View style={[styles.formGroup,{flexDirection: 'row', alignItems:'center'} ]}>
            <CheckBox
            tintColors={{true: 'green', false: 'red'}}  
                value={this.state.isRecurring}
                onValueChange={ () => this.toggleRecuring()}
                style={styles.checkbox}
                />
            <Text style={styles.formLabel}>transaction is recurring</Text>
            </View>

            {this.state.isRecurring ?
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    How often should transaction occur? (days)
                </Text>
                <TextInput style={styles.textInput} keyboardType='numeric'>

                </TextInput>
            </View>
            : null}

            <TouchableHighlight underlayColor="snow" style={styles.confirmButton}>
                <Text style={styles.toggleText}>Confirm transaction</Text>
            </TouchableHighlight>

        </View>
    )
    }
} 