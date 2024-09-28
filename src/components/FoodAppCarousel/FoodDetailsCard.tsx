import React from 'react';
import {View, Image, StyleSheet, Dimensions, Animated} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
  image: any;
  scrollX: any;
  index: number;
}

export default function FoodDetailsCard({image, scrollX, index}: Props) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [-150, 1, -150],
    extrapolate: 'clamp',
  });
  const cardHeight = scrollX.interpolate({
    inputRange,
    outputRange: [5, width * 0.6 , 5],
    extrapolate: 'clamp',
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
    extrapolate: 'clamp',
  });
  const imageRotate = scrollX.interpolate({
    inputRange,
    outputRange: ['-180deg', '0deg', '180deg'],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={image}
          style={[
            styles.pizzaImage,
            {
              height: cardHeight,
              width: cardHeight,
              opacity,
              transform: [{translateY: scale}, {rotate: imageRotate}],
            },
          ]}
          resizeMode="cover"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -14,
    marginLeft: 1,
  },
  imageContainer: {
    width: width * 0.6 + 20,
    height: width * 0.6 + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pizzaImage: {
    width: '95%',
    height: '95%',
    borderRadius: (width * 0.8 * 0.95) / 2,
  },
});
