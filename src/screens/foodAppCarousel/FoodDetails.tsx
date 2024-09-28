import React, {useRef} from 'react';
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
import {FoodDetailsCard} from '../../components/FoodAppCarousel';

const {width} = Dimensions.get('window');

export default function FoodDetails() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Pizza</Text>
        <TouchableOpacity>
          <Text style={styles.headerText}>♡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <Image source={require('./img/leaf1.png')} style={styles.leafImg} />
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
        <Image source={require('./img/wood.png')} style={styles.boardImg} />
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
    alignItems: 'center',
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
  boardImg: {
    width: 350,
    height: 350,
    position: 'absolute',
    zIndex: -1,
  },
  leafImg: {
    position: 'absolute',
    zIndex: -1,
    width: 50,
    height: 50,
    top: 70,
    left: 60,
    resizeMode: 'contain',
  },
});
