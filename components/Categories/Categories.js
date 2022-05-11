import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import Category from '../Category/Category';
import {styles} from './style'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";

const URLweb = 'http://budgetprogram.herokuapp.com/'

function Categories({navigation},props) {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        connect()
        getCategories()
        const unsubscribe = navigation.addListener('focus', () => {
            getCategories()
        });
    
        return unsubscribe;
      }, [navigation]);


    function connect() {
        var socket = new SockJS(`${URLweb}stomp-endpoint`);
        var stompClient = stompClient = Stomp.over(socket);
        console.log('CATEGORIES CONNECT...')
        stompClient.connect({}, function(frame) {
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/category', function(message) {
            console.log('SUBSCRIBED!')
            console.log('Received categories: ' + message.body);
            let data = JSON.parse(message.body)
            let newCategories = categories
            console.log("data:", data)
            console.log("data: statusCodeValue:",data["statusCodeValue"])
            console.log("data: statusCodeValue:",data.statusCodeValue)

            if ((data.statusCodeValue != 204 && data.statusCodeValue != 404) || data.statusCodeValue == undefined){
                newCategories.push(data)
            }

            

            //console.log('CATEGORIES OLD:', categories)
            getCategories(newCategories)
            console.log('CATEGORIES NEW:', categories)
        })
    });
    }

    async function getCategories(){
        let id = global.userId
        let token = global.token
        let data = {}
        axios.get(`${URLweb}api/category/${id}`, {headers: {'Authorization': `bearer ${global.token}`}})
        .then(res => {
            console.log(res.data)
            data = res.data
        })
        .finally(() => {
            setCategories(data)
        })
    }


    /*async function addCategory() {
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
    }*/

    async function addCategory() {
        let id = global.userId
        let token = global.token
        console.log('USER ID',id)

        let stompClient = global.stompClient

        let headers = {}
        let body = {"name": name}

        stompClient.send(`/app/postCategory`, (JSON.stringify({"name": name, "id": id})))
        //stompClient.send("/app/category/202",{name});

        getCategories()
    }

    function deleteCategory(id) {

        stompClient.send(`/app/deleteCategory`, id)
        let currCategories = categories
        currCategories = currCategories.filter(category => category.id !== id)
        setCategories(currCategories)
        getCategories()
        
        /*let currCategories = categories
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
          console.log(error.response)
        }).finally(() => {
            setCategories(currCategories)
        });*/
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
