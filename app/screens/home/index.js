import React, { useEffect, useMemo } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/screens/login/redux/actions';
import styles from './styles';
import { requestProductList } from './redux/actions';
import images from '../../config/images';
import type { ProductsState } from '../../api/Models';

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  const loader = useSelector((state) => state.rootReducer.isLoading);
  const onLogout = () => dispatch(loginActions.requestLogout(token));
  const products = useSelector((state) => state.productListReducer.products);

  useEffect(() => {
    dispatch(requestProductList(10));
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {products.map((product, index) => {
        return (
          <View key={product.id} style={styles.item}>
            <Image
              style={styles.photo}
              source={{
                uri: product?.images[0].src,
              }}
            />
            <Text>Name: {product.name}</Text>
            <Text>Price: ${product.price}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
  /*return (
    <View style={styles.container}>
      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>

      <Text style={styles.login}>Token : {token}</Text>
      <Text style={styles.login}>Login Status : {loader}</Text>
    </View>
  );*/
}
