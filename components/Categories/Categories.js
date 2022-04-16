import React from 'react'
import {View, Text, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import Category from '../Category/Category';
import {styles} from './style'

export default class Categories extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    addCategory(){
        alert('Adding category...')
    }

    render(){
        return (
            <>
            <ScrollView>
                <Category navigation={this.props.navigation} name="Food"/>
                <Category navigation={this.props.navigation} name="Apparel"/>
                <Category navigation={this.props.navigation} name="Entertainment"/>
                <Category navigation={this.props.navigation} name="Payroll"/>
            </ScrollView>
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Add new category
                </Text>
                <TextInput style={styles.textInput}>
                    
                </TextInput>
            </View>
            <TouchableHighlight underlayColor="grey" style={styles.addButton} onPress={() => this.addCategory()}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
            </>
        )
    }
}
