import React, {Component} from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ScrollView
} from 'react-native'
import {Image, Icon, Text, Tile} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native';
const {width, height} = Dimensions.get('window')

const maxKeys = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const ingredientKey = 'strIngredient';
const measurementKey = 'strMeasure';

@inject('store') @observer
class Cocktail extends Component {
  onPress(event) {
      console.log('onPress')
      const { store } = this.props,
            X = event.nativeEvent.locationX;

      if (X < width*.3) {
          store.prevDrink();
      } else if (X > width*.6) {
          store.nextDrink();
      }
  }
  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    const {store} = this.props;
    const {currentDrink, currentDrinkIndex} = store;

    return (<View style={styles.container}>
      <StatusBar backgroundColor="#d47915" barStyle="light-content" />
      {!currentDrink && (<View style={{height: height, justifyContent: 'center'}}><ActivityIndicator size="large" color="#b89622"/></View>)}
      {currentDrink && (<TouchableOpacity onPress={this.onPress.bind(this)}>
          <Tile
              imageSrc={{uri: currentDrink.strDrinkThumb}}
              title={currentDrink.strDrink}
              featured
              contentContainerStyle={{ height: 50 }} />
          <TouchableOpacity style={styles.back} onPress={this.goBack.bind(this)}><Icon name="arrow-back" type="material" color="#fff"/></TouchableOpacity>
          <ScrollView>
            <Text style={styles.instructions}>{currentDrink['strInstructions']}</Text>
            <Text style={styles.ingredientTitle}>Ingredients</Text>
            {maxKeys.map(keyNum => {
                if(currentDrink[ingredientKey + keyNum] && currentDrink[measurementKey + keyNum]){
                    return (<Text key={keyNum} style={styles.ingredient}>{currentDrink[measurementKey + keyNum]} {currentDrink[ingredientKey + keyNum]}</Text>)
                }
            })}
          </ScrollView>
        </TouchableOpacity>)
      }
    </View>)
  }
}

export default Cocktail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333',
    height: height
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 10,
    width: 36,
    height: 36,
  },
  instructions: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: '#fff'
  },
  ingredientTitle: {
    color: '#b89622',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  ingredient: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff'
  },
})
