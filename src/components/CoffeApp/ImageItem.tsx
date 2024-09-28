import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function Imageitem() {
  return (
    <View style={styles.imagesContainer}>
      <View style={styles.imagesInnerContainer}>
        <View style={{alignItems: 'center', width: 60, height: 60}}>
          <View style={styles.icon}>
            <Image
              source={require('../../screens/coffeApp/img/drink.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <Text style={styles.coffeText}>DRINKS</Text>
        </View>
        <View style={{alignItems: 'center', width: 60, height: 60}}>
          <View style={styles.icon}>
            <Image
              source={require('../../screens/coffeApp/img/coffee.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <Text style={styles.coffeText}>COFFE</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center', width: 70, height: 60}}>
          <View style={styles.icon}>
            <Image
              source={require('../../screens/coffeApp/img/bread.png')}
              style={{width: 30, height: 30}}
            />
          </View>
          <Text style={styles.coffeText}>BAKERY</Text>
        </View>
        <View style={{alignItems: 'center', width: 70, height: 60}}>
          <View style={styles.icon}>
            <Image
              source={require('../../screens/coffeApp/img/coffee.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <Text style={styles.coffeText}>TEA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    top: -40,
    zIndex: 2,
    flex: 1,
    paddingHorizontal: 20,
  },
  imagesInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    alignSelf: 'center',
  },
  icon: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 7,
  },
});
