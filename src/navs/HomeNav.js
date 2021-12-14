import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../screens/HomeScreen';
import RecipeDataScreen from '../screens/RecipeDataScreen';

//Navigators
const Stack = createNativeStackNavigator();

export default function HomeNav() {
  return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name="HomeScreen" component={ HomeScreen } />
        <Stack.Screen name="RecipeData" component={ RecipeDataScreen } />
      </Stack.Navigator>
  );
}