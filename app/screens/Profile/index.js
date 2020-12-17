import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Avatar,
  Caption,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../Profile/redux/actions';
import * as rootActions from '../../system/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.customerDetailsReducer.profile);
  const [edit, setEdit] = useState(false);
  const [phone, setPhone] = useState(profile?.billing?.phone);
  const [address1, setAddress1] = useState(profile?.shipping?.address_1);
  const [address2, setAddress2] = useState(profile?.shipping?.address_2);

  const iconMode = edit ? 'content-save' : 'account-edit';
  const iconColor = edit ? '#00aa00' : '#555555';

  const data = profile;
  data.billing.phone = phone;
  data.shipping.address_1 = address1;
  data.shipping.address_2 = address2;

  const profileUpdate = useCallback(
    () => [dispatch(profileActions.updateCustomerDetails(profile?.id, data))],
    [dispatch, data, profile.id],
  );

  const phoneView = () => {
    return edit ? (
      <TextInput
        value={phone}
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
        placeholder={'Phone number'}
        style={styles.inputField}
      />
    ) : (
      <Text style={{ color: '#777777', marginLeft: 20 }}>
        {profile?.billing?.phone}
      </Text>
    );
  };

  const addressView = () => {
    return edit ? (
      <View>
        <TextInput
          value={address1}
          mode="outlined"
          onChangeText={(text) => setAddress1(text)}
          placeholder={'Address'}
          style={styles.inputField}
        />
        <TextInput
          value={address2}
          mode="outlined"
          onChangeText={(text) => setAddress2(text)}
          placeholder={'Unit'}
          style={styles.inputField}
        />
      </View>
    ) : (
      <Text style={{ color: '#777777', marginLeft: 20 }}>
        {profile?.shipping?.address_1 +
          ', ' +
          profile?.shipping?.address_2 +
          '\n' +
          profile?.shipping?.city +
          ' ' +
          profile?.shipping?.postcode}
      </Text>
    );
  };

  return (
    <ScrollView>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: profile?.avatar_url,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20, marginEnd: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {profile?.first_name + ' ' + profile?.last_name}
            </Title>
            <Caption style={styles.caption}> {profile?.email}</Caption>
          </View>
          <TouchableRipple
            rippleColor="rgba(0, 0, 0, .0)"
            onPress={() => {
              setEdit(!edit);
              edit && profileUpdate();
            }}>
            <View style={styles.editSave}>
              <View style={styles.editSave} />
              <Icon name={iconMode} color={iconColor} size={28} />
            </View>
          </TouchableRipple>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" size={20} style={styles.fieldIcons} />
          {addressView()}
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={20} style={styles.fieldIcons} />
          {phoneView()}
        </View>
        <View style={styles.row}>
          <Icon name="email" size={20} style={styles.fieldIcons} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {profile?.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox]}>
          <Title>$140.50</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
      </View>
    </ScrollView>
  );
}
