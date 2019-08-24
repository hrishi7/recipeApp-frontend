import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import {  } from 'react-native-gesture-handler';

export default class ErrorPage extends Component {
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
    handleOfflineError = async () =>{
        if(this.CheckConnectivity()){
            //check for token avialable or not
            const value = await AsyncStorage.getItem('user');
            let userobj = JSON.parse(value);
            if(userobj == null){
              this.props.navigation.navigate('Login');
            }
        }
    }
  render() {
    return (
      <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'#bdbdbd'}}>
        <Text style={{color:'#ffffff'}}> Check Your Internet Connection if Not Online go online then
        tap below button!! </Text>

      <TouchableOpacity
        onPress={()=> this.handleOfflineError()}
      >
          <Text>Try Again</Text>
      </TouchableOpacity>
      </View>
    )
  }
}