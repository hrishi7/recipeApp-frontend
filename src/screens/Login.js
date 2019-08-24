import React, { Component } from 'react'
import { View,StyleSheet,ToastAndroid } from 'react-native'

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
    }
  }
  componentDidMount = async() =>{
    const value = await AsyncStorage.getItem('user');
    let userobj = JSON.parse(value);
    if(userobj !== null){
      this.props.navigation.navigate('Home');
    }
  }

  handleClear = () =>{
    this.setState({
      email:'',
      password:''
    })
  }

  handleLogin = async () =>{
    if(this.state.email !== '' && this.state.password !== ''){
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (user)=> {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        ToastAndroid.show('Login SuccessFull!', ToastAndroid.SHORT)
        this.handleClear();
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
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:30, fontWeight:'500', alignSelf:'center', marginVertical:10, color:'blue'}}> Login </Text>
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
          onPress={()=> this.handleLogin()}
          >
            <Text >Login</Text>
          </Button>
          <Button full rounded danger style={{ height:45, marginVertical:15}}
          onPress={()=> this.handleClear()}
          >
            <Text >Clear</Text>
          </Button>
          <Button full rounded dark style={{ height:45, marginVertical:15}}
          onPress={()=> this.props.navigation.navigate('Register')}
          >
            <Text >Register</Text>
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