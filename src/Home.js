import React, {Component} from 'react'
import {SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, ActivityIndicator, Dimensions} from 'react-native'
import {Image, SearchBar, Icon, Tile} from 'react-native-elements'
import { inject, observer } from 'mobx-react/native';
const {width, height} = Dimensions.get('window')

@inject('store') @observer
class Home extends Component {

  updateSearch = searchTerm => {
    this.props.store.updateSearchTerm(searchTerm);
  };

  _keyExtractor = (item, index) => item.idDrink;

  _onPressItem = (item, index) => {
      console.log('_onPressItem');
      this.props.store.setCurrentDrinkIndex(index);
      this.props.navigation.navigate('Cocktail');
  };

  _renderItem = ({item,index}) => (
      <View style={styles.item}>
        <Tile imageSrc={{uri: item.strDrinkThumb}}
              title={item.strDrink}
              featured
              onPress={() => this._onPressItem(item, index)}
              contentContainerStyle={{ height: 50 }} />
      </View>
  );

  render() {
    const {store} = this.props;
    const {searchTerm} = store;
    return (<SafeAreaView style={{flex: 1, backgroundColor: '#333'}}>
      <View style={styles.container}>
        <SearchBar
          searchIcon={true}
          clearIcon={true}
          placeholder="Type Here..."
          containerStyle={styles.searchBar}
          onChangeText={this.updateSearch}
          value={searchTerm}
        />
        {!store.loading && (
          <FlatList
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            data={store.drinks}
          />
        )}
        {store.loading && (<ActivityIndicator size="large" color="#0000ff" />)}
      </View>
    </SafeAreaView>)
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444'
  },
  searchBar: {
    width: width
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    justifyContent: 'flex-start'
  },
  title: {
    color: '#444',
    fontSize: 20,
    textAlign: 'center'
  },
})
