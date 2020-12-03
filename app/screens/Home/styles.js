import { StyleSheet } from 'react-native';
import * as Dimensions from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    marginTop: 5,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  chip: {
    width: 80,
    margin: 2,
    backgroundColor: '#bbbbbb',
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
