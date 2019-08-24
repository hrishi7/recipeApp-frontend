import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,StyleSheet
} from 'react-native';

import BackButton from './Common/BackButton/BackButton';

import ViewIngredientsButton from './Common/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  handleFavourite = item => {
   alert('added to favourite');
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
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
          <TouchableHighlight>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.recipeImageUrl }} />
            </View>
          </TouchableHighlight>
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>

              <Text style={styles.category}>{item.category}</Text>

          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}> Cooking: </Text>
            <Image style={styles.infoPhoto} source={require('../assets/time.png')} />
            <Text style={styles.infoRecipe}> {item.cookingTime} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => this.handleFavourite()}
            />
          </View>
          <Text style={styles.category}>Ingredients</Text>
          <View style={styles.infoContainer}>
               <FlatList
               vertical
               showsVerticalScrollIndicator={false}
               numColumns={1}
               data={item.Ingredients}
               renderItem={({item}) => <Text style={{alignSelf:'center'}}>{item}</Text>}
                />
          </View>
          <Text style={styles.category}>Directions/Process</Text>
          <View style={styles.infoContainer}>
               <FlatList
               vertical
               showsVerticalScrollIndicator={false}
               numColumns={1}
               data={item.direction}
               renderItem={({item}) => <Text style={{alignSelf:'center'}}>{item}</Text>}
                />
          </View>
          <Text style={styles.category}>Notes</Text>
          <View style={styles.infoContainer}>
               <FlatList
               vertical
               showsVerticalScrollIndicator={false}
               numColumns={1}
               data={item.notes}
               renderItem={({item}) => <Text style={{alignSelf:'center'}}>{item}</Text>}
                />
          </View>
          <Text style={styles.category}>Nutrition Info</Text>
          <Text style={{alignSelf:'center'}}>Serving Size: {item.nutritionServingSize}</Text>
          <Text style={{alignSelf:'center'}}>Calories: {item.nutritionCalories}</Text>
          <Text style={{alignSelf:'center'}}>Fibre: {item.nutritionFibre} gm</Text>
          <Text style={{alignSelf:'center'}}>Protein: {item.nutritionProtein} gm</Text>
          <Text style={{alignSelf:'center'}}>Creator: {item.userEmail}</Text>
        </View>
      </ScrollView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});

