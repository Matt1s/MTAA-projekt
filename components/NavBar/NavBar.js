import React from 'react';
import {View, Text} from 'react-native';
import { styles } from "./style.js";

function NavBar(props) {

    return (
      <View style={styles.navbar}>
        <Text style={styles.title}>{props.screen}</Text>
      </View>
    )
} 

export default NavBar;