import {View, Text, ImageSourcePropType, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';

interface Props {
  image: ImageSourcePropType;
  logo: ImageSourcePropType;
  name: string;
  time: string;
}
export default function BannerCard(props: Props) {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <View style={styles.padding}>
        <View style={styles.flexRow}>
          <View style={styles.logoContainer}>
            <Image source={props.logo} style={styles.logoImage} />
          </View>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <Text style={styles.time}>{props.time}</Text>
        <Rating
          type="custom"
          ratingColor="#f1c40f"
          ratingCount={5}
          imageSize={15}
          readonly
          style={styles.rating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
  },
  image: {
    width: 320,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 30,
  },
  padding: {
    paddingLeft: 10,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  logoContainer: {
    width: 45,
    height: 45,
    padding: 5,
    backgroundColor: 'white',
    marginTop: -15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  logoImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  rating:{
    paddingTop:10,
    paddingBottom:20,
    alignSelf:'flex-start',
  }
});
