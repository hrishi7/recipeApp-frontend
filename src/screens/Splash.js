import React, { Component } from 'react'
import { Text, View,StyleSheet, AsyncStorage, Platform, NetInfo } from 'react-native'

export default class Splash extends Component {
  componentDidMount = async() =>{
    let ans = await this.CheckConnectivity();
    if(!ans){
      this.props.navigation.navigate('ErrorPage');
    }else{
    }
  }
  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <View>
        <Text> Splash </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center'
    }
});