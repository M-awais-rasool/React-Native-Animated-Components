import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SearchModel } from '../../components/ExpandingSearchBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SEARCH_ICON_SIZE = 50;
const EXPANDED_WIDTH = SCREEN_WIDTH - 100;
const BASE_COLOR = 'rgba(252, 176, 69, 0.8)';
const GRADIENT_START = 'rgba(255, 255, 255, 1)';
const GRADIENT_END = 'rgba(252, 176, 69, 0.9)';
const ICON_COLOR = 'rgba(0, 0, 0, 1)';
const RIPPLE_COLOR = 'rgba(252, 176, 69, 0.2)';

const ExpandingSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const inputRef :any= useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;
  const closeButtonAnimation = useRef(new Animated.Value(0)).current;

  const toggleExpansion = () => {
    if (isExpanded && inputRef.current) {
      inputRef.current.blur();
    }
    const toValue = isExpanded ? 0 : 1;
    Animated.parallel([
      Animated.timing(progress, {
        toValue,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.timing(closeButtonAnimation, {
        toValue,
        duration: 700,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
    ]).start();

    if (!isExpanded) {
      const rippleAnimation = (ripple:any) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(ripple, {
              toValue: 1,
              duration: 1000,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: false,
            }),
            Animated.timing(ripple, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      };

      rippleAnimation(ripple1);
      setTimeout(() => rippleAnimation(ripple2), 333);
      setTimeout(() => rippleAnimation(ripple3), 666);
    } else {
      ripple1.setValue(0);
      ripple2.setValue(0);
      ripple3.setValue(0);
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const animatedStyle = {
    width: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [SEARCH_ICON_SIZE, EXPANDED_WIDTH],
    }),
    backgroundColor: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [BASE_COLOR, 'rgba(253, 241, 244, 0.95)'],
    }),
  };

  const closeButtonStyle = {
    transform: [
      {
        translateX: closeButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, EXPANDED_WIDTH-135],
        }),
      },
      {
        rotate: closeButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '900deg'],
        }),
      },
    ],
    opacity: closeButtonAnimation,
  };

  const createRippleStyle = (ripple:any) => ({
    width: ripple.interpolate({
      inputRange: [0, 1],
      outputRange: [SEARCH_ICON_SIZE, EXPANDED_WIDTH],
    }),
    height: ripple.interpolate({
      inputRange: [0, 1],
      outputRange: [SEARCH_ICON_SIZE, SEARCH_ICON_SIZE * 1.5],
    }),
    borderRadius: ripple.interpolate({
      inputRange: [0, 1],
      outputRange: [SEARCH_ICON_SIZE / 2, EXPANDED_WIDTH / 2],
    }),
    opacity: ripple.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 0.3],
    }),
    transform: [
      {
        scale: ripple.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  });

  const rippleStyle1 = createRippleStyle(ripple1);
  const rippleStyle2 = createRippleStyle(ripple2);
  const rippleStyle3 = createRippleStyle(ripple3);

  const handleTextChange = (text:any) => {
    setSearchText(text);
    setShowModal(text.length > 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSearchText('');
    toggleExpansion();
  };

  const handleProductSelect = () => {
    setShowModal(false);
    setSearchText('');
    setIsExpanded(false);
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 0,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.timing(closeButtonAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
    ]).start();
    ripple1.setValue(0);
    ripple2.setValue(0);
    ripple3.setValue(0);
  };

  return (
    <Pressable onPress={toggleExpansion}>
      <View style={styles.container}>
        <Animated.View style={[styles.subContainer, animatedStyle,isExpanded&&{left:10}]}>
          <LinearGradient
            colors={[GRADIENT_START, GRADIENT_END]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <Animated.View style={[styles.ripple, rippleStyle1]} />
          <Animated.View style={[styles.ripple, rippleStyle2]} />
          <Animated.View style={[styles.ripple, rippleStyle3]} />
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Image
                source={require('./img/search.png')}
                style={styles.searchIcon}
              />
            </View>
          </View>
          {isExpanded && (
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={searchText}
              onChangeText={handleTextChange}
            />
          )}
        </Animated.View>
        <Animated.View style={[styles.closeButton, closeButtonStyle]}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Image source={require('./img/cross.png')} style={styles.closeIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <SearchModel
        visible={showModal}
        onClose={handleCloseModal}
        onProductSelect={handleProductSelect}
        searchText={searchText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    position: 'absolute',
    top: 10,
    height: SEARCH_ICON_SIZE,
    borderRadius: SEARCH_ICON_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf:'center',
  },
  ripple: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: RIPPLE_COLOR,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: SEARCH_ICON_SIZE,
    height: SEARCH_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconBackground: {
    width: SEARCH_ICON_SIZE - 4,
    height: SEARCH_ICON_SIZE - 4,
    borderRadius: (SEARCH_ICON_SIZE - 4) / 2,
    backgroundColor: BASE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: SEARCH_ICON_SIZE * 0.6,
    height: SEARCH_ICON_SIZE * 0.6,
    tintColor: ICON_COLOR,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingLeft: SEARCH_ICON_SIZE + 5,
    paddingRight: SEARCH_ICON_SIZE,
    fontSize: 16,
    color: 'rgba(40, 44, 63, 0.9)',
    backgroundColor: 'transparent',
  },
  closeButton: {
    width: SEARCH_ICON_SIZE,
    height: SEARCH_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    marginTop:10
  },
  closeIcon: {
    width: SEARCH_ICON_SIZE * 0.4,
    height: SEARCH_ICON_SIZE * 0.4,
  },
});

export default ExpandingSearchBar;