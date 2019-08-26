import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,StyleSheet,ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Item, Input, Icon } from 'native-base';
import { RecipeCard } from './AppStyles';
import NetInfo from "@react-native-community/netinfo";
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
  componentDidMount = () =>{
    NetInfo.fetch().then(state => {
      if(state.isConnected == false){
        ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
      }
    });
  }



  handleSearch = text => {
    NetInfo.fetch().then(state => {
      if(state.isConnected == false){
        ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
        // return false;
      }else{
        axios
        .get(`https://recipe-backend12.herokuapp.com/api/recipe/getBysearch/${text}`)
        .then(res=>{
          this.setState({
            data: res.data
          })
          setTimeout( () => {
            this.setTimePassed();

          },20000);
        })
      }
    });

   };
   setTimePassed = async()=> {
    NetInfo.fetch().then(state => {
      if(state.isConnected == false){
        ToastAndroid.show('Please Check internet connectivity', ToastAndroid.LONG);
      }

    });
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
      <View>
        <Item
        style={{
          justifyContent:'flex-start',
          marginTop:15,
          marginLeft:5,
          marginRight:5,
          borderRadius: 15,
          backgroundColor:'#CFD8DC'
        }}
        >
         <Icon name="ios-search" style={{marginLeft:10}} />
            <Input
             onChangeText={text => { this.setState({ text}),this.handleSearch(text)}}
             placeholder="Search"
             value={this.state.text}
            />
            </Item>

        <FlatList
          style={{marginTop:5, marginBottom:15}}
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
