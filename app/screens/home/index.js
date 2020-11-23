import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useSelector } from 'react-redux';
import styles from './styles';
import { currencyFormat } from '../../utils/stringUtils';

export default function Home() {
  const products = useSelector((state) => state.productListReducer.products);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {products.map((product, index) => {
        const price = currencyFormat(parseInt(product?.price, 10));
        return (
          <View key={product?.id} style={styles.item}>
            <Image
              style={styles.photo}
              source={{
                uri: product?.images[0].src,
              }}
            />
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
