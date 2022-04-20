import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

app:{
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
},
/* MENU DRAWER */
drawerHeader:{
    height: windowHeight*0.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
},
drawerMainList:{
    height: windowHeight*0.7,
},
drawerFooter:{
    height: windowHeight*0.2,
},
drawerHeaderUser:{
    color: 'black',
    marginTop: windowHeight*0.05,
    textAlign: 'center',
},
photoHolder:{
    width: windowWidth*0.2,
    height: windowWidth*0.2,
    backgroundColor: 'white',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
},
image:{
    height: windowWidth*0.1,
    width: windowWidth*0.1,
    borderWidth: 2,
    margin: 10,
    borderRadius: windowWidth*0.05,
    backgroundColor:'lime'

},
});

export { styles }