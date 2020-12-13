import React, { useCallback, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text, Divider, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import styles from './styles';
import { currencyFormat } from '../../utils/stringUtils';
import * as loginActions from '../Login/redux/actions';

import { useDispatch } from 'react-redux';
import * as rootActions from '../../system/actions';
import * as productDetailsActions from '../Product/redux/actions';
import { isEmpty } from 'ramda';
import * as productListActions from './redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector((state) => state.productListReducer.products);

  return products === undefined || isEmpty(products) ? (
    <View style={styles.container}>
      <Text> Loading Items... </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.chipsContainer}>
        <Chip
          style={styles.chip}
          icon="stairs"
          onPress={() => dispatch(productListActions.requestProductList(3))}>
          3
        </Chip>
        <Chip
          style={styles.chip}
          icon="stairs"
          onPress={() => dispatch(productListActions.requestProductList(10))}>
          10
        </Chip>
        <Chip
          style={styles.chip}
          icon="stairs"
          onPress={() => dispatch(productListActions.requestProductList(30))}>
          30
        </Chip>
        <Chip
          style={styles.chip}
          icon="sort-alphabetical-variant"
          onPress={() =>
            dispatch(productListActions.requestProductList(20, 'slug'))
          }>
          20
        </Chip>
      </View>
      <Divider />
      <ScrollView contentContainerStyle={styles.content}>
        {products.map((product, index) => {
          const price = currencyFormat(parseInt(product?.price, 10));
          return (
            <View key={product?.id + '' + index} style={styles.item}>
              <View
                style={styles.photo}
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => {
                  dispatch(
                    productDetailsActions.requestProductDetails(product?.id),
                  );
                  navigation.navigate('Product');
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
    </View>
  );
}
