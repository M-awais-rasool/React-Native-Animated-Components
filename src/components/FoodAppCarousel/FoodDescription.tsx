import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';

export default function FoodDescription() {
  return (
    <View style={styles.flxRow}>
      <View>
        <Text style={styles.price}>$30.0</Text>
        <Rating
          type="custom"
          ratingColor="#f1c40f"
          ratingCount={5}
          imageSize={20}
          readonly
          style={styles.rating}
        />
        <View
          style={[
            styles.flxRow,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Image
            source={require('../../screens/foodAppCarousel/img/bike.png')}
          />
          <Text style={styles.deliivryText}>12 mins delivery</Text>
        </View>
      </View>
      <View style={styles.flxRow}>
        <View style={styles.iconContaiiner}>
          <Image
            source={require('../../screens/foodAppCarousel/img/back-arrow.png')}
          />
        </View>
        <View style={styles.iconContaiiner}>
          <Image
            source={require('../../screens/foodAppCarousel/img/right-arrow.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    paddingTop: 10,
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: 'black',
  },
  deliivryText: {
    fontSize: 14,
  },
  flxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  iconContaiiner: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
