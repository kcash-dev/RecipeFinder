import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Navigators
import MainTabNav from './MainTabNav';

const Stack = createNativeStackNavigator();

export default function MainStackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={MainTabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}