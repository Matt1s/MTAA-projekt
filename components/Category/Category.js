import React, {useEffect} from 'react'
import {View, Text} from 'react-native';
import { styles } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableHighlight } from 'react-native-gesture-handler';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Category(props) {

    useEffect(() => {
        /*console.log('CATEGORY PROPS')
        console.log(props)*/
    }, [])

    /*async function deleteCategory(id){
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
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.response)
        })
      }*/

        return (
        <TouchableHighlight underlayColor="grey" onPress={() => props.navigation.navigate('Edit category', {name: props.name, id: props.id})}>
            <View style={styles.category}>
            <Text style={styles.categoryText}>{props.name}</Text>
            <TouchableHighlight style={styles.trash} underlayColor="snow" onPress={props.delete}>
                <FontAwesomeIcon icon={ faTrashCan } size={30} color="white" />
            </TouchableHighlight>
            </View>
        </TouchableHighlight>
        )
    }
export default Category