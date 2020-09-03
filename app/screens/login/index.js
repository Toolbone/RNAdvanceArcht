import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from './actions';
import styles from './styles';
import { isEmpty } from 'ramda';
import * as projectActions from '../../system/actions';

export default function Login() {
  // remove these initial assignments after testing
  const [username, setUsername] = useState('gomo1');
  const [password, setPassword] = useState('H!sFQSIJn@4fBqKS');
  const [isLogging, setIsLogging] = useState(false);
  const id = useSelector((state) => state.loginReducer.id);
  let isLoading = useSelector((state) => state.projectReducer.isLoading);
  let message = useSelector((state) => state.loginReducer.message);

  const dispatch = useDispatch();
  const isUsingEmail = false;

  const showLoader = useCallback(() => dispatch(projectActions.showLoader()), [
    dispatch,
  ]);
  const loginRetry = useCallback(() => dispatch(loginActions.onLoginRetry()), [
    dispatch,
  ]);


  const onCheckEmail = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsLogging(true);
    loginRetry();
    if (!isUsingEmail) {
      showLoader();
      dispatch(loginActions.requestLogin(username, password));
      return;
    }
    if (reg.test(String(username).toLowerCase())) {
      dispatch(loginActions.requestLogin(username, password));
    } else {
      setIsLogging(false);
      Alert.alert('Invalid Email', 'Email address is not valid');
      if (isEmpty(username)) {
        setUsername('');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login Status : {id}</Text>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        icon="login"
        mode="outlined"
        onPress={onCheckEmail}
        loading={isLoading}
        disabled={isLoading}>
        Login
      </Button>

      <Text style={styles.login}>Login Status : {message}</Text>
    </View>
  );
}
