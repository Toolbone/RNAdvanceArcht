import React from 'react';
import { Avatar, Text } from 'react-native-paper';
import styles from './styles';
import {
  Image,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CartItem from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { currencyFormat } from '../../utils/stringUtils';
import * as rootActions from '../../system/actions';
import * as productDetailsActions from '../Product/redux/actions';
import * as orderListActions from '../Cart/redux/actions';
import * as productListActions from '../Home/redux/actions';

export default function Cart() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderListReducer.orders)[0];
  const products = useSelector((state) => state.productListReducer.products);

  const orderId = orderList?.id;
  const totalAmount = orderList?.total;
  const productIdList = orderList?.line_items;
  let cartItems2 = [];

  console.log('*************************');
  console.log(JSON.stringify(orderList));
  console.log(JSON.stringify(orderId));
  console.log(JSON.stringify(productIdList));
  console.log(JSON.stringify(totalAmount));
  console.log('*************************');

  for (const key in productIdList) {
    //console.log('........................' + productIdList[key].product_id);
    const productId = productIdList[key].product_id;
    const item = products.find((x) => x.id === productId);
    if (item !== undefined) {
      console.log('........................');
      console.log(JSON.stringify(item));
      cartItems2.push({
        id: item.id,
        images: item.images,
        name: item.name,
        price: item.price,
        quantity: productIdList[key].quantity,
      });
    }
  }

  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.productListReducer.products) {
      transformedItems.push({
        key: key,
        name: state.productListReducer.products[key].name,
        price: 'key.name',
        quantity: 1,
        sum: 1,
      });
    }

    return transformedItems.sort((a, b) => (a.key > b.key ? 1 : -1));
  });
  /*  <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (*/

  /* )}

   <CartItem
          quantity={2}
          title={2}
          amount={10}
          deletable
          onRemove={() => {
            //dispatch(cartActions.removeFromCart(itemData.item.productId));
          }}
        />

        />*/
  return cartItems2 === undefined || isEmpty(cartItems2) ? (
    <View style={styles.container}>
      <Text> {'Loading Items...'} </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.rightContainer}>
        <Text style={styles.headerText}> {'Cart Id: ' + orderId} </Text>
      </View>
      <FlatList
        style={styles.listContainer}
        data={cartItems2}
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
      />
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(orderListActions.deleteOrderList(orderId));
          }}
          style={styles.deleteButton}>
          <Avatar.Icon
            size={50}
            icon="delete"
            color={'#aa5555'}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
/*


*/
