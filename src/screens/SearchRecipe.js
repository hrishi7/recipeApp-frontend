import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,StyleSheet,ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { RecipeCard } from './AppStyles';

import axios from 'axios';

import MenuImage from './Common/MenuImage/MenuImage';



export default class SearchRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: []
    };
  }



  handleSearch = text => {
    axios
    .get(`https://recipe-backend12.herokuapp.com/api/recipe/getBysearch/${text}`)
    .then(res=>{
      this.setState({
        data: res.data
      });
    })
   };


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
      <View>
         <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
            marginLeft:15,
            marginRight:15
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED',
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black',
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => { this.setState({ text}),this.handleSearch(text)}}
          //onClear={() => params.handleSearch('')}
          placeholder="Search"
          value={this.state.text}
        />
        <FlatList
          style={{marginTop:15, marginBottom:15}}
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14
  }
});
