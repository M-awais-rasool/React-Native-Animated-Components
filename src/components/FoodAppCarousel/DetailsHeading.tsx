import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');

interface Props {
  data: any;
  scrollX: any;
}
export default function DetailsHeading(pros: Props) {
  const translateY = pros.scrollX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [48, 0, -48],
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../screens/foodAppCarousel/img/back-arrow.png')}
        />
      </TouchableOpacity>
      <Animated.View
        style={{transform: [{translateY: translateY}], rowGap: 15, height: 40}}>
        {pros?.data?.map(({name}: any, index: any) => {
          return (
            <View key={index}>
              <Text style={styles.text}>{name}</Text>
            </View>
          );
        })}
      </Animated.View>
      <TouchableOpacity>
        <Image source={require('../../screens/foodAppCarousel/img/cart.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginTop: 12,
  },
});
