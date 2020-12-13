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
    fontSize: 20,
  },
  headerContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 0,
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  deleteButton: {
    marginLeft: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
});

export default styles;
