import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import FoodAppCarousel from '../screens/foodAppCarousel/FoodAppCarousel';
import CoffeApp from '../screens/coffeApp/CoffeApp';
import FoodDetails from '../screens/foodAppCarousel/FoodDetails';
import Carousel3DScreen from '../screens/3DCarousel/Carousel3DScreen';
import DotsAnimation from '../screens/dotsAnimation/DotsAnimation';
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Stack.Navigator
        initialRouteName={'home'}
        screenOptions={({navigation, route}) => ({})}>
        <Stack.Screen
          name={'home'}
          component={Home}
          options={{headerShown: false}}
        />

        {/* carousels */}
        <Stack.Screen
          name={'Carousel3DScreen'}
          component={Carousel3DScreen}
          options={{headerShown: false}}
        />
        {/* dots animation */}
        <Stack.Screen
          name={'DotsAnimation'}
          component={DotsAnimation}
          options={{headerShown: false}}
        />
        {/* FoddAppCarousel */}
        <Stack.Screen
          name={'FoddAppCarousel'}
          component={FoodAppCarousel}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'FoodDetails'}
          component={FoodDetails}
          options={{headerShown: false}}
        />
        {/*  */}
        {/* Coffe app */}
        <Stack.Screen
          name={'CoffeApp'}
          component={CoffeApp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStackNavigation;
