import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

export default function Profile() {
  const profile = useSelector((state) => state.customerDetailsReducer.profile);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(profile?.billing?.phone);

  const iconMode = edit ? 'content-save' : 'account-edit';
  const iconColor = edit ? '#00aa00' : '#555555';

  const phoneView = () => {
    return edit ? (
      <TextInput
        value={username}
        mode="outlined"
        onChangeText={(text) => setUsername(text)}
        placeholder={'Username'}
        style={styles.input}
      />
    ) : (
      <Text style={{ color: '#777777', marginLeft: 20 }}>
        {profile?.billing?.phone}
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
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {profile?.shipping?.address_1 +
              ', ' +
              profile?.shipping?.address_2 +
              '\n' +
              profile?.shipping?.city +
              ' ' +
              profile?.shipping?.postcode}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          {phoneView()}
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
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
