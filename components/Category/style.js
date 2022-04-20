import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    category:{
        height: windowHeight*0.075,
        width: windowWidth*0.9,
        backgroundColor:'skyblue',
        margin: windowHeight*0.02,
        marginBottom: 0,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryText:{
        flex: 1,
        fontSize: windowHeight*0.03,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    trash:{
        backgroundColor:'red',
        borderRadius: 20,
        width: windowWidth*0.15,
        height: windowHeight*0.075,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    }
});

export { styles }