import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

app:{
    backgroundColor: 'black',
    width: windowWidth,
    height: windowHeight,
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems:'center'
},
addButton:{
    position: 'absolute',
    right: windowWidth*0.1,
    bottom: windowWidth*0.1,
    backgroundColor:'grey',
    width: windowWidth*0.2,
    height: windowWidth*0.2,
    borderRadius: windowWidth*0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black'
},
addButtonText:{
    fontSize: windowHeight*0.075,
}
   
});

export { styles }