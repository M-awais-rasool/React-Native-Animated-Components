import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('screen');
const CartBtn = () => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.cartBtn}>
        <Text style={styles.cartText}>Add To Cart</Text>
      </TouchableOpacity>
      <View style={[styles.cartBtn, {backgroundColor: '#FFFF'}]}>
        <Text style={styles.priceText}>$2.2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartBtn: {
    backgroundColor: 'black',
    width: width - 280,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 7,
    elevation: 2,
    alignItems: 'center',
    width: width - 100,
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CartBtn;
