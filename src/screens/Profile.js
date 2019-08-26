import React, { Component } from 'react'
import { Text,
  View,StyleSheet,
  Image,PixelRatio ,
  TouchableOpacity,AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import { NavigationEvents } from "react-navigation";


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      profileImg:'',
      email:'',
      lastLogggedIn:'',
      name:'Anonymous'
    }
  }
  componentDidMount = async() =>{
    const value = await AsyncStorage.getItem('user');
    let userobj = JSON.parse(value);
    if(userobj == null){
      this.props.navigation.navigate('Login');
    }
    this.handleFillData(userobj);

  }
  handleLogout = async () =>{
    await AsyncStorage.removeItem('user');
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  }

  handleLogoutClearData = async () =>{
    const value = await AsyncStorage.getItem('user');
    let userobj = JSON.parse(value);
    if(userobj == null){
      this.props.navigation.navigate('Login');
    }
    this.handleFillData(userobj);
  }

  handleFillData = (userobj) =>{
    let lastLogg = +userobj.user.lastLoginAt;
    let dt = new Date(lastLogg).getDate();
    let mn = (new Date(lastLogg).getMonth() < 10 ?"0"+ new Date(lastLogg).getMonth():new Date(lastLogg).getMonth());
    let yr = new Date(lastLogg).getFullYear();
    let finalDate = dt + "-" + mn + "-" + yr;
    this.setState({
      profileImg:userobj.user.photoURL?userobj.user.photoURL:"",
      email:userobj.user.email,
      lastLogggedIn:finalDate,
      name:userobj.user.displayName?userobj.user.displayName:"Anonymous"
    })
  }
  render() {
    return (
      <View
      style={{alignItems:'center',justifyContent:'center', flexGrow:1}}
      >
        <NavigationEvents onDidFocus={() => this.handleLogoutClearData()} />
        <Text style={{textAlign:'center'}}> Profile Info </Text>


        <Text style={{textAlign:'center'}}> Email: {this.state.email} </Text>

        <Text style={{textAlign:'center'}}> Name: {this.state.name} </Text>

        <TouchableOpacity
        onPress={()=> this.handleLogout()}
        style={{backgroundColor:'black', alignSelf:'center', justifyContent:'center', width:120, height:50}}
        >
          <Text style={{color:'white', textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center'
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      borderRadius: 75,
      width: 150,
      height: 150,
    },
});