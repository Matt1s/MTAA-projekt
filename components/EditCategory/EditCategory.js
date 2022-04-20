import React, {useState, useEffect} from 'react';
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import {styles} from './style';
import CheckBox from '@react-native-community/checkbox'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



function EditCategory({navigation},props) {

    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        for(let i = 0; i<navigation.getState().routes.length; i++){
            if(navigation.getState().routes[i].name == "Edit category"){
                console.log("=== EDIT CATEGORY ROUTES ===")
                console.log('route: ',navigation.getState().routes[i])
                console.log(navigation.getState().routes[i].params)
                setCategoryId(navigation.getState().routes[i].params.id)
                setName(navigation.getState().routes[i].params.name)
                console.log('Editing category: ',navigation.getState().routes[i].params.id)
            }
        }
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    async function saveCategory() {
            let token = await AsyncStorage.getItem('token')
            .then(value =>{
                return JSON.parse(value)
            })
            let id = global.userId
            console.log('USER ID',id)

            let config = {}
            let putURL = `http://budgetprogram.herokuapp.com/api/category/${categoryId}`
            console.log('EDITING ACCOUNT')
            config = {
                method: 'put',
                url: putURL,
                headers: { 'Authorization': `bearer ${token}`,
            'Content-type':'application/json' },
                data:{"name": name}
                };
            axios(
                config
            )
            .then(function (response) {
                console.log('SUCCESS')
                let resStatus = response.status
                console.log(putURL)
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
                console.log(putURL)
            console.log('ERROR EDITING CATEGORY')
            console.log('id', categoryId);
            })
            .finally(() => {
                navigation.navigate('Categories')
            });
    }


    return(
<View style={styles.holder}>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    Name of the category
                </Text>
                <TextInput style={styles.textInput} onChangeText={(name) => setName(name)}>
                    {name}
                </TextInput>
            </View>

            <TouchableHighlight underlayColor="snow" style={styles.confirmButton} onPress={() => saveCategory()}>
                <Text style={styles.toggleText}>Save edited category</Text>
            </TouchableHighlight>
        </View>
    )
}

export default EditCategory