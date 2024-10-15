import {
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  Easing,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth * 0.8;
const itemHeight = itemWidth * 0.75;
const ICON_SIZE = 50;
const EXPANDED_WIDTH = screenWidth - 250;
interface Props {
  item: any;
  index: any;
  scrollX: any;
  isExpanded: boolean;
  setIsExpanded: (i: boolean) => void;
  toggle: () => void;
  onPress: () => void;
}
const DonutsCard = ({
  item,
  index,
  scrollX,
  isExpanded,
  setIsExpanded,
  toggle,
  onPress,
}: Props) => {
  const progress = useRef(new Animated.Value(0)).current;

  const toggleExpansion = () => {
    toggle();
    const toValue = isExpanded ? 0 : 1;
    Animated.parallel([
      Animated.timing(progress, {
        toValue,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }),
    ]).start();
    setIsExpanded(!isExpanded);
  };
  const inputRange = [
    (index - 1) * itemWidth,
    index * itemWidth,
    (index + 1) * itemWidth,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [150, 1, 150],
    extrapolate: 'clamp',
  });
  const rotate = scrollX.interpolate({
    inputRange,
    outputRange: ['-80deg', '0deg', '80deg'],
    extrapolate: 'clamp',
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [ICON_SIZE, EXPANDED_WIDTH],
  });
  return (
    <Animated.View
      style={[styles.itemContainer, {transform: [{translateY: scale}]}]}>
      <Pressable onPress={onPress}>
        <Animated.Image
          source={item.image}
          style={[styles.image,]}
        />
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          toggleExpansion();
        }}>
        <Animated.View style={[styles.Addbox, {width}]}>
          <View style={styles.addImageContainer}>
            <Image
              style={styles.addImage}
              source={{
                uri: 'https://static.thenounproject.com/png/961411-200.png',
              }}
            />
          </View>
          {isExpanded && (
            <Text style={[styles.itemName, {fontWeight: '700'}]}>0</Text>
          )}
          {isExpanded && (
            <View style={[styles.addImageContainer, {right: 4, left: null}]}>
              <Image
                style={styles.addImage}
                source={{
                  uri: 'https://www.iconpacks.net/icons/2/free-minus-icon-3108-thumb.png',
                }}
              />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.textContainer, {opacity}]}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth - 55,
    height: itemHeight,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  Addbox: {
    position: 'absolute',
    bottom: -20,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 2,
    alignItems: 'center',
  },
  addImageContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 25)',
    borderRadius: ICON_SIZE / 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 4,
    top: 6,
  },
  textContainer: {
    alignSelf: 'center',
    marginTop: 40,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
  },
  itemPrice: {
    fontSize: 18,
    color: 'black',
    marginTop: 7,
    fontWeight: 'bold',
  },
  addImage: {
    width: 30,
    height: 30,
  },
});
export default DonutsCard;
