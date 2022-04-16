import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    accountDetails:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: windowWidth,
    },
    accountName:{
        color: 'black',
        fontSize: windowHeight*0.03,
        marginTop: windowHeight*0.03,
        fontWeight: 'bold',
    },
    balance:{
        color: 'black',
        fontSize: windowHeight*0.05,
    },
    balanceValue:{
        fontWeight: 'bold',
        color: 'black',
    },
    textLastTransactions:{
        textAlign:'left',
        color: 'black',
        fontSize: windowHeight*0.04,
    },
    bottomSection:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: windowWidth*0.9,
        marginLeft: 0.05*windowWidth,
    },
    editAccount:{
        position:'absolute',
        bottom: windowHeight*0.1,
        left: windowWidth*0.05,
        backgroundColor:'grey',
        width: windowWidth*0.4,
        height: windowWidth*0.2,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black'
    },
    editAccountText:{
        fontSize: windowHeight*0.03,
        color: "white"
    },
})

export { styles }