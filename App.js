import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import FitImage from "react-native-fit-image";
// import {launchImageLibrary} from "react-native-image-picker"
import axios from "axios";
import  ImagePicker  from 'react-native-image-picker'


// const form = new FormData();
// form.append("image", "");
// form.append("renderFactor", "25");

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      menu:true,
      dataSource:null,
      loading:true,
      base64:null,
    }
  }

  goForAxios()
  {
  const {base64}=this.state;
  this.setState({menu: false});
    console.log("staring request")
    // const {base64}=this.state;
    this.setState({menu:false});

    axios.request({
      method: 'POST',
      url: 'https://ai-picture-colorizer.p.rapidapi.com/colorize-api-bin-mjbcrab',
      headers: {
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
        'x-rapidapi-host': 'ai-picture-colorizer.p.rapidapi.com',
        'x-rapidapi-key': '9d562998a9msh9fd7018688ecd1fp178d64jsn5082a993b740'
      },
      data: '[form]'

    }).then((response)=>{
      console.log(response);
      this.setState({
        loading: false,
        dataSource:response.data.imageBase64,
      })
    }).catch((error)=>{
      console.log(error);
    });
    
  }

selectGalleryImage()
{
  const options={
    includeBase64: true,
  };
  // launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // console.log('response', JSON.stringify(response));
        this.setState({
          // filePath: response,
          // fileData: response.data,
          // fileUri: response.uri
          base64: response.base64,
        });
        this.goForAxios();
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Image Colorization AI</Text>
          <Text style={styles.subtitle}>Color black and white Image</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("./assets/SlimPeriodicChital-mobile.gif")} style={styles.cameraImages}></Image>
          {/* <FitImage
            source={require("./assets/SlimPeriodicChital-mobile.gif")} style={styles.imageContainer}
            originalWidth={400}
            originalHeight={400}
            style={styles.fitImage}
          /> */}
        </View>
        <View style={styles.buttonContainer}>
          {/* <Button
            title="Select Image"
            titleStyle={{ fontSize: 20 }}
            buttonStyle={styles.button}
            onPress={this.selectGalleryImage.bind(this)}
          ></Button> */}
          < Button onPress = {
  () =>
  ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },
    (response) => {
      console.log(response);
      this.setState({
        resourcePath: response
      });
    },
  )
}
title = "Select Image" 
buttonStyle={styles.button}/ >

          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  //   borderRadius:20,
  //   borderRightWidth: 1,
  //   borderLeftWidth:1,
  //  borderBottomWidth: 14,
  //      borderColor: '#024e51',
  //      elevation:30,
  //     shadowColor: 'rgba(0, 0, 0, 0.4)',
  //    shadowOpacity: 0.8,
  //    elevation: 30,
  //    shadowRadius: 15 ,
  //    shadowOffset : { width: 1, height: 13},
    
  },
  titleContainer: {
    marginRight:20,
    marginTop: 30,
    marginLeft: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 38,
    fontWeight: "bold",
    color: "white",
    alignContent:"center",
    borderRadius:20,
    borderRightWidth: 1,
    borderLeftWidth:1,
   borderBottomWidth: 14,
       borderColor: '#024e51',
       elevation:30,
      shadowColor: 'rgba(0, 0, 0, 0.4)',
     shadowOpacity: 0.8,
     elevation: 30,
     shadowRadius: 15 ,
     shadowOffset : { width: 1, height: 13},
  },
  subtitle: {
    padding: "5%",
    fontSize: 17,
    color:"white",
    borderRadius:20,
    borderRightWidth: 1,
    borderLeftWidth:1,
   borderBottomWidth: 14,
       borderColor: 'white',
       elevation:30,
      shadowColor: 'rgba(0, 0, 255, 0.4)',
     shadowOpacity: 0.8,
     elevation: 30,
     shadowRadius: 15 ,
     shadowOffset : { width: 1, height: 13},
  },
  buttonContainer: {
    // paddingBottom: 70,
    alignItems: "center",
  },
  button: {
    // width: 200,
    // height: 57,
    // backgroundColor: "blue",
    // borderRadius: 8,
    width:300,
    // alignItems:"center",
   height:100,
  //  flex:1,
   marginTop:"10%",
  

      
  //  borderRadius:20,
  //  borderRightWidth: 1,
  //  borderLeftWidth:1,
  // borderBottomWidth: 14,
  //     borderColor: 'white',
  //     elevation:30,
  //    shadowColor: 'rgba(0, 0, 0, 0.4)',
  //   shadowOpacity: 0.8,
  //   elevation: 30,
  //   shadowRadius: 15 ,
  //   shadowOffset : { width: 1, height: 13},
    // flex: 20
  },
  imageContainer: {
    // flex: 1,
    // // paddingLeft: 10,

    // justifyContent: "center",
    // alignItems: "center",
    // width: "100%",
    marginTop:'10%',
    width: '100%',
    height: 300,
    // height: undefined,
    // aspectRatio: 1,
  },
  cameraImages:{
  //   position:'absolute',
  //   top:"5%",
  //   width: "90%",
  //   height:"100%",
  //   paddingLeft: 10,
  //   borderRadius:20,
  //   borderRightWidth: 1,
  //   borderLeftWidth:1,
  //  borderBottomWidth: 14,
  //      borderColor: '#024e51',
  //      elevation:30,
  //     shadowColor: 'rgba(0, 0, 0, 0.4)',
  //    shadowOpacity: 0.8,
  //    elevation: 30,
  //    shadowRadius: 15 ,
  //    shadowOffset : { width: 1, height: 13},
  flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover'

  }
});
