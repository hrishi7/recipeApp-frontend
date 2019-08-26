import React, { Component } from 'react'
import { Text, View,StyleSheet,Image,ImageBackground, AsyncStorage,ToastAndroid } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
export default class Splash extends Component {
  componentDidMount = async()=>{
    NetInfo.fetch().then(state => {
          if(state.isConnected == false){
          ToastAndroid.show('Turn On Internet', ToastAndroid.SHORT)
          }
            setTimeout( () => {
              this.setTimePassed();
            },4000);
        });
}
  setTimePassed = async()=> {
  this.setState({timePassed: true});
  let ans = await AsyncStorage.getItem('user');
  let userObj = JSON.parse(ans);
  if(userObj !== null){
    this.props.navigation.navigate('Home');
  }else{
    this.props.navigation.navigate('Login');
  }
}


  render() {
    return (
      <ImageBackground
      style={{ flex: 1 }}
      //We are using online image to set background
      source={require('../assets/splashBack.jpg')}
      //You can also set image from your project folder
      //require('./images/background_image.jpg')        //
      >
      <View style={styles.MainContainer}>
        <Image
          source={require('../assets/appIcon.jpg')}
          style={{ width: 120, height: 120, borderRadius:35, marginTop: 90 }}
        />
        <Text style={styles.TextStyle}>FoodRecipe</Text>
        <Text style={styles.subHeading}>Recipes To Prepare Healthy Food Easily</Text>
      </View>
    </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center'
    },
    subHeading:{
      marginTop:35,
      textAlign:'center',
      fontSize:25,
      fontWeight:'900',
      color:'yellow'
    },
    MainContainer: {
      flex: 1,
      alignItems: 'center',
    },
    TextStyle: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 30,
      marginTop: 10,
    },
});