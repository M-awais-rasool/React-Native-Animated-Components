import React from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import {Rating} from 'react-native-ratings';

interface Props {
  image: ImageSourcePropType;
  name: string;
  price: string;
  onPress: () => void;
}
const PizzaCard = (Props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={Props.image} 
        style={styles.pizzaImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>50% off</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.pizzaName}>{Props.name}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            type="custom"
            ratingColor="#f1c40f"
            ratingCount={5}
            imageSize={18}
            readonly
          />
          <Text style={styles.ratingText}>4.8</Text>
        </View>
        <Text style={styles.price}>{Props.price}</Text>
        <Text style={styles.deliveryText}>12 mins delivery</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 2,
    width: 300,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    borderRadius: 5,
  },
  pizzaImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  discountContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 60,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deliveryText: {
    fontSize: 12,
    color: '#888',
  },
});

export default PizzaCard;
