import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Navigators
import FavoritesNav from './FavoritesNav';
import PantryNav from './PantryNav'

//Screens
import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

//Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MainTabNav() {
    return (
      <NavigationContainer>
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
              component={ PantryNav }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Home" 
              component={ HomeScreen }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Favorites" 
              component={ FavoritesNav }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Shopping List" 
              component={ ShoppingListScreen }
              options={{headerShown: false}}
            />
          </Tab.Navigator>
      </NavigationContainer>
    );
}