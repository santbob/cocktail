/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { observer, Provider } from 'mobx-react/native'
import Store from './Store'
import {LANDSCAPE, PORTRAIT} from './Constants'
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation'
import { SearchBar, ThemeProvider } from 'react-native-elements';

import Splash from './Splash'
import Home from './Home'
import Cocktail from './Cocktail'

const SwitchNav = createSwitchNavigator({
  Splash: {
    screen: Splash
  },
  Home: {
    screen: Home
  },
  Cocktail: {
    screen: Cocktail
  }
})

const Nav = createAppContainer(SwitchNav)

@observer
class App extends Component {

  componentWillMount() {
      Store.fetchAllDrinks();
  }

  render() {
    return (
      <Provider store={Store}>
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
