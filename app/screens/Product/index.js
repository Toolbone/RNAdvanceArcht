import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat, removeHtmlTag } from '../../utils/stringUtils';
import React, { useCallback } from 'react';
import { isEmpty } from 'ramda';
import * as orderListActions from '../Cart/redux/actions';
import * as rootActions from '../../system/actions';

export default function ProductDetails() {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetailsReducer.product);
  const profile = useSelector((state) => state.customerDetailsReducer.profile);
  const orderList = useSelector((state) => state.orderListReducer.orders);

  const lineItems = [];
  const orderId = orderList[0]?.id;

  const isCartReady = orderList.length > 0;

  const data = {
    payment_method: 'bacs',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: false,
    customer_id: profile?.id,
    billing: profile?.billing,
    shipping: profile?.shipping,
  };

  const addItem = useCallback(() => {
    lineItems.push({
      product_id: product?.id,
      quantity: 1,
    });
    dispatch(
      orderListActions.updateOrderList(orderId, {
        line_items: lineItems,
      }),
    );
  }, [dispatch, lineItems, orderId, product.id]);

  if (!isCartReady) {
    dispatch(orderListActions.addOrderList(data));
  }

  return isEmpty(product) ? (
    <View style={styles.center}>
      <Text> No Item Found </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
          <Image
            style={styles.productImg}
            source={{
              uri: product?.images[0].src,
            }}
          />
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.price}>
            {currencyFormat(parseInt(product?.price, 10))}
          </Text>
          <Text style={styles.description}>
            {product?.slug + ' - ' + removeHtmlTag(product?.description)}
          </Text>
        </View>
        <View style={styles.starContainer} />
        <View style={styles.contentColors}>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#00BFFF' }]}
          />
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#FF1493' }]}
          />
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#00CED1' }]}
          />
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#228B22' }]}
          />
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#20B2AA' }]}
          />
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#FF4500' }]}
          />
        </View>
        <View style={styles.contentSize}>
          <TouchableOpacity style={styles.btnSize}>
            <Text>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>L</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>XL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            style={isCartReady ? styles.activeButton : styles.inactiveButton}
            onPress={() => {
              addItem();
            }}>
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
