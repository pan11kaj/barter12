import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class Update extends Component{
   constructor(){
       super();
       this.state={
           name:'',surname:'',contact:'',docid:'',emailid:'',address:''
       }
   } 
componentDidMount=()=>{
    var email = firebase.auth().currentUser.email;
  
    db.collection('AllUSERS').where('email','==',email).get()
    .then(snapshot=>{
     snapshot.forEach(doc=>{
         var data = doc.data()
         this.setState({
           name:data.Name,
           surname:data.Surname,
           contact:data.contact,
           address:data.address,
           emailid:data.email,
           docid:doc.id
         })
     })
    })
    
}
updateUserDetails = ()=>{
db.collection('ALLUSERS').doc(this.state.docid)
.update({
'Name':this.state.name,
'Surname':this.state.surname,
'contact':this.state.contact,
'address':this.state.address,
'Surname':this.state.emailid
})
}

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:30,color:'red'}}>YOUR PROFILE</Text>
                <TextInput 
                placeholder="Name"
                style={styles.input}
                maxLength={10}
                onChangeText={text=>{this.setState({name:text})}}
                value={this.state.name}
                />
                    <TextInput 
                placeholder="SurName"
                maxLength={8}
                style={styles.input}
                onChangeText={text=>{this.setState({surname:text})}}
                value={this.state.surname}
                />
                    <TextInput 
                placeholder="Email-id"
                keyboardType={'email-address'}
                style={styles.input}
                onChangeText={text=>{this.setState({emailid:text})}}
                value={this.state.emailid}
                />
                    <TextInput 
                placeholder="contact"
                keyboardType={'numeric'}
                maxLength={10}
                style={styles.input}
                onChangeText={text=>{this.setState({contact:text})}}
                value={this.state.contact}
                />
                    <TextInput 
                placeholder="address"
                style={styles.input}
                onChangeText={text=>{this.setState({address:text})}}
                value={this.state.address}
                />
                <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails()}}><Text style={{color:"black",fontSize:24,textAlign:'center'}}>Update</Text></TouchableOpacity>
         </View>
        )
    }
}
const styles = StyleSheet.create({
container:{
    flex:1,justifyContent:'center',alignItems:'center'
},input:{width:200,borderColor:'blue',borderWidth:1,borderRadius:10,marginTop:20},
button:{
    backgroundColor:'red',marginTop:10,borderWidth:5,borderColor:"yellow",height:50,width:120,borderRadius:30
}
});