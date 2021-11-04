import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Navigators
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
const Stack = createNativeStackNavigator();

export default function FavoritesNav() {
  return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name="FavoritesScreen" component={ FavoritesScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="Login" component={ LoginScreen } />
      </Stack.Navigator>
  );
}