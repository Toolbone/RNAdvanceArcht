import React, { useCallback, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import styles from './styles';
import { currencyFormat } from '../../utils/stringUtils';
import * as loginActions from '../Login/redux/actions';
import { useDispatch } from 'react-redux';
import * as productDetailsActions from '../ProductDetails/redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [productId, setProductId] = useState();

  const products = useSelector((state) => state.productListReducer.products);
  const loginRequest = useCallback(
    () => dispatch(productDetailsActions.requestProductDetails(productId)),
    [dispatch, productId],
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {products.map((product, index) => {
        const price = currencyFormat(parseInt(product?.price, 10));
        return (
          <View key={product?.id + '' + index} style={styles.item}>
            <View
              style={styles.photo}
              onStartShouldSetResponder={() => true}
              onResponderRelease={() => {
                navigation.navigate('ProductDetails');
                dispatch(
                  productDetailsActions.requestProductDetails(product?.id),
                );
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
