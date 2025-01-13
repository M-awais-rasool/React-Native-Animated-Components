import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {DATA} from './data';
import {FadeItemListHeader, FadeListItem} from '../../components/FadeItemList';

export const bg_image =
  'https://wallpapers.com/images/hd/calming-sunset-nature-blur-background-fr1xq4zrkqpco9bv.jpg';
export const SPACING = 20;
export const IMAGE_SIZE = 70;
export const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;

const FadeItemListScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}: any) => (
    <FadeListItem item={item} index={index} scrollY={scrollY} />
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <FadeItemListHeader />
        <Image
          blurRadius={50}
          source={{uri: bg_image}}
          style={StyleSheet.absoluteFillObject}
        />
        <FlashList
          data={DATA}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 100,
            paddingHorizontal: SPACING,
            paddingBottom: 2 * SPACING,
          }}
          estimatedItemSize={118}
          ItemSeparatorComponent={() => <View style={{height: SPACING}} />}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlistContainer: {
    paddingHorizontal: SPACING,
  },
});

export default FadeItemListScreen;
