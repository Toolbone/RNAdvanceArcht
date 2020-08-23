import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from './actions';
import styles from './styles';
import { isEmpty } from 'ramda';
import AsyncStorage from '@react-native-community/async-storage';
import Form from './widgets/Form';

export default function Login() {
  // remove these initial assignments after testing
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  const id = useSelector(state => state.loginReducer.id);
  const dispatch = useDispatch();

  const onCheck = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email);

    if (reg.test(String(email).toLowerCase())) {
      dispatch(loginActions.requestLogin(email, password));
    } else {
      Alert.alert('Invalid Email', 'Email address is not valid');
      if (isEmpty(email)) {
        setEmail('eve.holt@reqres.in');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login Status : {id}</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder={'Email'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button icon="login" mode="outlined" onPress={onCheck}>
        Login
      </Button>
    </View>
  );
}
