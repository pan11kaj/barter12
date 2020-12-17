import React from 'react';
import {View,TextInput,Text,StyleSheet,TouchableOpacity,ToastAndroid, Alert,Modal,ScrollView,KeyboardAvoidingView,Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class Login extends React.Component{
constructor(){
    super();
    this.state={
        email:'',
        password:'',
        fname:'',
        lname:'',
        cpassword:'',
        visibility:'false',
        address:'',contact:''
    }
}

showSignUp = ()=>{
return(
    <Modal  animationType="fade" transparent={true}  visible={this.state.visibility}>
        <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={styles.modalContainer}>
            <Text style={{fontSize:30,color:'blue'}}>SignUp on Barter</Text>
     <ScrollView>
     <TextInput
      placeholder="Name"
      style={styles.input2}
     onChangeText={text=>{this.setState({fname:text})}}
     /> 
      <TextInput
      placeholder="SurName"
      style={styles.input2}
     onChangeText={text=>{this.setState({lname:text})}}
     />  
         <TextInput
      placeholder="address"
      style={styles.input2}
     onChangeText={text=>{this.setState({address:text})}}
     />  
       <TextInput
          maxLength={10}
      keyboardType={'numeric'}
      placeholder="contact"
      style={styles.input2}
     onChangeText={text=>{this.setState({contact:text})}}
     /> 
         <TextInput
      placeholder="email-id"
      keyboardType={'email-address'}
      style={styles.input2}
     onChangeText={text=>{this.setState({email:text})}}
     />  
         <TextInput
         secureTextEntry={true}
      placeholder="password"
      style={styles.input2}
     onChangeText={text=>{this.setState({password:text})}}
     />     
    <TextInput
    secureTextEntry={true}
      placeholder="confirm password"
      style={styles.input2}
     onChangeText={text=>{this.setState({cpassword:text})}}
     />  
     <View style={{justifyContent:'center',alignItems:'center'}}><TouchableOpacity style={{
         justifyContent:'center',alignItems:'center',borderRadius:20,width:110,height:30,backgroundColor:'black',borderColor:'blue'}}
         onPress={()=>{this.signup(this.state.email,this.state.password,this.state.cpassword)}}>
        <Text style={{color:'red',textAlign:'center'}}>Register AC</Text>
        </TouchableOpacity></View> 
        <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}><TouchableOpacity style={{
         justifyContent:'center',alignItems:'center',borderRadius:20,width:110,height:32,backgroundColor:'black',borderColor:'blue'}}
         onPress={()=>{this.setState({visibility:'false'})}}>
        <Text style={{color:'red',textAlign:'center'}}>Cancel Registeration</Text>
        </TouchableOpacity></View> 
    </ScrollView> 
    
    </View>
    </KeyboardAvoidingView>
    </Modal>
)


}


signup =(e,p,c)=>{
if(p !== c){
return Alert.alert("Your password is mismatch please fix and try later")
}
else{
    db.collection('AllUSERS').add({
        'Name':this.state.fname,
        'Surname':this.state.lname,
        'contact':this.state.contact,
        'address':this.state.address,
        'email':this.state.email,
        'password':this.state.password,
         'isItemRequest':false
    })
    firebase.auth().createUserWithEmailAndPassword(e,p)
.then((response)=>{
 return Alert.alert('signed succes')
})
.catch((error)=>{
    var errcode = error.code;
    var msg = error.message;
    Alert.alert(msg)
})
}

}
login = (e,p)=>{
    firebase.auth().signInWithEmailAndPassword(e,p)
    .then(()=>{
        return this.props.navigation.navigate('Drawer')
    })
    .catch((error)=>{
        var errcode = error.code;
    var msg = error.message;
    Alert.alert(msg)
    })
}
render(){
    return(
        <View style={styles.container}>
        <Image
      style={{width:200,height:200,justifyContent:'center',marginTop:-30}}
      source={require('../assets/img.png')}
      />
      <Text style={{justifyContent:'center',fontSize:27,}}>BARTER</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>{this.showSignUp()}</View>
    <TextInput 
      style={styles.inputs}
      placeholder="enter eamil"
      keyboardType={'email-address'}
      onChangeText={text=>{this.setState({email:text})}}
    />
      <TextInput 
      secureTextEntry
      style={styles.inputs}
      placeholder="enter password"
      onChangeText={text=>{this.setState({password:text})}}
    />  
     <TouchableOpacity style={styles.buttons}
    onPress={()=>{this.login(this.state.email,this.state.password)}}>
        <Text style={styles.textinput}>Login</Text>
    </TouchableOpacity>
   
    <TouchableOpacity style={styles.buttons}
    onPress={()=>this.setState({"visibility":true})}>
        <Text style={styles.textinput}>SignUp</Text>
    </TouchableOpacity>
 
        </View>
     
    )
}
    
}
const styles = StyleSheet.create({
inputs:{
 width:200,height:60,justifyContent:'center',borderColor:'red',
 borderWidth:2,marginTop:17,
},buttons:{
    justifyContent:"center",alignItems:'center',
    backgroundColor:'red',width:200,borderRadius:30,marginLeft:10,
    height:50,marginTop:30
},textinput:{
    color:'white',textAlign:'center'
},
input2:{
    width: 300, height: 40, borderBottomWidth: 1.5, borderColor : 'orange', fontSize: 20, margin:10, paddingLeft:10
},
modalContainer:
{ flex:1, 
    borderRadius:20,
     justifyContent:'center',
    alignItems:'center',
     backgroundColor:"pink", 
     marginRight:30,
      marginLeft : 30,
       marginTop:80, marginBottom:80, 
    },
    container:{ 
        flex:1,
        alignItems: 'center',
        justifyContent: 'center' 
    }
})