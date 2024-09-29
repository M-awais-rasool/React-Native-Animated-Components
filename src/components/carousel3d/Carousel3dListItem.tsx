import React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {WIDTH} from '../../utils/device';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from './constants';

 type ICarousel3DProps = {
  item: any;
  index: number;
  scrollX: Animated.AnimatedValue;
};

const Carousel3dListItem = (props: ICarousel3DProps) => {
  const inputRange = [(props.index - 1) * WIDTH, props.index * WIDTH, (props.index + 1) * WIDTH];

  const opacity = props.scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateY = props.scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 20],
  });

  return (
    <Animated.View
      style={[styles.container, {opacity, transform: [{translateY}]}]}>
      <Image source={{uri: props.item.image}} style={styles.image} />
    </Animated.View>
  );
};

export default Carousel3dListItem;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    paddingVertical: SPACING,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
});
