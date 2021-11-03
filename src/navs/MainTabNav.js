import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

//Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNav() {
    return (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
          >
            <Tab.Screen 
              name="Pantry" 
              component={ PantryScreen }
              options={{
                tabBarLabel: 'Pantry',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="door-open" size={24} color="black" />
                )
              }}
            />
            <Tab.Screen 
              name="Home" 
              component={ HomeScreen }
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="home-account" size={ 24 } color="black" />
                )
              }} 
            />
            <Tab.Screen 
              name="Favorites" 
              component={ FavoritesScreen }
              options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-heart" size={24} color="black" />
                )
              }} 
            />
            <Tab.Screen 
              name="Shopping List" 
              component={ ShoppingListScreen }
              options={{
                tabBarLabel: 'Shopping List',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cart" size={24} color="black" />
                )
              }} 
            />
          </Tab.Navigator>
      );
}