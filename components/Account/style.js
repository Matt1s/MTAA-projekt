import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { FlipInEasyX } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    accountHolder:{
        height: windowHeight*0.1,
        width: windowWidth*0.9,
        backgroundColor:'skyblue',
        margin: windowHeight*0.02,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    name:{
        flex: 1,
        fontSize: windowHeight*0.03,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    amount:{
        flex: 1,
        fontSize: windowHeight*0.03,
        fontWeight: 'bold',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    }
});

export {styles}