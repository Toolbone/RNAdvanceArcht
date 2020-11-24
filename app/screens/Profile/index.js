import React from 'react';
import { Text } from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Profile() {
  const PHOTOS = Array.from({ length: 100 }).map(
    (_, i) => `https://unsplash.it/300/400/?random&__id=${i}${i}`,
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {PHOTOS.map((uri) => (
        <View key={uri} style={styles.item}>
          <Image source={{ uri }} style={styles.photo} />
        </View>
      ))}
    </ScrollView>
  );
}
