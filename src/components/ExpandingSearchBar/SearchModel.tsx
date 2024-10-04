import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRODUCT_DATA = [
  {
    id: '1',
    name: 'Slim Fit Shirt',
    brand: 'Roadster',
    price: '₹199',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQS76fl8ZTik7jQfUCzvFkFKzQFywvTK0NqQ&s',
  },
  {
    id: '2',
    name: 'Printed T-Shirt',
    brand: 'HRX',
    price: '₹999',
    image:
      'https://shopgroove.pk/cdn/shop/products/Short-Sleeve-T-Shirt-Men-S-For-2021-Summer-Print-Black-White-Tshirt-Top-Tees-Classic-1.jpg?v=1664899421',
  },
  {
    id: '3',
    name: 'Skinny Jeans',
    brand: 'Levis',
    price: '₹199',
    image:
      'https://images.onlyandsons.com/22029095/4451772/007/onlysons-onswarpskinnywb9095dccdnmnoos-black.jpg?v=4bc61ffea1c0e91b2992bbad32df97f3&format=webp&width=1280&quality=90&key=25-0-3',
  },
  {
    id: '4',
    name: 'Running Shoes',
    brand: 'Nike',
    price: '₹295',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLHE0yWwnQRlY8EeksEPbkEOBCvOfXYL8stg&s',
  },
  {
    id: '5',
    name: 'Casual Watch',
    brand: 'Fossil',
    price: '₹995',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80',
  },
];

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onProductSelect: () => void;
  searchText: string;
}

const SearchModelContent: React.FC<ProductModalProps> = ({
  onClose,
  onProductSelect,
  searchText,
}) => {
  const filteredProducts = useMemo(() => {
    if (!searchText) return PRODUCT_DATA;
    const lowerSearchText = searchText.toLowerCase();
    return PRODUCT_DATA.filter(product => {
      const name = product.name?.toLowerCase() || '';
      const brand = product.brand?.toLowerCase() || '';
      return name.includes(lowerSearchText) || brand.includes(lowerSearchText);
    });
  }, [searchText]);

  const handleProductPress = (product: any) => {
    console.log('Selected product:', product);
    onProductSelect();
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={filteredProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => handleProductPress(item)}
        >
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.noResults}>No products found</Text>
      )}
    />
  );
};

const AnimatedSearchModelWrapper: React.FC<ProductModalProps> = ({ visible, ...props }) => {
  const animatedValue = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: visible ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <SearchModelContent visible={visible} {...props} />
    </Animated.View>
  );
};

const SearchModel: React.FC<ProductModalProps> = (props) => {
  return <AnimatedSearchModelWrapper {...props} />;
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 120,
    left: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#282c3f',
  },
  productBrand: {
    fontSize: 14,
    color: '#94969f',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#282c3f',
  },
  noResults: {
    padding: 20,
    textAlign: 'center',
    color: '#94969f',
  },
});

export default SearchModel;
