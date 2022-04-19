import React from 'react'
import {View, Text} from 'react-native';
import { styles } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableHighlight } from 'react-native-gesture-handler';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Category extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    deleteCategory = async (id) => {
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
      }

    render() {
        return (
        <View style={styles.category}>
            <Text style={styles.categoryText}>{this.props.name}</Text>
            <TouchableHighlight style={styles.trash} underlayColor="snow" onPress={this.props.delete}>
                <FontAwesomeIcon icon={ faTrashCan } size={30} color="white" />
            </TouchableHighlight>
        </View>
        )
    }
}
