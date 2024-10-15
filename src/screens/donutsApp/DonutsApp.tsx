import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Calories, CartBtn, DonutsCard} from '../../components/DonutsApp';
import data from './data';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth * 0.8;
const itemHeight = itemWidth * 0.75;
const EXPANDED_WIDTH = screenWidth - 20;
const ICON_SIZE = 50;

const DonutsApp = () => {
  const box1 = useRef(new Animated.Value(0)).current;
  const box2 = useRef(new Animated.Value(0)).current;
  const box3 = useRef(new Animated.Value(0)).current;
  const box4 = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const cartBtn = useRef(new Animated.Value(0)).current;
  const bgImg = useRef(new Animated.Value(0)).current;

  const scrollViewRef: any = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [flag, setFlag] = useState(false);
  const [storeImg, setStoreImg] = useState();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({x: 0, animated: false});
    }
  }, []);
  const toggleExpansion = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(cartBtn, {
      toValue,
      useNativeDriver: true,
    }).start();
  };
  const imageRotate = (img?: any) => {
    if (img) setStoreImg(img);
    const toValue = flag ? 0 : 1;
    Animated.parallel([
      Animated.spring(bgImg, {
        toValue,
        friction: 5,
        useNativeDriver: false,
      }),
      Animated.timing(box1, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(box2, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(box3, {
        toValue,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(box4, {
        toValue,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    setFlag(!flag);
  };

  const handleScrollEnd = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / (itemWidth - 54));
    const targetPosition = index * (itemWidth - 54);

    Animated.spring(scrollX, {
      toValue: targetPosition,
      tension: 10,
      friction: 4,
      useNativeDriver: true,
    }).start();

    Animated.timing(scrollX, {
      toValue: targetPosition,
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      scrollViewRef.current?.scrollTo({x: targetPosition, animated: false});
    });
  };
  const backgroundColor = scrollX.interpolate({
    inputRange: data.map((_, index) => index * itemWidth),
    outputRange: data.map(item => item.color || '#FFFFFF'),
    extrapolate: 'clamp',
  });
  const translateY = cartBtn.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 1],
  });
  const dountsImg = {
    transform: [
      {
        translateX: bgImg.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 150],
        }),
      },
      {
        translateY: bgImg.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      },
      {
        rotate: bgImg.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
    width: bgImg.interpolate({
      inputRange: [0, 1],
      outputRange: [0, EXPANDED_WIDTH],
    }),
    height: bgImg.interpolate({
      inputRange: [0, 1],
      outputRange: [0, EXPANDED_WIDTH],
    }),
  };
  const title = bgImg.interpolate({
    inputRange: [0, 1],
    outputRange: [EXPANDED_WIDTH, 0],
  });
  const backArrow = bgImg.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });
  const logo = bgImg.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const quntity = bgImg.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 1],
  });
  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <Animated.View
        style={[styles.logoContainer, {transform: [{translateY: logo}]}]}>
        <Image style={styles.logoImg} source={require('./img/logo.png')} />
      </Animated.View>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => imageRotate()}>
          <Animated.Image
            style={{width:30,height:30,transform: [{translateX: backArrow}]}}
            source={{uri:'https://w7.pngwing.com/pngs/261/790/png-transparent-computer-icons-arrow-back-angle-hand-desktop-wallpaper-thumbnail.png'}}
          />
        </TouchableOpacity>
        <Animated.Text
          style={[styles.dountsName, {transform: [{translateX: title}]}]}>
          Pink
        </Animated.Text>
      </View>
      {!flag && (
        <View style={{position: 'absolute', height: itemHeight * 1.8}}>
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
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}>
            {data.map((item, index) => (
              <DonutsCard
                key={index}
                item={item}
                index={index}
                scrollX={scrollX}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                toggle={() => toggleExpansion()}
                onPress={() => imageRotate(item.image)}
              />
            ))}
          </Animated.ScrollView>
        </View>
      )}
      {/* {flag && ( */}
      <Animated.Image source={storeImg} style={[styles.image, dountsImg]} />
      {/* )} */}
      <Animated.View style={[styles.btnContainer, {transform: [{translateY}]}]}>
        <CartBtn />
      </Animated.View>
      <View style={{position:'absolute'}}>
      <Calories flag={flag} box1={box1} box2={box2} box3={box3} box4={box4}/>
      </View>
      <Animated.View style={[styles.Addbox,{transform:[{translateY:quntity}]}]}>
          <View style={styles.addImageContainer}>
            <Image
              style={styles.addImage}
              source={{
                uri: 'https://static.thenounproject.com/png/961411-200.png',
              }}
            />
          </View>
            <Text style={[styles.dountsName, ]}>0</Text>
            <View style={[styles.addImageContainer, {right: 4, left: null}]}>
              <Image
                style={styles.addImage}
                source={{
                  uri: 'https://www.iconpacks.net/icons/2/free-minus-icon-3108-thumb.png',
                }}
              />
            </View>
        </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingHorizontal: (screenWidth - itemWidth) / 1.3,
  },

  btnContainer: {
    marginVertical: 20,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  image: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: screenWidth / 1.7,
  },
  dountsName: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  logoImg: {
    width: 200,
    height: 200,
    marginTop: -30,
  },
  Addbox: {
    position: 'absolute',
    bottom: 120,
    width:150,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 2,
    alignItems: 'center',
  },
  addImageContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 25)',
    borderRadius: ICON_SIZE / 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 4,
    top: 6,
  },
  addImage: {
    width: 30,
    height: 30,
  },
});
export default DonutsApp;
