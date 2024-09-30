import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState('Details');
  const animatedValue = useRef(new Animated.Value(0)).current;

  const tabs = ['Details', 'Customize', 'Reviews'];

  const animateTab = (index: any) => {
    Animated.spring(animatedValue, {
      toValue: index * (100 / tabs.length),
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (tab: any, index: any) => {
    setActiveTab(tab);
    animateTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => handleTabPress(tab, index)}>
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.activeTabIndicator,
            {
              width: `${100 / tabs.length}%`,
              left: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['1.5%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    borderRadius: 40,
    padding: 5,
    position: 'relative',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeText: {
    color: 'black',
    fontSize: 16,
  },
  activeTabIndicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: -1,
  },
  
});

export default CustomTabs;
