import { StyleSheet } from 'react-native';

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
    height: 100,
    width: '33%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default styles;
