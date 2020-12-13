import React from 'react';
import { Avatar, Text } from 'react-native-paper';
import styles from './styles';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import CartItem from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import * as orderListActions from '../Cart/redux/actions';

export default function Cart() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderListReducer.orders ?? []);
  const products = useSelector((state) => state.productListReducer.products);

  const orderId = orderList[0]?.id;
  const totalAmount = orderList[0]?.total;
  const productIdList = orderList[0]?.line_items ?? [];

  const cartItems = [];

  Object.entries(productIdList).forEach(([key, value]) => {
    const item = products.find((x) => x.id === value.product_id);
    console.log('------------::>' + JSON.stringify(item));

    if (item !== undefined) {
      cartItems.push({
        key: key,
        id: item.id,
        images: item.images,
        name: item.name,
        price: item.price,
        quantity: value.quantity,
      });
    }
  });

  return isEmpty(cartItems) ? (
    <View style={styles.container}>
      <Text> {'No items in the Cart'} </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}> {'Cart Id: ' + orderId} </Text>
          </View>
        )}
        data={cartItems}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <View>
            <CartItem
              name={itemData.item.name}
              price={itemData.item.price}
              sum={itemData.item.price}
              quantity={itemData.item.quantity}
              deletable={true}
              onRemove={() => {}}
            />
          </View>
        )}
        ListFooterComponent={
          <View style={styles.deleteContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(orderListActions.deleteOrderList(orderId));
              }}
              style={styles.deleteButton}>
              <Avatar.Icon
                size={70}
                icon="delete"
                color={'#aa5555'}
                style={styles.deleteIcon}
              />
              <Text>Delete All</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
/*


*/
