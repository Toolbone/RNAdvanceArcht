import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Image, Modal, StyleSheet } from 'react-native';

export default class Loader extends Component {
  render() {
    const { animationType, modalVisible } = this.props;
    return (
      <Modal animationType={animationType} transparent visible={modalVisible}>
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <Image
              style={styles.loaderImage}
              source={require('./assets/loader.gif')}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  animationType: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loaderContainer: {
    width: 90,
    height: 80,
    backgroundColor: '#f1f2f3',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#333333',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  loaderImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    position: 'relative',
    left: '50%',
    marginLeft: -40,
    top: '50%',
    marginTop: -40,
  },
});
