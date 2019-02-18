import React, {Component} from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions
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
  render() {
    const {store} = this.props;
    const {currentDrink, currentDrinkIndex} = store;

    return (<View style={styles.container}>
      {!currentDrink && (<View style={{height: height, justifyContent: 'center'}}><ActivityIndicator size="large" color="#279F62"/></View>)}
      {currentDrink && (<TouchableOpacity onPress={this.onPress.bind(this)}>
          <Tile
              imageSrc={{uri: currentDrink.strDrinkThumb}}
              title={currentDrink.strDrink}
              featured
              contentContainerStyle={{ height: 50 }} />
          <View>
            <Text style={styles.instructions}>{currentDrink['strInstructions']}</Text>
            <Text style={styles.ingredientTitle}>Ingredients</Text>
            {maxKeys.map(keyNum => {
                if(currentDrink[ingredientKey + keyNum] && currentDrink[measurementKey + keyNum]){
                    return (<Text key={keyNum} style={styles.ingredient}>{currentDrink[measurementKey + keyNum]} {currentDrink[ingredientKey + keyNum]}</Text>)
                }
            })}
          </View>
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
  item: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    justifyContent: 'flex-start'
  },
  logo: {
    width: 100,
    height: 100
  },
  instructions: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: '#fff'
  },
  ingredientTitle: {
    color: '#279F62',
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
