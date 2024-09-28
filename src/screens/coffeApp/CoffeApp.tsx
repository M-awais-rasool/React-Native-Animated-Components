import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {data} from './Data';
import {useNavigation} from '@react-navigation/native';
import {Pagination, PriceCard, Ticker} from '../../components/CoffeApp';
import Imageitem from '../../components/CoffeApp/ImageItem';

const {width, height} = Dimensions.get('window');
const itemWidth = 200;
const itemHeight = 200;
const spacing = 10;
const TICKER_HEIGHT = 40;

const Card = ({item, index, scrollX}: any) => {
  const nav: any = useNavigation();
  const inputRange = [
    (index - 1) * (itemWidth + spacing * 2),
    index * (itemWidth + spacing * 2),
    (index + 1) * (itemWidth + spacing * 2),
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [150, 1, 150],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.card, {transform: [{translateY: scale}]}]}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate('DetailScreen', {data: item});
        }}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const CoffeApp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: 60, zIndex: 2}}>
        <View style={styles.imageContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image source={require('./img/userImg.png')} />
            <View>
              <Text style={{color: '#5EA885'}}>Welcome</Text>
              <Text>Awais</Text>
            </View>
          </View>
          <View>
            <View style={styles.addCart}>
              <Text style={{color: 'white'}}>2</Text>
            </View>
            <Image
              source={require('./img/cart.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
      </View>
      <View style={styles.box1} />
      <View>
        <Svg height="150" width="100%" style={styles.svg}>
          <Path d="M0 105 Q150 40 300 70 T600 200 V200 H0 Z" fill="#5EA885" />
        </Svg>
        <Imageitem />
        <Animated.FlatList
          style={styles.flatList}
          data={data}
          renderItem={({item, index}) => (
            <Card item={item} index={index} scrollX={scrollX} />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth + spacing * 2}
          decelerationRate="fast"
          pagingEnabled
          contentContainerStyle={styles.flatListContainer}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}
        />
      </View>
      <Text style={styles.IWantText}>I Want</Text>
      <Ticker scrollX={scrollX} data={data} />
      <Text style={styles.doller}>$</Text>
      <PriceCard scrollX={scrollX} data={data} />
      <Pagination scrollX={scrollX} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  addCart: {
    width: 20,
    height: 20,
    borderRadius: 15,
    position: 'absolute',
    backgroundColor: '#5EA885',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
    right: -5,
  },
  container: {
    flex: 1,
    backgroundColor: '#5EA885',
  },
  box1: {
    height: height - 550,
    backgroundColor: 'white',
  },
  svg: {
    zIndex: 1,
    marginTop: -110,
  },

  flatList: {
    height: height,
    paddingTop: 40,
    marginTop: 50,
  },
  card: {
    width: itemWidth,
    height: itemHeight,
    marginHorizontal: spacing,
    borderRadius: 300,
    backgroundColor: '#6AB08a',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
    marginTop: -50,
  },
  textContainer: {
    padding: 10,
    height: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingLeft: (width - itemWidth) / 2,
    paddingRight: (width - itemWidth) / 2,
  },
  IWantText: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    fontSize: 45,
    color: 'black',
    fontWeight: '700',
  },

  doller: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT + 2,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    position: 'absolute',
    bottom: 73,
    zIndex: 2,
    alignSelf: 'center',
    left: 155,
  },
});

export default CoffeApp;
