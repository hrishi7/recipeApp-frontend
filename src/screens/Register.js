import React, { Component } from 'react'
import { View,StyleSheet, ToastAndroid } from 'react-native'

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
        <Text style={{fontSize:30, fontWeight:'500', alignSelf:'center', marginVertical:10, color:'blue'}}> SignUp </Text>
        <Form>
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

          <Button full rounded success style={{ height:45, marginVertical:15}}
          onPress={()=> this.handleRegister()}
          >
            <Text>SignUp</Text>
          </Button>
          <Button full rounded danger style={{ height:45, marginVertical:15}}
          onPress={()=> this.handleClear()}
          >
            <Text>Clear</Text>
          </Button>
          <Button full rounded dark style={{ height:45, marginVertical:15}}
          onPress={()=> this.props.navigation.navigate('Login')}
          >
            <Text>Login</Text>
          </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        justifyContent:"center"
    }
});