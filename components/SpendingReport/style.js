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
    confirmButton:{
        width: windowWidth*0.9,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: windowHeight*0.03,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportsHolder:{
        width: windowWidth*0.9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: windowHeight*0.02,
        alignItems:'center'
    },
    reportName:{
        fontSize: windowWidth*0.06, 
        width: windowWidth*0.9,
        textAlign:'left',
        color: 'black',
        fontWeight:'bold'
    }
});

export { styles }