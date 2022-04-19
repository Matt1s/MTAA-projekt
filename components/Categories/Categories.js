import React from 'react'
import {View, Text, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import Category from '../Category/Category';
import {styles} from './style'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Categories extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            inputName: '',
            categories: []
        }
    }

    getCategories = async () => {
        let categories = []
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })
        let id = await AsyncStorage.getItem('id')
        .then(value =>{
            return JSON.parse(value)
        })
  
        const config = {
            headers: { Authorization: `bearer ${token}` }
        };
        
        axios.get(
            `http://budgetprogram.herokuapp.com/api/category/${id}`,
            config
        )
        .then(function (response) {
          console.log('SUCCESS')
            let resStatus = response.status
            console.log(resStatus)
            console.log(JSON.stringify(response.data))
            categories = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            this.setState({categories: categories})
        });
      }

    async componentDidMount(){
        this.getCategories()
    }

    addCategory = async () => {
        /* get current categories */
        let categories = this.state.categories
        let newCategory = {}
        let inputName = this.state.inputName
        let newCategories = []
        if(inputName.length > 0){
            let token = await AsyncStorage.getItem('token')
            .then(value =>{
                return JSON.parse(value)
            })
            let id = await AsyncStorage.getItem('id')
            .then(value =>{
                return JSON.parse(value)
            })

            var config = {
                method: 'post',
                url: `http://budgetprogram.herokuapp.com/api/category/${id}`,
                headers: { 'Authorization': `bearer ${token}` },
                name: inputName
              };
            
            axios.post(
                `http://budgetprogram.herokuapp.com/api/category/${id}`,
                config
            )
            .then(function (response) {
            console.log('SUCCESS')
                newCategory = {
                    "name": inputName,
                    "id": response.data.id,
                    "addedAt": response.data.addedAt
                }
                categories = categories.push(JSON.parse(newCategory))
                console.log('CURRENT CATEGORIES')
                console.log(categories)
                console.log('NEW CATEGORIES:')
                console.log(newCategories)
            })

            .catch(function (error) {
            console.log(error.response)
            console.log('token', token);
            console.log('id', id);
            })
            .finally(() => {
                this.getCategories()
            })
        } else {
            alert('Please enter a name')
        }
    }

    deleteCategory = async (id) => {
        let currCategories = this.state.categories
        let token = await AsyncStorage.getItem('token')
        .then(value =>{
            return JSON.parse(value)
        })
  
        const config = {
            headers: { Authorization: `bearer ${token}` }
        };
        
        axios.delete(
            `http://budgetprogram.herokuapp.com/api/category/${id}`,
            config
        )
        .then(function (response) {
          console.log('SUCCESS')
          currCategories = currCategories.filter(category => category.id !== id)
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.response)
        }).finally(() => {
            this.setState({categories: currCategories})
        });
      }


    render(){
        return (
            <>
            <ScrollView>
                {this.state.categories ? this.state.categories.map((category, index) => {
                    return <Category key={index} name={category.name} id={category.id} delete={() => this.deleteCategory(category.id)}/>
                }) : console.log('No categories')}
            </ScrollView>
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Add new category
                </Text>
                <TextInput onChangeText={
                    (inputName) => this.setState({inputName})
                } style={styles.textInput}>
                    
                </TextInput>
            </View>
            <TouchableHighlight underlayColor="grey" style={styles.addButton} onPress={() => this.addCategory()}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
            </>
        )
    }
}
