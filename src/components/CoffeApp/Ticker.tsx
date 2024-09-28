import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
const {width, height} = Dimensions.get('window');

interface Props {
  data: any;
  scrollX: any;
}
const TICKER_HEIGHT = 40;
export const Ticker = (props: Props) => {
  const inputRange = [-width, 0, width];
  const translateY = props.scrollX.interpolate({
    inputRange,
    outputRange: [75, 0, -75],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {props.data.map(({title, color}: any, index: any) => {
          return (
            <Text key={index} style={[styles.tickerText, {color}]}>
              {title}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tickerContainer: {
    position: 'absolute',
    top: 150,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
    width: '100%',
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT + 2,
    textTransform: 'uppercase',
    fontWeight: '800',
    textAlign: 'center',
  },
});
