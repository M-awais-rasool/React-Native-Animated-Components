import {View, Text, StyleSheet, Animated, Easing, Dimensions} from 'react-native';
import React, {useRef} from 'react';
const {width: screenWidth} = Dimensions.get('window');

const Calories = ({flag, box1, box2, box3, box4}: any) => {
  const translateX1 = box1.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 50],
  });
  const translateX2 = box2.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 50],
  });
  const translateX3 = box3.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 50],
  });
  const translateX4 = box4.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 50],
  });
  return (
    <View>
      <Animated.View
        style={[styles.boxContainer, {transform: [{translateX: translateX1}]}]}>
        <Text style={styles.title}>
          Salt<Text style={styles.subTitle}> 8g</Text>
        </Text>
        <View style={styles.subBox}>
          <Text style={styles.subTitle}>3%</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.boxContainer,
          {transform: [{translateX: translateX2}]},
          {width: 130},
        ]}>
        <Text style={styles.title}>
          Sugar<Text style={styles.subTitle}> 8g</Text>
        </Text>
        <View style={[styles.subBox, {backgroundColor: '#f2bdf9'}]}>
          <Text style={styles.subTitle}>8%</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.boxContainer,
          {transform: [{translateX: translateX3}]},
          ,
          {width: 110},
        ]}>
        <Text style={styles.title}>
          Fat<Text style={styles.subTitle}> 8g</Text>
        </Text>
        <View
          style={[
            styles.subBox,
            {backgroundColor: '#c9d3ea', paddingHorizontal: 5},
          ]}>
          <Text style={styles.subTitle}>12%</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.boxContainer,
          {transform: [{translateX: translateX4}]},
          ,
          {width: 150},
        ]}>
        <Text style={styles.title}>
          Energy<Text style={styles.subTitle}> 140</Text>
        </Text>
        <View
          style={[
            styles.subBox,
            {backgroundColor: '#efcbce', paddingHorizontal: 5},
          ]}>
          <Text style={styles.subTitle}>40%</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: 'white',
    width: 120,
    height: 45,
    borderRadius: 30,
    elevation: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingRight: 5,
    paddingLeft: 10,
  },
  subBox: {
    padding: 8,
    paddingHorizontal: 9,
    borderRadius: 50,
    backgroundColor: '#9d9adf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.8,
  },
  subTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '300',
  },
});
export default Calories;
