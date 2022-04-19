import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './style.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DropDown(props) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

    async function getAccounts(){
    let accounts = []
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
        `http://budgetprogram.herokuapp.com/api/accounts/${id}`,
        config
    )
    .then(function (response) {
      console.log('SUCCESS')
        let resStatus = response.status
        console.log(resStatus)
        console.log('accounts: '+JSON.stringify(response.data))

        for(let i = 0; i < response.data.length; i++){
            accounts.push({
                label: response.data[i].name,
                value: response.data[i].id
            })
        }
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(() => {
        setItems(accounts)
    });
  }


  async function getCategories(){
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
        for(let i = 0; i < response.data.length; i++){
          categories.push({
              label: response.data[i].name,
              value: response.data[i].id
          })
      }

    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(() => {
        setItems(categories)
    });
  }


  useEffect(() => {
    if(props.type == 'account') {
      getAccounts()
    } else if (props.type=="category") {
      getCategories()
    }
  }, [])

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.picker}
      onChangeValue={(value) => props.handleChange(value)}
    />
  );
}