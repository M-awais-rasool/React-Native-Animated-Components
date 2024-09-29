import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DATA} from '../../screens/3DCarousel/data';
import {IMAGE_WIDTH, SPACING} from './constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

 type ArrowProps = {
  index: number;
  disabledLeft: boolean;
  disabledRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
};
const Arrows = (props: ArrowProps) => {
  return (
    <View style={styles.arrowsContainer}>
      <TouchableOpacity
        disabled={props.disabledLeft}
        style={{opacity: props.index === 0 ? 0.25 : 1}}
        onPress={props.onPressLeft}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>PREV</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.disabledRight}
        style={{opacity: props.index === DATA.length - 1 ? 0.25 : 1}}
        onPress={props.onPressRight}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>NEXT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Arrows;

const styles = StyleSheet.create({
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 12,
    color: 'black',
  },
});
