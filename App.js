
import React from 'react';
import MainTabNav from './src/navs/MainTabNav';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './src/store/store';


function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <MainTabNav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
