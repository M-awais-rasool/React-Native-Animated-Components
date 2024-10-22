import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const AnimatedLamp = () => {
  const [isOn, setIsOn] = useState(false);
  const pullValue = useRef(new Animated.Value(0)).current;
  const nav = useNavigation();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy > 0 && gesture.dy <= 270) {
        pullValue.setValue(gesture.dy);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      setIsOn(!isOn);
      Animated.timing(pullValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => {
          nav.goBack();
        }}>
        <Image
          source={require('./img/backArrow.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>

      {/* Lamp */}
      <Image source={require('./img/1.png')} style={styles.lampImg} />
      {isOn && (
        <LinearGradient
          colors={['rgba(220, 213, 192, 0.8)', 'rgba(220, 213, 192, 0)']}
          style={styles.shadow}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />
      )}

      {/* Pull Down Control */}
      <Animated.View
        style={[
          styles.pullControl,
          {
            transform: [{translateY: pullValue}],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.pullLine} />
        <Text style={styles.pullDownText}>PULL DOWN</Text>
        <View style={styles.pullHandle} />
      </Animated.View>

      {/* On/Off Status */}
      <View
        style={[
          styles.statusContainer,
          isOn && {backgroundColor: 'rgb(27, 36, 29)'},
        ]}>
        <Text
          style={[styles.statusText, {color: isOn ? '#4CAF50' : '#FF5252'}]}>
          {isOn ? 'ON' : 'OFF'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backImage: {
    width: 30,
    height: 30,
    marginTop: 40,
    marginLeft: 10,
  },
  lampImg: {
    width: 300,
    height: 300,
    position: 'absolute',
  },

  pullDownTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pullDownText: {
    color: '#666',
    fontSize: 20,
    position: 'absolute',
    top: height / 2.9,
    transform: [{rotate: '270deg'}],
    width: 150,
    left: -75,
  },
  pullControl: {
    position: 'absolute',
    right: 50,
    top: -height / 3.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pullLine: {
    backgroundColor: 'white',
    width: 2,
    height: height / 2,
  },
  pullHandle: {
    width: 30,
    height: 60,
    borderColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    marginTop: -30,
  },
  statusContainer: {
    position: 'absolute',
    width: 130,
    alignItems: 'center',
    right: -0,
    backgroundColor: 'rgb(40, 26, 26)',
    height: 80,
    bottom: -10,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shadow: {
    width: 60,
    height: 300,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 230,
    left: 120,
    shadowOpacity: 0.2,
    transform: [{scaleX: 2.5}],
    opacity: 0.8,
    zIndex: -1,
  },
});

export default AnimatedLamp;
