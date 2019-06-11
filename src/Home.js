import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Image, SearchBar, Icon, Tile } from "react-native-elements";
import { inject, observer } from "mobx-react/native";
import { themeColor, charcoalColor, whiteColor } from "./Constants";
const { width, height } = Dimensions.get("window");

@inject("store")
@observer
class Home extends Component {
  updateSearch = searchTerm => {
    this.props.store.updateSearchTerm(searchTerm);
  };

  _keyExtractor = (item, index) => item.idDrink;

  _onPressItem = (item, index) => {
    this.props.store.setCurrentDrinkIndex(index);
    this.props.navigation.navigate("Cocktail");
  };

  _renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Tile
        imageSrc={{ uri: item.strDrinkThumb }}
        title={item.strDrink}
        featured
        onPress={() => this._onPressItem(item, index)}
        contentContainerStyle={{ height: 50 }}
      />
    </View>
  );

  render() {
    const { store } = this.props;
    const { searchTerm, searchResults, drinks } = store;
    return (
      <View style={{ flex: 1, paddingTop: 40, backgroundColor: themeColor }}>
        <StatusBar backgroundColor={themeColor} barStyle="light-content" />
        <View style={styles.container}>
          <SearchBar
            searchIcon={true}
            clearIcon={true}
            lightTheme={true}
            placeholder="Search a cocktail"
            containerStyle={styles.searchBar}
            onChangeText={this.updateSearch}
            value={searchTerm}
          />
          {!store.loading && (
            <FlatList
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              data={searchTerm ? searchResults : drinks}
            />
          )}
          {store.loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={themeColor} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: themeColor
  },
  searchBar: {
    width: width
  },
  item: {
    flexDirection: "row",
    backgroundColor: themeColor,
    justifyContent: "flex-start"
  },
  title: {
    color: charcoalColor,
    fontSize: 20,
    textAlign: "center"
  },
  loading: {
    justifyContent: "center",
    height: height - 100
  }
});
