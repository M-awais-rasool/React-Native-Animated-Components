import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  onPress: () => void;
}
export default function FoodDetailsBtn(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.quntityBtn}>
        <Text style={styles.quntityText}>-</Text>
        <Text style={styles.quntityText}>2</Text>
        <Text style={styles.quntityText}>+</Text>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={props.onPress}>
        <Text style={{color: 'white'}}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  addBtn: {
    backgroundColor: '#1a8600',
    width: 75,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quntityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    backgroundColor: 'white',
    elevation: 2,
    padding: 7,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#EAEAEA',
  },
  quntityText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
