import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {DonutsCard} from '../../components/DonutsApp';
import data from './data';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth * 0.8;
const itemHeight = itemWidth * 0.75;

const DonutsApp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef :any= useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: false });
    }
  }, []);

  const handleScrollEnd = (event:any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / (itemWidth - 54));
    const targetPosition = index * (itemWidth - 54);

    Animated.spring(scrollX, {
      toValue: targetPosition,
      tension: 20, 
      friction: 7,
      useNativeDriver: true,
    }).start();

    Animated.timing(scrollX, {
      toValue: targetPosition,
      duration: 500, 
      easing: Easing.inOut(Easing.cubic), 
      useNativeDriver: true,
    }).start(() => {
      scrollViewRef.current.scrollTo({ x: targetPosition, animated: false });
    });
  };
  const backgroundColor = scrollX.interpolate({
    inputRange: data.map((_, index) => index * itemWidth),
    outputRange: data.map((item) => item.color || '#FFFFFF'),
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.container,{backgroundColor} ]}>
        <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={itemWidth - 54}
        decelerationRate={1.992} 
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {data.map((item, index) => (
          <DonutsCard
            key={index}
            item={item}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingHorizontal: (screenWidth - itemWidth ) / 1.3,
    marginTop:200
  },
});
export default DonutsApp;
