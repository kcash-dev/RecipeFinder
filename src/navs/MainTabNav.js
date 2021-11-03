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
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'home-account';
                } else if (route.name === 'Pantry') {
                  iconName = 'door-open';
                } else if (route.name === 'Favorites') {
                  iconName = 'account-heart';
                } else if (route.name === 'Shopping List') {
                  iconName = 'cart';
                }
    
                // You can return any component that you like here!
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#10b981',
              tabBarInactiveTintColor: 'gray',
            })
            }
          >
            <Tab.Screen 
              name="Pantry" 
              component={ PantryScreen }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Home" 
              component={ HomeScreen }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Favorites" 
              component={ FavoritesScreen }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Shopping List" 
              component={ ShoppingListScreen }
              options={{headerShown: false}}
            />
          </Tab.Navigator>
      );
}