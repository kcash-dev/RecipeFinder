import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import PantryScreen from '../screens/PantryScreen';
import PantryListScreen from '../screens/PantryListScreen';
import RecipeDataScreen from '../screens/RecipeDataScreen';

//Navigators
const Stack = createNativeStackNavigator();

export default function FavoritesNav() {
  return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name="PantryScreen" component={ PantryScreen } />
        <Stack.Screen name="PantryList" component={ PantryListScreen } />
      </Stack.Navigator>
  );
}