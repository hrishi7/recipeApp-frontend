
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,AsyncStorage
} from 'react-native';

import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import firebaseConfig from './utils/FirebaseConfig';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';


//import screens
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import Splash from './src/screens/Splash'
import AddRecipe from './src/screens/AddRecipe'
import MyRecipe from './src/screens/MyRecipe'
import SingleRecipe from './src/screens/SingleRecipe'
import SearchRecipe from './src/screens/SearchRecipe'
import ErrorPage from './src/screens/ErrorPage'

class App extends Component {

  constructor(){
    super();
    this.state={
      timePassed: false,
    }
  }
  componentDidMount = async()=>{
    setTimeout( () => {
      this.setTimePassed();
    },2000);
  }
  setTimePassed = async()=> {
    this.setState({timePassed: true});
    let ans = await AsyncStorage.getItem('user');
    let userObj = JSON.parse(ans);
    if(userObj !== null){
      this.props.navigation.navigate('Home');
    }
  }

  render(){
    if(!this.state.timePassed){
      return <Splash/>
    }
    return (
      <AppContainer/>

    );
  }
};

const HomeTabNavigator =createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      tabBarLabel:'Home',
      tabBarIcon:({tintColor})=>(
          <FontAwesome5 name="home" color={tintColor} size={25}/>
      )
    }
  },
  AddRecipe: {
    screen: AddRecipe,
    navigationOptions:{
      tabBarLabel:'Add Recipe',
      tabBarIcon:({tintColor})=>(
        <FontAwesome5 name="plus-circle" color={tintColor} size={25}/>
      )
    }
  },
  Search: {
    screen: SearchRecipe,
    navigationOptions:{
      tabBarLabel:'Search',
      tabBarIcon:({tintColor})=>(
        <FontAwesome5 name="search" color={tintColor} size={25}/>
      )
    }
  },
  MyRecipe: {
    screen: MyRecipe,
    navigationOptions:{
      tabBarLabel:'My Recipe',
      tabBarIcon:({tintColor})=>(
        <FontAwesome5 name="folder-open" color={tintColor} size={25}/>
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions:{
      tabBarLabel:'My Recipe',
      tabBarIcon:({tintColor})=>(
          <FontAwesome5 name="user-cog" color={tintColor} size={25}/>
      )
    }
  },
}, {
  initialRouteName: 'Home',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});

const AppStackNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Home:{ screen: HomeTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Splash: Splash,
  SingleRecipe: SingleRecipe,
  ErrorPage: ErrorPage
},{
  initialRouteName: 'Login',
})
const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({

});

export default App;

console.disableYellowBox = true;
