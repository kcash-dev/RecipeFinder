import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Navigators
import FavoritesNav from './FavoritesNav';
import PantryNav from './PantryNav'

//Screens
import ShoppingListScreen from '../screens/ShoppingListScreen';

//Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

//Redux
import { useSelector } from 'react-redux';

//Firebase
import { auth, db, doc, updateDoc } from '../api/Firebase';
import HomeNav from './HomeNav';

export default function MainTabNav() {
  const storeState = useSelector(state => state)
  setTimeout(() => {
      updateDocs()
  }, 60000)

  async function updateDocs() {
    if (auth.currentUser) {
      updateDoc(doc(db, 'users', auth.currentUser.uid), {
          currentIngredients: storeState.ingredients,
          shoppingList: storeState.shoppingCart
      });
    }
  }

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
              component={ PantryNav }
              options={{headerShown: false}}
            />
            <Tab.Screen 
              name="Home" 
              component={ HomeNav }
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
    );
}