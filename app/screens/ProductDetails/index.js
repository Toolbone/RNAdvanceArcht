import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './styles';
import { useSelector } from 'react-redux';
import { removeHtmlTag, currencyFormat } from '../../utils/stringUtils';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { isEmpty } from 'ramda';

export default function ProductDetails() {
  const product = useSelector((state) => state.productDetailsReducer.product);

  return product === undefined || isEmpty(product) ? (
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
          <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
