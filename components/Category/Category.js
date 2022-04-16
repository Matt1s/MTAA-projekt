import React from 'react'
import {View, Text} from 'react-native';
import { styles } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableHighlight } from 'react-native-gesture-handler';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan'

export default class Category extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    deleteCategory(){
        alert('Deleting category...')
    }
    render() {
        return (
        <View style={styles.category}>
            <Text style={styles.categoryText}>{this.props.name}</Text>
            <TouchableHighlight style={styles.trash} underlayColor="snow" onPress={() => this.deleteCategory()}>
                <FontAwesomeIcon icon={ faTrashCan } size={30} color="white" />
            </TouchableHighlight>
        </View>
        )
    }
}
