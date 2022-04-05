import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { FlipInEasyX } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

transaction:{
    marginTop: windowHeight*0.02,
    width: windowWidth*0.9,
    height: windowHeight*0.1,
    borderRadius: windowWidth*0.01,
    display: 'flex',
    flexDirection: 'row',
    padding: windowHeight*0.01
},
leftSide:{
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
},
rightSide:{
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
},
category:{
    fontSize: windowHeight*0.04,
    color: 'black',
    fontWeight: 'bold',
},
description:{
    color: 'black'
},

amount:{
    fontSize: windowHeight*0.04,
    color: 'black',
    fontWeight: 'bold',
},

account:{
    fontSize: windowHeight*0.03,
    color: 'black',
    fontWeight: 'bold',
},

top: {
    position: 'relative',
    top: -windowHeight*0.02,
    backgroundColor: 'grey',
    color: 'black',
    width: windowWidth*0.2,
    padding: windowHeight*0.002,
    height: windowHeight*0.025,
    borderRadius: windowHeight*0.01
},

timestamp:{
    textAlign:'center'
},
   
});

export { styles }