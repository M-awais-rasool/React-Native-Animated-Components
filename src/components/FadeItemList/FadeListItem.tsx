import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const SPACING = 20;
export const IMAGE_SIZE = 70;
export const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;
export const WIDTH = Dimensions.get('window').width;

const FadeListItem = ({
  item,
  index,
  scrollY,
}: any & {
  scrollY: Animated.Value;
}) => {
  const inputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 2),
  ];

  const opacityInputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 1),
  ];

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.parentViewItem,
        {
          opacity,
          transform: [{scale}],
        },
      ]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.job}>{item.jobTitle}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </Animated.View>
  );
};

export default FadeListItem;

const styles = StyleSheet.create({
  parentViewItem: {
    height: 118,
    flexDirection: 'row',
    padding: SPACING,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 3,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: SPACING / 2,
  },
  textContainer: {
    width: WIDTH - 2 * SPACING - SPACING - IMAGE_SIZE - SPACING,
  },
  name: {
    fontSize: 22,
    color: 'black',
  },
  job: {
    fontSize: 16,
    opacity: 0.7,
    color: 'black',
  },
  email: {
    opacity: 0.8,
    color: '#0099cc',
  },
});
