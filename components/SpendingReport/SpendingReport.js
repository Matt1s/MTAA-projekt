import React, {useState} from 'react';
import {View, TextInput, Text, TouchableHighlight, ScrollView} from 'react-native';
import { styles } from './style';
import DatePickerX from '../DatePicker/DatePicker';
import PieChart from 'react-native-pie-chart';

export default class SpendingReport extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showReport: false
        }
    }

    fetchData() {
        this.setState({
            showReport: true
        })
    }
    

    render(){

        const widthAndHeight = 250
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

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
                <TouchableHighlight underlayColor="snow" onPress={() => this.fetchData()} style={styles.confirmButton}>
                    <Text style={styles.fetchDataText}>Show report</Text>
                </TouchableHighlight>

                {this.state.showReport && 
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
                </View>}
            </ScrollView>
        )
    }
}
    