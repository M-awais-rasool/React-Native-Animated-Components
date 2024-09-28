import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import FoodAppCarousel from '../screens/foodAppCarousel/FoodAppCarousel';
import CoffeApp from '../screens/coffeApp/CoffeApp';
import FoodDetails from '../screens/foodAppCarousel/FoodDetails';

const Stack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'home'}
        screenOptions={({navigation, route}) => ({})}>
        <Stack.Screen
          name={'home'}
          component={Home}
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
    </>
  );
};

export default AuthStackNavigation;
