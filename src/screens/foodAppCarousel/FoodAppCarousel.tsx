import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {burger, categories, data, pizza} from './Data';
import {
  BannerCard,
  CategoriesCard,
  PapularCard,
} from '../../components/FoodAppCarousel';

export default function FoodAppCarousel(props: any) {
  const [flag, setFlag] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const {navigation} = props;

  const isActive = (id: any) => {
    setFlag(!flag);
    for (let i = 0; i < categories.length; i++) {
      categories[i].isActive = categories[i].id === id;
    }
  };

  useEffect(() => {
    if (flag) {
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      scrollY.setValue(1);
    }
  }, [flag]);

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.margin}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}: any) => (
            <CategoriesCard
              image={item.image}
              name={item.name}
              isActive={item.isActive}
              onPress={() => {
                isActive(item.id);
              }}
            />
          )}
        />
      </View>
      {!flag && (
        <>
          <View>
            <FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}: any) => (
                <BannerCard
                  logo={item.logo}
                  image={item.image}
                  name={item.name}
                  time={item.time}
                />
              )}
            />
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.name}>Popular</Text>
            <Text style={styles.name}>See all</Text>
          </View>

          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={burger}
              renderItem={({item}: any) => (
                <PapularCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onPress={() => navigation.navigate('FoodDetails')}
                />
              )}
            />
          </View>
        </>
      )}
      {flag && (
        <Animated.View
          style={[styles.popularContainer, {transform: [{translateY}]}]}>
          <FlatList
            data={pizza}
            numColumns={2}
            renderItem={({item}: any) => (
              <PapularCard
                image={item.image}
                name={item.name}
                price={item.price}
                onPress={() => navigation.navigate('FoodDetails')}
              />
            )}
          />
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  margin: {
    marginTop: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    letterSpacing: 0.5,
  },
  popularContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
