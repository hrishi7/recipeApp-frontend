import React, { Component } from 'react'
import { View,StyleSheet,
  ToastAndroid,TouchableOpacity,ImageBackground,
  ActivityIndicator} from 'react-native'

import NetInfo from "@react-native-community/netinfo";

//native base
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import * as firebase from 'firebase'
import {AsyncStorage} from 'react-native';

export default class Login extends Component {
  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      isLoading:false
    }

  }



  componentDidMount = async() =>{
    const value = await AsyncStorage.getItem('user');
    let userobj = JSON.parse(value);
    if(userobj !== null){
      this.props.navigation.navigate('Home');
    }
    NetInfo.fetch().then(state => {
      if(state.isConnected == false){
        ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT)
      }
    });
  }

  handleClear = () =>{
    this.setState({
      email:'',
      password:''
    })
  }

  handleLogin = async () =>{
    // if(this.isAllOk() == true){
    //   console.log('start');
      this.loginWithFirebase(this.state.email, this.state.password);
    // }
  }

  loginWithFirebase = (email, password) =>{
    NetInfo.fetch().then(state => {
      if(state.isConnected == false){
        ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
        // return false;
      }else{
        if(this.state.email !== '' || this.state.password !== ''){
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then(async (user)=> {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            ToastAndroid.show('Login SuccessFull!', ToastAndroid.SHORT)
            this.props.navigation.navigate('Home');
          })
          .catch((error)=> {
            if(error){
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
              return;
            }
          });
          }else{
            ToastAndroid.show('email/ password cannot be empty', ToastAndroid.SHORT);
            // return false;
          }
      }
    });

  }
  handleForgotPassword = () =>{
    firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
      // Email sent.
      ToastAndroid.show('Check Your mail For Reset password Link', ToastAndroid.SHORT);
    }).catch(function(error) {
      // An error happened.
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
  }

  render() {
    return (

      <View style={styles.container}>
 <View
      style={{
        backgroundColor:'#dee8ff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        paddingBottom:20,
        borderRadius:28,
      }}
      >
        {(this.state.isLoading)?<ActivityIndicator size="large" color="#0000ff" />:<Text></Text>}
        <Form>
        <Text style={{
          fontSize:30,
        fontWeight:'900',
        alignSelf:'center',
        marginVertical:10,
        color:'#4A148C',
        fontFamily:'San Francisco'
        }}> Login </Text>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
              value={this.state.email}
              onChangeText={(e)=>this.setState({ email: e})}
               />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
              value={this.state.password}
              onChangeText={(e)=>this.setState({ password: e})}
               />
            </Item>
          </Form>

          <TouchableOpacity
          style={{width:200, height:60,
            backgroundColor:'#ffffff',
          borderColor:'orange',borderWidth:4,
          opacity:0.6,
          borderRadius:30,
          justifyContent:'center',
          alignSelf:'center', marginVertical:10}}
          onPress={()=>this.handleLogin()}>
              <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{width:200, height:60,
            backgroundColor:'#ffffff',
          borderColor:'orange',borderWidth:4,
          opacity:0.6,
          borderRadius:30,
          justifyContent:'center',
          alignSelf:'center', marginVertical:10}}
          onPress={()=>this.handleClear()}>
              <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{width:200, height:60,
            backgroundColor:'#ffffff',
          borderColor:'orange',borderWidth:4,
          opacity:0.6,
          borderRadius:30,
          justifyContent:'center',
          alignSelf:'center', marginVertical:10}}
          onPress={()=> this.props.navigation.navigate('Register')}>
              <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{height:40, width:150, marginVertical:15, marginHorizontal:15, alignSelf:'center'}}
            onPress={()=> this.handleForgotPassword()}
            >
              <Text style={{textAlignVertical:'center', textAlign:'center', color:'#000000'}}>Forgot password</Text>
          </TouchableOpacity>
      </View>

      </View>

    )
  }

}

const styles = StyleSheet.create({
  container:{
        flex:1,
        margin:20,
        justifyContent:"center"
    },

    text: {
      fontSize: 14,
      color: '#2cd18a'
    }
});