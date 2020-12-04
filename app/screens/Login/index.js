import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { Text, Button, TextInput, Avatar } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from './redux/actions';
import styles from './styles';
import { isEmpty } from 'ramda';

export default function Login() {
  // remove these initial assignments after testing
  const [username, setUsername] = useState('github');
  const [password, setPassword] = useState('^ZG78@aRLqT6Cjn1Bx8jEskE');

  const isRequesting = useSelector((state) => state.loginReducer.isRequesting);
  const message = useSelector((state) => state.loginReducer.message);

  const dispatch = useDispatch();
  const isUsingEmail = false;

  /*  const showLoader = useCallback(() => dispatch(rootActions.showLoader()), [
    dispatch,
  ]);*/
  const loginRequest = useCallback(
    () => dispatch(loginActions.requestLogin(username, password)),
    [dispatch, password, username],
  );

  const onTapLogin = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!isUsingEmail) {
      loginRequest();
      return;
    }
    if (reg.test(String(username).toLowerCase())) {
      loginRequest();
    } else {
      Alert.alert('Invalid Email', 'Email address is not valid');
      if (isEmpty(username)) {
        setUsername('');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Avatar.Image
        style={styles.avatar}
        source={{
          uri: 'https://filedn.com/lP8Xd69HrqsSjIVRkUvSMDz/ToolBone_icon.png',
        }}
        size={120}
      />
      <Text style={styles.login}>Welcome!</Text>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={'Username'}
        disabled={isRequesting}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        disabled={isRequesting}
        style={styles.input}
      />

      <Button
        icon="login"
        mode="outlined"
        onPress={onTapLogin}
        disabled={isRequesting}
        loading={isRequesting}
        style={styles.button}>
        {'Login'}
      </Button>

      <Text style={styles.login}>{message}</Text>
    </View>
  );
}
