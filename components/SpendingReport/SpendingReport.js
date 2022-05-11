import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, TouchableHighlight, ScrollView} from 'react-native';
import { styles } from './style';
import DatePickerX from '../DatePicker/DatePicker';
import PieChart from 'react-native-pie-chart';

function SpendingReport({navigation},props) {

    const [showReport, setShowReport] = useState(false)
    

        const widthAndHeight = 250
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    async function fetchData() {/*
        let transactions = []
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
            `http://budgetprogram.herokuapp.com/api/transactions/${id}`,
            config
        )
        .then(function (response) {
          console.log('SUCCESS 1')
            let resStatus = response.status
            console.log(resStatus)
            /*console.log(JSON.stringify(response.data))*/
            /*transactions = response.data
            console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
            setTransactions(transactions)
            /*console.log(transactions)*/
        /* });*/
        setShowReport(true)
    }
        return(
            <ScrollView contentContainerStyle={styles.holder}>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>
                        Since date
                    </Text>
                    <DatePickerX/>
                </View>
    
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>
                        Until date
                    </Text>
                    <DatePickerX/>
                </View>
                <TouchableHighlight underlayColor="snow" onPress={() => fetchData()} style={styles.confirmButton}>
                    <Text style={[styles.fetchDataText,{color: 'grey'}]}>Show report</Text>
                </TouchableHighlight>

                {showReport ?  
                <View style={styles.reportsHolder}>
                    <Text style={styles.reportName}>Expenses</Text>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                    />
                    <Text style={styles.reportName}>Income</Text>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                    />
                </View> : null}
            </ScrollView>
        )
    }
export default SpendingReport;
    