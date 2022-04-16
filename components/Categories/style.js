import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    formLabel:{
        color: 'black'
    },
    formGroup:{
        display: 'flex',
        width: windowWidth*0.9,
        marginBottom: windowHeight*0.02,
        position: 'absolute',
        bottom: windowHeight*0.05,
        left: windowWidth*0.05,
    },
    textInput:{
        width: windowWidth*0.6,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: windowHeight*0.03,
        paddingLeft: windowWidth*0.05
    },
    addButton:{
        position: 'absolute',
        right: windowWidth*0.05,
        bottom: windowHeight*0.05,
        backgroundColor:'grey',
        width: windowWidth*0.2,
        height: windowWidth*0.2,
        borderRadius: windowWidth*0.1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderWidth: 1
    },
    addButtonText:{
        fontSize: windowHeight*0.075,
        color: 'white'
    }
})

export {styles}