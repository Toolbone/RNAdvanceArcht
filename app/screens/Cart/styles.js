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
  headerText: {
    fontSize: 16,
  },
  rightContainer: {
    marginTop: 20,
  },
  listContainer: {
    marginTop: 50,
  },
  item: {
    height: 100,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },

  deleteContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  deleteButton: {
    marginLeft: 20,
  },
  deleteIcon: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
});

export default styles;
