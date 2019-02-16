import React, {Component} from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native'
import {Image, Icon, Text, Tile} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native';

const maxKeys = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const ingredientKey = 'strIngredient';
const measurementKey = 'strMeasure';

@inject('store')@observer
class Cocktail extends Component {
  onPress(event) {
      const { width } = this.state,
            { store } = this.props,
            X = event.nativeEvent.locationX;

      if (X < width*.3) {
          store.prevImage();
      }else if (X > width*.6) {
          store.nextImage();
      }
  }
  render() {
    const {store} = this.props;
    const {currentDrink} = store;

    return (<View style={styles.container} >
      {store.loading && (<ActivityIndicator size="large" color="#ffffff"/>)}
      {
        !store.loading && (<>
          <Tile
              imageSrc={{uri: currentDrink.strDrinkThumb}}
              title={currentDrink.strDrink}
              featured
              contentContainerStyle={{ height: 50 }} />
          <View>
            <Text style={styles.instructions}>{currentDrink['strInstructions']}</Text>
            <Text style={styles.title}>Ingredients</Text>
            {maxKeys.map(keyNum => {
                if(currentDrink[ingredientKey + keyNum] && currentDrink[measurementKey + keyNum]){
                    return (<Text key={keyNum} style={styles.instructions}>{currentDrink[measurementKey + keyNum]} {currentDrink[ingredientKey + keyNum]}</Text>)
                }
            })}
          </View>
        </>)
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
    backgroundColor: '#333'
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
    marginTop: 10,
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff'
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    textDecorationLine: 'underline'
  },
  ingredients: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff'
  },
})
