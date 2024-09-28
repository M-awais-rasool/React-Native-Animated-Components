import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
const {width, height} = Dimensions.get('window');

interface Props {
  data: any;
  scrollX: any;
}

const TICKER_HEIGHT = 40;

export const PriceCard = (props: Props) => {
  const inputRange = [-width, 0, width];
  const translateY = props.scrollX.interpolate({
    inputRange,
    outputRange: [75, 0, -75],
  });

  return (
    <View style={styles.priceContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {props.data.map(({price}: any, index: any) => {
          return (
            <Text key={index} style={[styles.price]}>
              {price}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    position: 'absolute',
    bottom: 77,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
    width: '100%',
  },
  price: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT + 2,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    left: 10,
  },
});
