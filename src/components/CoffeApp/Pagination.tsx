import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
const {width, height} = Dimensions.get('window');

interface Props {
  data: any;
  scrollX: any;
}

const DOT_SIZE = 40;

export const Pagination = (props: Props) => {
  const inputRange = [-width, 0, width];
  const translateX = props.scrollX.interpolate({
    inputRange,
    outputRange: [-72, 0, 72],
  });
  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            transform: [{translateX}],
          },
        ]}
      />
      {props.data.map((item: any) => {
        return (
          <View style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, {backgroundColor: item.color}]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    height: DOT_SIZE,
    alignSelf: 'center',
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});
