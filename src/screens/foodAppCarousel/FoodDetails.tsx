import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {pizza} from './Data';
import {
  DetailsHeading,
  FoodDetailsCard,
} from '../../components/FoodAppCarousel';
import Animate, {FadeInLeft, FadeInRight} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export default function FoodDetails() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scroll = useRef(new Animated.Value(0)).current;
  const positionX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(positionX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, 400);
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}> */}
        <DetailsHeading scrollX={scrollX} data={pizza} />
        
      {/* </View> */}
      <View style={styles.carouselContainer}>
        <Animate.View
          style={styles.leafImg}
          entering={FadeInLeft.duration(1000).springify()}>
          <Animate.Image
            style={[styles.img, {transform: [{rotate: '-30deg'}]}]}
            source={require('./img/leaf1.png')}
          />
        </Animate.View>
        <Animate.View
          style={styles.leafImg1}
          entering={FadeInRight.duration(1000).springify()}>
          <Animate.Image style={styles.img} source={require('./img/leaf1.png')} />
        </Animate.View>
        <Animate.View
          entering={FadeInLeft.duration(1000).springify()}
          style={styles.leafImg2}>
          <Animate.Image
            source={require('./img/leaf1.png')}
            style={[styles.img, {transform: [{rotate: '80deg'}]}]}
          />
        </Animate.View>
        <Animate.View
          style={styles.leafImg3}
          entering={FadeInRight.duration(1000).springify()}>
          <Animate.Image
            source={require('./img/leaf2.png')}
            style={[styles.img, {transform: [{rotate: '-120deg'}]}]}
          />
        </Animate.View>
        <Animated.View style={{transform: [{translateX: positionX}]}}>
          <Animated.FlatList
            data={pizza}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}: any) => (
              <FoodDetailsCard
                index={index}
                image={item.image}
                scrollX={scrollX}
              />
            )}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
          />
        </Animated.View>
        <View style={styles.boardImgContainer}>
          <Image source={require('./img/wood.png')} style={styles.boardImg} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  boardImgContainer: {
    width: 310,
    height: 310,
    position: 'absolute',
    zIndex: -1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 200,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
  },
  boardImg: {
    width: 360,
    height: 360,
    marginTop: -20,
    marginLeft: -8,
  },
  leafImg: {
    position: 'absolute',
    zIndex: -1,
    width: 50,
    height: 50,
    top: 70,
    left: 35,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    transform: [{rotate: '30deg'}],
  },
  leafImg1: {
    position: 'absolute',
    zIndex: -1,
    width: 50,
    height: 50,
    top: 50,
    right: 70,
  },
  leafImg2: {
    position: 'absolute',
    zIndex: -1,
    width: 50,
    height: 50,
    bottom: 50,
    right: 50,
  },
  leafImg3: {
    position: 'absolute',
    zIndex: -1,
    width: 60,
    height: 60,
    bottom: 50,
    left: 60,
  },
});
