import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,
  Image,PixelRatio ,AsyncStorage,
  ActivityIndicator,
  ToastAndroid} from 'react-native'
  import { ScrollView } from 'react-native-gesture-handler';
  import ImagePicker from 'react-native-image-picker';

  import {Button,Textarea,
    Container, Header, Content,Icon, Picker,
    Form, Item, Input, Label, Toast} from 'native-base'
    import NetInfo from "@react-native-community/netinfo";

    import {  AirbnbRating } from 'react-native-elements';
    import { NavigationEvents } from "react-navigation";
    import axios from 'axios';

    export default class AddRecipe extends Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading:false,
          id:"",
          title:"",
          course: "default",
          recipeImage: null,
          recipeImageUrl:"", //https://i.ibb.co/s966rdJ/default.png
          category:'default',
          source:"",
          servingSize:"",
          preperationTime:"",
          cookingTime:"",
          rating:5,
          ingredients:"",
          direction:"",
          notes:"",
          nutritionServingSize:"",
          nutritionCalories:"",
          nutritionFat:"",
          nutritionSaturatedFat:"",
          nutritionsCholesterol:"",
          nutritionCarbs:"",
          nutritionFibre:"",
          nutritionProtein:"",
          nutritionSuger:"",
        }
    }


    componentDidMount = async () =>{
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        this.fillStateData(item);
        NetInfo.fetch().then(state => {
          if(state.isConnected == false){
            ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT)
          }
        });

    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
        ImagePicker.showImagePicker(options, response => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            // console.log(response);
            let source = {uri: response.uri};

            const imageData = new FormData();
            imageData.append('name', 'photo');
            imageData.append('photo', {
              uri: response.uri,
              type: response.type,
              name: response.fileName,
              data: response.data
            });
            axios
            .post('https://recipe-backend12.herokuapp.com/api/fileUpload', imageData, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${imageData._boundary}`
            }
          })
          .then(res =>{
            if(res.data.success === true){
              this.setState({ recipeImageUrl: res.data.result.url})
              ToastAndroid.show('Image Uploaded!', ToastAndroid.SHORT);
            }else{
              this.setState({ recipeImageUrl: ''})
              ToastAndroid.show('Upload failed Try agin.', ToastAndroid.SHORT);
            }
          })
          // fetch('https://recipe-backend12.herokuapp.com/api/fileUpload',postData)
          // .then(result=>{
          //   console.log(result);
          //   if(result !== undefined){
          //     this.setState({ recipeImage: result.url})
          //   }
          // })

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          // console.log('upload start')
          // this.uploadImage(response.uri)
          // .then(url => { alert('uploaded'); this.setState({recipeImage: url}), console.log('upload end') })
          // .catch(error => console.log(error))
          // this.setState({
          //   recipeImage: source,
          // });
        }
      });
    }

    handleRecipe = async () =>{
      NetInfo.fetch().then(async state => {
        if(state.isConnected == false){
          ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
          // return false;
        }else{


          //getting email of loggedin user then add to this below object and save
          const value = await AsyncStorage.getItem('user');
          let userobj = JSON.parse(value);
          if(userobj == null){
            this.props.navigation.navigate('Login');
          }
          if(this.state.title !== "" && this.state.category !== ""){



            //ingredients array create
            let fIng = [];
            if(this.state.ingredients !== ''){
              let ingredientsArr = this.state.ingredients.split(",");
              ingredientsArr.forEach((each, i) => {
                fIng[i] = each.trim();
              });
            }

            //direction array create
            let directionArr = [];
            let fDir = [];
            if(this.state.direction !== ''){
              directionArr = this.state.direction.split(",");
              directionArr.forEach((each, i) => {
                fDir[i] = each.trim();
              });
            }

            //notes array create
            let fNotes = [];
            if(this.state.notes !== ''){
              let notesArr = this.state.notes.split(",");
              notesArr.forEach((each, i) => {
                fNotes[i] = each.trim();
              });
            }


            let newRecipe = {
              title:this.state.title,
              course: this.state.course,
              recipeImageUrl:this.state.recipeImageUrl != ""?this.state.recipeImageUrl:"https://i.ibb.co/NZvnYgg/download.png",
              category:this.state.category,
              source:this.state.source,
              servingSize:this.state.servingSize,
              preperationTime:this.state.preperationTime,
              cookingTime:this.state.cookingTime,
              rating:this.state.rating,
              Ingredients:fIng,
              direction:fDir,
              notes:fNotes,
              nutritionServingSize:this.state.nutritionServingSize,
              nutritionCalories:this.state.nutritionCalories,
              nutritionFat:this.state.nutritionFat,
              nutritionSaturatedFat:this.state.nutritionSaturatedFat,
              nutritionsCholesterol:this.state.nutritionsCholesterol,
              nutritionCarbs:this.state.nutritionCarbs,
              nutritionFibre:this.state.nutritionFibre,
              nutritionProtein:this.state.nutritionProtein,
              nutritionSuger:this.state.nutritionSuger,
              userEmail:userobj.user.email,
            }
            axios
            .post('https://recipe-backend12.herokuapp.com/api/recipe/', newRecipe)
            .then(res=> {
              ToastAndroid.show(res.data,ToastAndroid.SHORT);
              this.handleClear();
              this.props.navigation.navigate('MyRecipe');
            })
            .catch(err=> {ToastAndroid.show('err',ToastAndroid.SHORT); })
          }
          else{
            ToastAndroid.show('Please Provide Title and category atleast', ToastAndroid.SHORT);
          }
        }
      });
    }

    handleUpdateRecipe = async () =>{
      NetInfo.fetch().then(async state => {
        if(state.isConnected == false){
          ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
          // return false;
        }else{


          //getting email of loggedin user then add to this below object and save
          const value = await AsyncStorage.getItem('user');
          let userobj = JSON.parse(value);
          if(userobj == null){
            this.props.navigation.navigate('Login');
          }

          //ingredients array create
          let fIng = [];
          if(this.state.ingredients !== ''){
            let ingredientsArr = this.state.ingredients.split(",");
            ingredientsArr.forEach((each, i) => {
              fIng[i] = each.trim();
            });
          }

          //direction array create
          let directionArr = [];
          let fDir = [];
          if(this.state.direction !== ''){
            directionArr = this.state.direction.split(",");
            directionArr.forEach((each, i) => {
              fDir[i] = each.trim();
            });
          }

          //notes array create
          let fNotes = [];
          if(this.state.notes !== ''){
            let notesArr = this.state.notes.split(",");
            notesArr.forEach((each, i) => {
              fNotes[i] = each.trim();
            });
          }


          let newRecipe = {
            title:this.state.title,
            course: this.state.course,
            recipeImageUrl:this.state.recipeImageUrl,
            category:this.state.category,
            source:this.state.source,
            servingSize:this.state.servingSize,
            preperationTime:this.state.preperationTime,
            cookingTime:this.state.cookingTime,
            rating:this.state.rating,
            Ingredients:fIng,
            direction:fDir,
            notes:fNotes,
            nutritionServingSize:this.state.nutritionServingSize,
            nutritionCalories:this.state.nutritionCalories,
            nutritionFat:this.state.nutritionFat,
            nutritionSaturatedFat:this.state.nutritionSaturatedFat,
            nutritionsCholesterol:this.state.nutritionsCholesterol,
            nutritionCarbs:this.state.nutritionCarbs,
            nutritionFibre:this.state.nutritionFibre,
            nutritionProtein:this.state.nutritionProtein,
            nutritionSuger:this.state.nutritionSuger,
            userEmail:userobj.user.email,
          }
          axios
          .post(`https://recipe-backend12.herokuapp.com/api/recipe/${this.state.id}`, newRecipe)
          .then(res=> {
            ToastAndroid.show(res.data,ToastAndroid.SHORT);
            this.handleClear();
            this.props.navigation.navigate('MyRecipe');
          })
          .catch(err=> {ToastAndroid.show('err',ToastAndroid.SHORT); })
        }
      });
    }

    handleClear = () => {
      this.setState({
        id:"",
        title:"",
        course: "default",
        recipeImage: null,
        recipeImageUrl:"",
        category:'default',
        source:"",
        servingSize:"",
        preperationTime:"",
        cookingTime:"",
        rating:"",
        Ingredients:"",
        direction:"",
        notes:"",
        nutritionServingSize:"",
        nutritionCalories:"",
        nutritionFat:"",
        nutritionSaturatedFat:"",
        nutritionsCholesterol:"",
        nutritionCarbs:"",
        nutritionFibre:"",
        nutritionProtein:"",
        nutritionSuger:"",
      })
    }

    handleRemoveRecipe = async () =>{
      NetInfo.fetch().then(async state => {
        if(state.isConnected == false){
          ToastAndroid.show('Please Turn On Internet', ToastAndroid.SHORT);
          // return false;
        }else{
          axios
          .delete(`https://recipe-backend12.herokuapp.com/api/recipe/${this.state.id}`)
          .then(res=> {
            ToastAndroid.show(res.data,ToastAndroid.SHORT);
            this.handleClear();
            this.props.navigation.navigate('MyRecipe');
          })
          .catch(err=> {ToastAndroid.show('err',ToastAndroid.SHORT); })
        }
      });
    }

    handleFillData = () =>{
      this.handleClear();
      const { navigation } = this.props;
      const item = navigation.getParam('item');
      this.fillStateData(item);
    }

    fillStateData = (item) =>{
      if(item !== undefined){
        this.setState({
          id:item._id,
          title:item.title?item.title:"",
          course: item.course?item.title:"",
          recipeImageUrl:item.recipeImageUrl?item.recipeImageUrl:"https://i.ibb.co/s966rdJ/default.png",
          category:item.category?item.category:"",
          source:item.source?item.source:"",
          servingSize:item.servingSize?item.servingSize:"",
          preperationTime:item.preperationTime?item.preperationTime:"",
          cookingTime:item.cookingTime?item.cookingTime:"",
          rating:item.rating?item.rating:"5",
          ingredients:item.Ingredients?item.Ingredients.join(","):"",
          direction:item.direction?item.direction.join(","):"",
          notes:item.notes?item.notes.join(","):"",
          nutritionServingSize:item.nutritionServingSize?item.nutritionServingSize:"",
          nutritionCalories:item.nutritionCalories?item.nutritionCalories:"",
          nutritionFat:item.nutritionFat?item.nutritionFat:"",
          nutritionSaturatedFat:item.nutritionSaturatedFat?item.nutritionSaturatedFat:"",
          nutritionsCholesterol:item.nutritionsCholesterol?item.nutritionsCholesterol:"",
          nutritionCarbs:item.nutritionCarbs?item.nutritionCarbs:"",
          nutritionFibre:item.nutritionFibre?item.nutritionFibre:"",
          nutritionProtein:item.nutritionProtein?item.nutritionProtein:"",
          nutritionSuger:item.nutritionSuger?item.nutritionSuger:"",
          userEmail:item.userEmail,
        })
      }
    }

    render() {
      return (
        <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.handleFillData()} />
        <Text style={{
          textAlign:'center',
          fontSize:28,
          fontWeight:'bold',
          color:'black',
          marginVertical:20
        }}
        > AddRecipe </Text>
        <ScrollView>
        {/* {this.state.isLoading?<ActivityIndicator size="large" color="#0000ff" />:<Text></Text>} */}
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{alignItems:'center'}}>
        <View
        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
        {this.state.recipeImageUrl === "" ? (
          <Text>Add a Photo</Text>
          ) : (
            <Image style={styles.avatar} source={{uri:this.state.recipeImageUrl}} />
            )}
            </View>
            </TouchableOpacity>
            <Form>
            <Text style={styles.headingText}>Overview</Text>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Title</Label>
            <Input
            value={this.state.title}
            onChangeText={(title)=> this.setState({title})}
            />
            </Item>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined, marginLeft:10,marginRight:10, marginVertical:5 }}
            selectedValue={this.state.course}
            onValueChange={(course)=>this.setState({course})}
            >
            <Picker.Item label="Select Course" value="default" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Tiffin" value="Tiffin" />
            <Picker.Item label="Desert" value="Desert" />
            </Picker>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined, marginLeft:10,marginRight:10, marginTop:5, marginBottom:0 }}
            selectedValue={this.state.category}
            onValueChange={(category)=>this.setState({category})}
            >
            <Picker.Item label="Select Category" value="default" />
            <Picker.Item label="Non-Veg" value="Non-Veg" />
            <Picker.Item label="Veg" value="Veg" />
            </Picker>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Source</Label>
            <Input
            value={this.state.source}
            onChangeText={(source)=> this.setState({source})}
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Serving Size(in People)</Label>
            <Input
            keyboardType="number-pad"
            value={this.state.servingSize}
            onChangeText={(servingSize)=> this.setState({servingSize})}
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Preparation Time(in minutes approx.)</Label>
            <Input
            keyboardType="number-pad"
            value={this.state.preperationTime}
            onChangeText={(preperationTime)=> this.setState({preperationTime})}
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Cooking Time(in minutes approx.)</Label>
            <Input
            keyboardType="number-pad"
            value={this.state.cookingTime}
            onChangeText={(cookingTime)=> this.setState({cookingTime})}
            />
            </Item>
            <AirbnbRating style={styles.textInputBox}
            count={5}
            value={this.state.rating}
            onFinishRating={(rating)=> this.setState({ rating})}
            reviews={["Terrible", "OK", "Good", "Very Good", "Amazing"]}
            // defaultRating={5}
            size={14}
            />
            <Text style={styles.headingText}>Ingredients</Text>
            <Textarea value={this.state.ingredients}
            onChangeText={(ingredients)=> this.setState({ingredients})}
            rowSpan={10}
            bordered
            placeholder="(use comma for steps seperate)like. mastered oil,chicken legs,masalas 2 and 1/2 cup" />
            <Text style={styles.headingText}>Direction</Text>
            <Textarea value={this.state.direction}
            onChangeText={(direction)=> this.setState({direction})}
            rowSpan={10} bordered placeholder="(use comma for steps seperate)like. lighting up gas, let the oil warm for 1 minutes, put the masalas on the pan" />
            <Text style={styles.headingText}>Notes</Text>
            <Textarea value={this.state.notes}
            onChangeText={(notes)=> this.setState({notes})}
            rowSpan={10} bordered placeholder="(use comma for steps seperate)like. carefull about chillis, limited oil" />
            <Text style={styles.headingText}>Nutritions</Text>
            <Label>Amount Per serving</Label>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Serving size</Label>
            <Input value={this.state.nutritionServingSize}
            onChangeText={(nutritionServingSize)=> this.setState({nutritionServingSize})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Calories</Label>
            <Input value={this.state.nutritionCalories}
            onChangeText={(nutritionCalories)=> this.setState({nutritionCalories})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Total fat(g)</Label>
            <Input value={this.state.nutritionFat}
            onChangeText={(nutritionFat)=> this.setState({nutritionFat})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Saturated fat</Label>
            <Input value={this.state.nutritionSaturatedFat}
            onChangeText={(nutritionSaturatedFat)=> this.setState({nutritionSaturatedFat})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>cholesterol(mg)</Label>
            <Input value={this.state.nutritionsCholesterol}
            onChangeText={(nutritionsCholesterol)=> this.setState({nutritionsCholesterol})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Total carbohydrate(g)</Label>
            <Input value={this.state.nutritionCarbs}
            onChangeText={(nutritionCarbs)=> this.setState({nutritionCarbs})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Dietory fibre(g)</Label>
            <Input value={this.state.nutritionFibre}
            onChangeText={(nutritionFibre)=> this.setState({nutritionFibre})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Sugar(g)</Label>
            <Input value={this.state.nutritionSuger}
            onChangeText={(nutritionSuger)=> this.setState({nutritionSuger})}
            keyboardType="number-pad"
            />
            </Item>
            <Item floatingLabel style={styles.textInputBox}>
            <Label>Protein(g)</Label>
            <Input value={this.state.nutritionProtein}
            onChangeText={(nutritionProtein)=> this.setState({nutritionProtein})}
            keyboardType="number-pad"
            />
            </Item>
            {!this.state.id?
              <TouchableOpacity
              style={{width:200, height:60,
                backgroundColor:'#ffffff',
                borderColor:'orange',borderWidth:4,
                opacity:0.6,
                borderRadius:30,
                justifyContent:'center',
                alignSelf:'center', marginVertical:10, marginBottom:25}}
                onPress={()=>this.handleRecipe()}>
                <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Save</Text>
                </TouchableOpacity>:<Text></Text>


              }


              {this.state.id?
                <View
                style={{marginBottom:40, flexDirection:'row', justifyContent:'space-evenly'}}
                >
                <TouchableOpacity
                style={{width:100, height:50,
                  backgroundColor:'#ffffff',
                  borderColor:'orange',borderWidth:4,
                  opacity:0.6,
                  borderRadius:30,
                  justifyContent:'center',
                  alignSelf:'center', marginVertical:10, marginBottom:25}}
                  onPress={()=>this.handleUpdateRecipe()}>
                  <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  style={{width:100, height:50,
                    backgroundColor:'#ffffff',
                    borderColor:'orange',borderWidth:4,
                    opacity:0.6,
                    borderRadius:30,
                    justifyContent:'center',
                    alignSelf:'center', marginVertical:10, marginBottom:25}}
                    onPress={()=>this.handleRemoveRecipe()}>
                    <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Remove</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                  style={{width:100, height:50,
                    backgroundColor:'#ffffff',
                    borderColor:'orange',borderWidth:4,
                    opacity:0.6,
                    borderRadius:30,
                    justifyContent:'center',
                    alignSelf:'center', marginVertical:10, marginBottom:25}}
                    onPress={()=>this.handleClear()}>
                    <Text style={{textAlign:'center', color:'black', fontSize:19, fontWeight:'bold'}}>Clear</Text>
                    </TouchableOpacity>

                    </View>
                    :<Text></Text>
                  }
                  </Form>
                  </ScrollView>
                  </View>
                  )
                }
              }

              const styles = StyleSheet.create({
                container:{
                  flexGrow:1,
                  margin:5,
                  justifyContent:'center'
                },
                avatarContainer: {
                  borderColor: '#9B9B9B',
                  borderWidth: 1 / PixelRatio.get(),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                headingText:{
                  textAlign:'center',
                  fontSize:25,
                  fontWeight:'bold',
                  color:'green',
                  marginHorizontal:5,
                  marginVertical:5
                },
                textInputBox:{
                  marginVertical:5,
                  marginRight:10
                },
                avatar: {
                  borderRadius: 75,
                  width: 150,
                  height: 150,
                },
              });