import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    picker:{
        backgroundColor: 'transaparent',
        borderRadius: 20,
    },
})

export { styles }