import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ScrollView,
  BackHandler
} from "react-native";
import { Image, Icon, Text, Tile } from "react-native-elements";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { inject, observer } from "mobx-react/native";
import { themeColor, whiteColor, charcoalColor, dimWhite } from "./Constants";

const { width, height } = Dimensions.get("window");

const maxKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const ingredientKey = "strIngredient";
const measurementKey = "strMeasure";

@inject("store")
@observer
class Cocktail extends Component {
  onSwipe(gestureName, gestureState) {
    const { store } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        store.nextDrink();
        break;
      case SWIPE_RIGHT:
        store.prevDrink();
        break;
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  goBack() {
    this.props.navigation.navigate("Home");
  }

  render() {
    const { store } = this.props;
    const { currentDrink, currentDrinkIndex } = store;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={themeColor} barStyle="light-content" />
        {!currentDrink && (
          <View style={{ height: height, justifyContent: "center" }}>
            <ActivityIndicator size="large" color={themeColor} />
          </View>
        )}
        {currentDrink && (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={{
              velocityThreshold: 0.3,
              directionalOffsetThreshold: 80
            }}
          >
            <View>
              <Tile
                imageSrc={{ uri: currentDrink.strDrinkThumb }}
                title={currentDrink.strDrink}
                featured
                contentContainerStyle={{ height: 50 }}
              />
              <TouchableOpacity
                style={styles.back}
                onPress={this.goBack.bind(this)}
              >
                <Icon name="arrow-back" type="material" color={whiteColor} />
              </TouchableOpacity>
              <ScrollView>
                <Text style={styles.instructions}>
                  {currentDrink["strInstructions"]}
                </Text>
                <Text style={styles.ingredientTitle}>Ingredients</Text>
                {maxKeys.map(keyNum => {
                  if (
                    currentDrink[ingredientKey + keyNum] &&
                    currentDrink[measurementKey + keyNum]
                  ) {
                    return (
                      <Text key={keyNum} style={styles.ingredient}>
                        {currentDrink[measurementKey + keyNum]}{" "}
                        {currentDrink[ingredientKey + keyNum]}
                      </Text>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </GestureRecognizer>
        )}
      </View>
    );
  }
}

export default Cocktail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: charcoalColor,
    height: height
  },
  back: {
    position: "absolute",
    top: 40,
    left: 10,
    width: 36,
    height: 36
  },
  instructions: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    color: whiteColor
  },
  ingredientTitle: {
    color: themeColor,
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center"
  },
  ingredient: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: dimWhite
  }
});
