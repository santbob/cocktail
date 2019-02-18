import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native'
import {Icon} from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { goldColor } from './Constants'

@inject('store') @observer
class Splash extends Component {

  componentDidMount() {
    setTimeout(function() { //Start the timer
      this.props.navigation.navigate('Home')
    }.bind(this), 1000)
  }

  render() {
    return (<View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Icon name='glass-cocktail' type='material-community' color={goldColor} size={96}/>
    </View>)
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#fff',
    fontSize: 44,
    textAlign: 'center'
  }
})
