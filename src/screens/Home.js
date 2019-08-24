import React, { Component } from 'react'
import { StyleSheet,ScrollView,RefreshControl,
  FlatList,
  Image,
  TouchableHighlight,
  Text, View,
  ActivityIndicator
 } from 'react-native'

  import {RecipeCard} from './AppStyles';

import {AsyncStorage} from 'react-native';

import axios from 'axios';

export default class Home extends Component {
  constructor (props){
    super(props);
    this.state=({
      userEmail:'',
      uKey:'',
      recipes:[],
      isLoaded:false,
      refreshing: false,
    })
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    axios
    .get('https://recipe-backend12.herokuapp.com/api/recipe/getAll')
    .then(res=>{
      this.setState({ recipes: res.data, isLoaded:true,refreshing: false});
    })
  }

  componentDidMount = async ()=>{
    const value = await AsyncStorage.getItem('user');
    let userobj = JSON.parse(value);
    if(userobj == null){
      this.props.navigation.navigate('Login');
    }
    axios
    .get('https://recipe-backend12.herokuapp.com/api/recipe/getAll')
    .then(res=>{
      this.setState({ recipes: res.data, isLoaded:true});
    })

  }

  onPressRecipe = item => {
    this.props.navigation.navigate('SingleRecipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.recipeImageUrl }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableHighlight>
  );


  render() {
    return (
      <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>this._onRefresh()}
          />
        }
        >
        {this.state.recipes.length<=0?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <FlatList
        style={{marginTop:15, marginBottom:15}}
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
    }
      </ScrollView>
    );
  }

  }

  const styles = StyleSheet.create({
    container: RecipeCard.container,
    photo: RecipeCard.photo,
    title: RecipeCard.title,
    category: RecipeCard.category
  });