import React, { Component } from 'react';
import {View,Text, Image, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../compo/MyHeader';
import { ListItem } from 'react-native-elements';

export default class MyExchenges extends Component{
constructor(){
    super();
    this.state={
     allBarters:[],
     exchengerId:firebase.auth().currentUser.email
     ,donorName:''
    }
    this.requestRef=null;
}sendItem=(itemdetail)=>{
    
  if(itemdetail.request_status === 'item Sent'){
  var rstatus = "Donor Intrested";
  db.collection('all_exchenges').doc(itemdetail.doc_id).update({
  "request_status":"Donor Intrested"
  })
  this.sendNotification(itemdetail,rstatus)
  }
  else{
    var rstatus = "item sent";
    db.collection('all_exchenges').doc(itemdetail.doc_id).update({
     "request_status":"item sent"
   })
  
  }
}
getDonorDetails=()=>{
  var donorId = this.state.exchengerId
  
  db.collection("AllUSERS").where("email","==", donorId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      this.setState({
        donorName : doc.data().Name + " " + doc.data().Surname
      })
    });
  })
}
getAllBarters =()=>{
  this.requestRef = db.collection("all_exchenges").where("exchengedby" ,'==', this.state.exchengerId)
  .onSnapshot((snapshot)=>{
    var allBarters = []
    snapshot.docs.map((doc) =>{
      var barter = doc.data()
      barter["doc_id"] = doc.id
      allBarters.push(barter)
    });
    this.setState({
      allBarters : allBarters
    });
  })
}
sendNotification=(itemdetail,requesStatus)=>{
  var donorid = itemdetail.UserId
  var requestid = itemdetail.request_id
  db.collection("all_notification")
 .where('donor_id','==', donorid)
 .where('exchengeid','==', requestid)
 .get()
  .then((snapshot)=>{
    snapshot.forEach(doc=>{
       var msg = ''
       if(requesStatus ==='item sent'){
         msg  = this.state.donorName+ ""+  "sent you Item"
       }else{
         mag = this.state.donorName+ ""+ " has shown intrested to exchenge Item"
       }  db.collection("all_notifications").doc(doc.id).update({
        "message": message,
        "notification_status" : "unread",
        "date"                : firebase.firestore.FieldValue.serverTimestamp()
      })
    
    })
  })
  }





 key=(item,index)=>index.toString();
 renderItem=({item,i})=>{
     return(
         <ListItem
          key={i}
          title={item.item}
          subtitle={'exchengerid:-'+item.exchengedby +"\nStatus : " + item.request_status +"\nExchenger Name: " + item.Name}
          titleStyle={{justifyContent:'center',alignItems:'center',textAlign:'center'}}
        rightElement={<TouchableOpacity style={{backgroundColor:item.request_status ==="Donor Interested"?'red':'green',borderColor:'orange',borderRadius:10,width:90,height:20}}
        onPress={()=>this.sendItem(item)}
        > 
        <Text style={{color:'#ffff',textAlign:'center'}}>{
        item.request_status === "Donor Interested" ? ' send Item':'Item Sended'
        }</Text></TouchableOpacity>
      }
        leftElement={<Image source={require('../ob.jpg')} style={{width:50,height:50}}/>}
          bottomDivider
         />
     )
 }


componentDidMount(){
    this.getAllBarters();
    this.getDonorDetails()
}
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="My Barters"
                navigation ={this.props.navigation}
                rightElement={<Image source={require('../bell.jpg')} style={{width:50,height:50}}/>}
                />
               <FlatList
               keyExtractor={this.key}
               data={this.state.allBarters}
               renderItem={this.renderItem}
               />

            </View>
        )
    }
}