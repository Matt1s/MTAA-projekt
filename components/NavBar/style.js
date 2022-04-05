import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

navbar:{
    backgroundColor: '#fff',
    height: windowHeight*0.07,
    width: windowWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
},
title:{
    textTransform:'uppercase',
    color: 'black',
    fontWeight:'bold',
    fontSize: windowWidth*0.05
}
   
});

export { styles }