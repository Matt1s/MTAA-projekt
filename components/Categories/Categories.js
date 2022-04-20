import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import Category from '../Category/Category';
import {styles} from './style'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Categories({navigation},props) {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        getCategories()
        const unsubscribe = navigation.addListener('focus', () => {
            getCategories()
        });
    
        return unsubscribe;
      }, [navigation]);


    

    async function getCategories() {
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
            setCategories(categories)
        });
      }


    async function addCategory() {
        /* get current categories */
        let categoriesLocal = categories
        let newCategory = {}
        if(name.length > 0){
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
                name: name
              };
            
            axios.post(
                `http://budgetprogram.herokuapp.com/api/category/${id}`,
                config
            )
            .then(function (response) {
            console.log('SUCCESS')
                newCategory = {
                    "name": name,
                    "id": response.data.id,
                    "addedAt": response.data.addedAt
                }
                categoriesLocal = categoriesLocal.push(JSON.parse(newCategory))
                console.log('CURRENT CATEGORIES')
                setCategories(categoriesLocal)
            })

            .catch(function (error) {
            console.log(error.response)
            console.log('token', token);
            console.log('id', id);
            })
            .finally(() => {
                getCategories()
            })
        } else {
            alert('Please enter a name')
        }
    }

    async function deleteCategory(id) {
        let currCategories = categories
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
            setCategories(currCategories)
        });
    }

        return (
            <>
            <ScrollView>
                {categories ? categories.map((category, index) => {
                    return <Category navigation={navigation} key={index} name={category.name} id={category.id} delete={() => deleteCategory(category.id)}/>
                }) : console.log('No categories')}
            </ScrollView>
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Add new category
                </Text>
                <TextInput onChangeText={
                    (inputName) => setName(inputName)
                } style={styles.textInput}>
                    
                </TextInput>
            </View>
            <TouchableHighlight underlayColor="grey" style={styles.addButton} onPress={() => addCategory()}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableHighlight>
            </>
        )
    }

export default Categories
