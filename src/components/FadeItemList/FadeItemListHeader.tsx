import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FadeItemListHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {top: insets.top + 16}]}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

export default FadeItemListHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    zIndex: 100,
  },
  implemented: {
    fontSize: 22,
    color: 'black',
  },
  label: {
    fontSize: 18,
    color: 'black',
  },
});
