import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cartItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 2,
    width: 380,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: '#888',
    fontSize: 16,
    marginStart: 0,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceText: {
    fontSize: 16,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  mainText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
  deleteIcon: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
});
