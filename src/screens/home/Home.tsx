import {View, Text} from 'react-native';
import React, { Fragment } from 'react';
import styles from './styles';
import {DATA} from '../../constants/ScreenData';
import { HomeButton } from '../../components/HomeButton';

export default function Home(props: any) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>React Native Animated Component</Text>
      {DATA.map((val: any, index: any) => (
        <View key={index}>
          <Text style={styles.contentHeading}>{val.iconText}</Text>
          {val.items.map((item: any, index: any) => (
            <Fragment key={index}>
              <HomeButton
                label={item.label}
                backgroundColor={item.backgroundColor}
                onPress={() => {
                  navigation.navigate(item.screen);
                }}
              />
              <View style={{height: 20}} />
            </Fragment>
          ))}
        </View>
      ))}
    </View>
  );
}
