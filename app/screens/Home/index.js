import React, { useCallback, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import styles from './styles';
import { currencyFormat } from '../../utils/stringUtils';
import * as loginActions from '../Login/redux/actions';

import { useDispatch } from 'react-redux';
import * as rootActions from '../../system/actions';
import * as productDetailsActions from '../ProductDetails/redux/actions';
import { isEmpty } from 'ramda';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector((state) => state.productListReducer.products);

  return products === undefined || isEmpty(products) ? (
    <View style={styles.container}>
      <Text> Loading Items... </Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.content}>
      {products.map((product, index) => {
        const price = currencyFormat(parseInt(product?.price, 10));
        return (
          <View key={product?.id + '' + index} style={styles.item}>
            <View
              style={styles.photo}
              onStartShouldSetResponder={() => true}
              onResponderRelease={() => {
                dispatch(rootActions.showLoader());
                dispatch(
                  productDetailsActions.requestProductDetails(product?.id),
                );
                navigation.navigate('ProductDetails');
              }}>
              <Image
                style={styles.photo}
                source={{
                  uri: product?.images[0].src,
                }}
              />
            </View>

            <View key={product.id} style={styles.textContainer}>
              <Text>Name: {product?.name}</Text>
              <Text style={styles.textPrice}>{price}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
