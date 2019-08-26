import React, { Component } from 'react'
import { Text, View,TouchableOpacity,ToastAndroid,AsyncStorage } from 'react-native'
import NetInfo from "@react-native-community/netinfo";


export default class ErrorPage extends Component {

    handleOfflineError = async () =>{
      NetInfo.fetch().then(async state => {
        if(state.isConnected){
           //check for token avialable or not
           const value = await AsyncStorage.getItem('user');
           let userobj = JSON.parse(value);
           if(userobj === null){
             this.props.navigation.navigate('Login');
           }else{
            this.props.navigation.navigate('Home');
           }
        }else{
          ToastAndroid.show('Turn On Internet', ToastAndroid.SHORT)
        }
      });
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