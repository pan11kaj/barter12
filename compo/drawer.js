import React, { Component } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';
export default class Drawer extends Component{
constructor(){
    super();
    this.state={
        userid:firebase.auth().currentUser.email,image:'',docId:'',name:''
    }
}
pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userid);
    }
  };
uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };
  componentDidMount(){
    this.fetchImage(this.state.userid);
    this.getUserProfile();
  }
  getUserProfile() {
    db.collection("ALLUSERS")
      .where("email", "==", this.state.userid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().Name + " " + doc.data().Surname,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }


    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:1,backgroundColor:'red',marginTop:10}}>
                   <Avatar
            rounded
            source={
                {uri:this.state.image}
            }
            onPress={this.pickImage}
            size={'xlarge'}
            
            avatarStyle={{alignItems:'center'}}
             containerStyle={{ flex: 1.0,
                marginLeft: 50, marginTop: 10,}}
            /><Text style={{color:'yellow',textAlign:'center'}}>Name:-{this.state.name}</Text>
            </View>
          <DrawerItems
          {...this.props}/>
         

          <TouchableOpacity style={styles.buton} onPress={()=>{
              this.props.navigation.navigate('login')
              
          }}>
              <Text>
            Logout
              </Text>
          </TouchableOpacity>
            </View>
        )
    }
    }
 const styles = StyleSheet.create({
     container:{flex:1,marginTop:20},buton:{width:60,backgroundColor:'yellow',marginTop:400,borderRadius:20,alignItems:'center'}
    
 })
