import React, { useState, useEffect } from 'react';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from './actions';
import styles from './styles';
import { isEmpty } from 'ramda';
import Loader from '../../components/Loader';
import * as projectActions from '../../config/actions';

export default function Login() {
  // remove these initial assignments after testing
  const [username, setUsername] = useState('gomo');
  const [password, setPassword] = useState('H!sFQSIJn@4fBqKS');
  const [isLogging, setIsLogging] = useState(false);

  let isLoading = useSelector(state => state.projectReducer.isLoading);

  const id = useSelector(state => state.loginReducer.id);
  const dispatch = useDispatch();
  const isUsingEmail = false;

  const onCheckEmail = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(username);

    dispatch(projectActions.showLoader());
    //setIsLogging(true);
    if (!isUsingEmail) {
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

  dispatch(projectActions.hideLoader());
  return (
    <View style={styles.container}>
      <Loader modalVisible={isLoading} animationType="fade" />
      <Text style={styles.login}>Login Status : {id}</Text>
      <TextInput
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        icon="login"
        mode="outlined"
        onPress={onCheckEmail}
        loading={isLogging}
        disabled={isLogging}>
        Login
      </Button>
    </View>
  );
}
