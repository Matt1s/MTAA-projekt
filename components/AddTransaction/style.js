import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    holder:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formLabel:{
        color: 'black'
    },
    formGroup:{
        display: 'flex',
        width: windowWidth*0.9,
        marginBottom: windowHeight*0.02,
    },
    toggleHolder:{
        display: 'flex',
        flexDirection:'row'
    },
    toggle1:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth*0.45,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        color: 'black'
    },
    toggle2:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth*0.45,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        color: 'black'
    },
    toggleText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: windowHeight*0.02
    },

    textInput:{
        width: windowWidth*0.9,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: windowHeight*0.03,
        paddingLeft: windowWidth*0.05
    },
    checkbox:{
        color: 'black'
    },
    confirmButton:{
        width: windowWidth*0.45,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        display: 'flex',
        backgroundColor: '#90EE90',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonOrig:{
        width: windowWidth*0.90,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        display: 'flex',
        backgroundColor: '#90EE90',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton:{
        width: windowWidth*0.45,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        display: 'flex',
        backgroundColor: '#FA8072',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: windowHeight*0.03
    }
});

export { styles }