import { StyleSheet } from 'react-native';
import * as Dimensions from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  item: {
    height: 300,
    width: '49%',
    padding: 1,
    margin: 2,
    borderRadius: 8,
    borderColor: '#333333',
    backgroundColor: '#ffffff',
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8,
    borderColor: '#333333',
  },
  textContainer: {
    margin: 10,
  },
  textPrice: {
    color: '#ff0000',
  },
});

export default styles;
