import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface Props {
  image: ImageSourcePropType;
  name: string;
  price: string;
  onPress: () => void;
}
export default function PapularCard(props: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.padding}>
        <Image style={styles.image} source={props.image} />
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.price}>{props.price}</Text>
          <Image
            source={require('../../screens/foodAppCarousel/img/add.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 2,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
  },
  padding: {
    padding: 20,
    paddingHorizontal: 30,
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  price: {
    fontSize: 14,
    color: 'black',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
});
