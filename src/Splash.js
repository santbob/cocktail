import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { Icon } from "react-native-elements";
import { inject, observer } from "mobx-react/native";
import { themeColor, charcoalColor, whiteColor } from "./Constants";

@inject("store")
@observer
class Splash extends Component {
  componentDidMount() {
    setTimeout(
      function() {
        //Start the timer
        this.props.navigation.navigate("Home");
      }.bind(this),
      1000
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={charcoalColor} barStyle="light-content" />
        <Image source={require("./cocktail.png")} style={styles.logo} />
        <Text style={styles.title}>Cocktails</Text>
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: charcoalColor
  },
  logo: {
    width: 100,
    height: 250
  },
  title: {
    color: themeColor,
    fontSize: 36,
    textAlign: "center"
  }
});
