import React from 'react';
import { Text, Avatar } from 'react-native-paper';

import { View, TouchableOpacity, Platform } from 'react-native';

import styles from './styles';
import { red400 } from 'react-native-paper/src/styles/colors';

export default function CartItem(props) {
  return (
    <View style={styles.cartItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.mainText}>{props.name}</Text>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.quantity}>{'qty:' + props.quantity}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.priceText}>{'$' + props.price}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props?.onRemove}
            style={styles.deleteButton}>
            <Avatar.Icon
              size={24}
              icon="delete"
              color={'#aa5555'}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
