import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    appName:{
        fontSize: windowHeight*0.05,
        marginTop: windowHeight*0.25,
        fontWeight: 'bold',
        color: 'black',
    },
    loginHolder:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: windowWidth,
        justifyContent:'center'
    },
    textInput:{
        width: windowWidth*0.9,
        height: windowWidth*0.15,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: windowHeight*0.03,
        paddingLeft: windowWidth*0.05,
        marginBottom: windowHeight*0.02
    },
    registerText:{
        marginTop: windowHeight*0.02,
        marginBottom: windowHeight*0.02,
        color: 'black'
    },
    button:{
        width: windowWidth*0.9,
        height: windowWidth*0.15,
        backgroundColor:'#00bfff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
});

export { styles }