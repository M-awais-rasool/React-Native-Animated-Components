import {
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
  isActive: boolean;
  onPress: () => void;
}
export default function CategoriesCard(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.constainer, props.isActive && {borderColor: '#568e43'}]}>
      <Image style={styles.image} source={props.image} />
      <Text style={[styles.name,props.isActive&&{color:'#568e43'}]}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    shadowColor: '#000', 
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
  },
  image: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
});
