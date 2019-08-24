import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native'
import * as firebase from 'firebase'

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
  handleLogout = async () =>{
    firebase.auth().signOut();
    await AsyncStorage.removeItem('user');
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View>
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
    }
});