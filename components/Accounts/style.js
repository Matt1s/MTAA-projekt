import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    accountHolder:{
        height: windowHeight*0.2,
        width: windowWidth*0.9,
        backgroundColor:'skyblue'
    }
});

export {styles}