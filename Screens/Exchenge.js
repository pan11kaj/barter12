import React from 'react';
import { StyleSheet, Text, View,TextInput ,TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import firebase from 'firebase'
import db from '../config'
export default class ExchengeItem extends React.Component{
   constructor(){
       super();
       this.state={
           itemName:'',
           userId:firebase.auth().currentUser.email,
           docid:'',itemr:'',des:'',
           status:'',requestid:''
       }
    
   } 
   createUniqueId(){
    return Math.random().toString(36).substring(7)
}getstatus=()=>{
    db.collection('all_exchenges').where('requestby','==',this.state.userId).get()
       .then(snapshot=>{
           snapshot.forEach(doc=>{
               if(doc.data().request_status !== "recieved"){
               this.setState({
                   itemName:doc.data().item,
                   status:doc.data().request_status,
                   requestid:doc.data().rid,
                   docid:doc.id
               })}
           })
       })
   }
updateStatus=()=>{
    db.collection("all_exchenges").where('requestby','==',this.state.userId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('all_exchenges').doc(doc.id).update({
                request_status:'recieved'
               })
        })
    })
  
    db.collection('AllUSERS').where('email','==',this.state.userId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
         db.collection('AllUSERS').doc(doc.id).update({
           isItemRequest:false
         })
      })
    })
   }
recievedItems=()=>{
    var uid = this.state.userId;
    var rid = this.state.requestid;
    db.collection("r_item").add({
       "uid":uid,
       "rid":rid,
       "name":this.state.itemName,
       "i_status":'recieved'
    })
}


SendNotification=()=>{
db.collection('AllUSERS').where('email','==',this.state.userId).get()
.then((snpa)=>{
    snpa.forEach(doc=>{
        var Name = doc.data().Name;
        var Surname = doc.data().Surname;
  
db.collection('all_notification').where('exchengeid','==',this.state.requestid).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        var Iname = doc.data().item_name;
        var donorid = doc.data().donor_id;

        db.collection('all_notification').add({
            "targeted_user_id":donorid,
             "message":Name+""+Surname+""+"has Recieved the Item",
             "noti_status":"unRead",
             "item_name":Iname
        }) 
    })
})  })
})


}


isItemRequest(){
    db.collection("AllUSERS").where('email','==',this.state.userId).get()
   .then(snapshot=>{
       snapshot.forEach(doc=>{
           this.setState({
               itemr:doc.data().isItemRequest,
               
           })
       })
   })
      
}

componentDidMount(){
this.isItemRequest()
this.getstatus()
}

   addItems=async(i,c)=>{
       var id = this.createUniqueId()
       if(i !== '' && c !== ''){
        db.collection("Users").add({
            'UserId':this.state.userId,
            'Item':i,
            'Des':c,
            'request_id':id
        }) 
         await this.getstatus()
        db.collection('AllUSERS').where('email','==',this.state.userId).get()
         .then()
         .then((snapshot)=>{
           snapshot.forEach((doc)=>{
             db.collection('AllUSERS').doc(doc.id).update({
               isItemRequest:true
             })
           })
         })
        this.setState({itemName:'',des:''})
        return ToastAndroid.show('Congratulation! your Item has requested',ToastAndroid.LONG)
       
       }else{
        return Alert.alert('Please Fill all the Information')
       }
    
   }
    render(){
        if(this.state.itemr===true){
           return(
               <View style={{justifyContent:'center',flex:1}}>
                   <View style={{borderColor:'yellow',borderWidth:3,margin:10,padding:10,justifyContent:'center'}}>
                   <Text style={{textAlign:'center',color:'red'}}>Item Name:-</Text>
                   <Text style={{color:'red',textAlign:'center'}}>{this.state.itemName}</Text> 
                   </View>
                   <View style={{borderColor:"yellow",borderWidth:3,justifyContent:'center',alignItems:'center',margin:10,padding:10}}>
                  
                   <Text style={{color:'red',textAlign:'center'}}>Item Status:-</Text>
                   <Text style={{color:'red'}}>{this.state.status}</Text>
                   </View>
                 
                   <TouchableOpacity style={{backgroundColor:'orange'}} onPress={()=>{
                       this.updateStatus()
                       this.SendNotification()
                       this.recievedItems()
                   }}>
                       <Text style={{textAlign:'center'}}>I Recieved The Item</Text>
                   </TouchableOpacity>
                   
               </View>
           )
        }else{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:28,backgroundColor:'blue',color:'white',marginTop:-20}}>Add Your Own Item</Text></View>
               <TextInput
                style={styles.input}
                placeholder="Item Name"
                onChangeText={text=>{this.setState({itemName:text})}}
                value={this.state.itemName}
               />  
               <TextInput
               style={{width:200,height:160,borderWidth:3,borderColor:'red',marginTop:10}}
               placeholder="description"
               multiline
               onChangeText={text=>{this.setState({des:text})}}
               value={this.state.des}
               />
               <TouchableOpacity style={styles.buton} onPress={()=>{
                   this.addItems(this.state.itemName,this.state.des)}}>
                       <Text style={{textAlign:'center',color:'#ffff',fontSize:24}}>Submit</Text>
                       </TouchableOpacity>
            </View>
        )}
    }
}

const styles = StyleSheet.create({
   input:{
       width:200,height:30,borderWidth:3,borderColor:'red'
   } ,buton:{width:200,backgroundColor:'blue',borderRadius:20,marginTop:20,height:40}
})