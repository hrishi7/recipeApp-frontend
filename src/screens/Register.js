import React, { Component } from 'react'
import { View,StyleSheet, ToastAndroid,ImageBackground,TouchableOpacity } from 'react-native'

//native base
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import * as firebase from 'firebase'


export default class Register extends Component {
  constructor(){
    super();
    this.state={
      email:'',
      password:''
    }
  }
  componentDidMount = ()=>{


  }
  handleClear = () =>{
    this.setState({
      email:'',
      password:''
    })
  }
  handleRegister = () =>{
    if(this.state.email !== '' && this.state.password !== ''){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error)=> {
        if(error){
          ToastAndroid.show(error.message,ToastAndroid.SHORT)
          return;
        }
      });
      ToastAndroid.show('account created, You can login Now', ToastAndroid.SHORT);
      this.handleClear();
      this.props.navigation.navigate('Login');
    }else{
      ToastAndroid.show('email/ password cannot be empty',ToastAndroid.SHORT);
      this.handleClear();
    }
  }

  handleClear = () =>{
    this.setState({
      email:'',
      password:''
    })
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
        <Form>
          <Text style={{fontSize:30, fontWeight:'500', alignSelf:'center', marginVertical:10, color:'blue'}}> SignUp </Text>
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
          onPress={()=>this.handleRegister()}>
              <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>SignUp</Text>
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
          onPress={()=> this.props.navigation.navigate('Login')}>
              <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Login</Text>
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
        justifyContent:"center",

    }
});