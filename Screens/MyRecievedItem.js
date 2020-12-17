import React, { Component } from 'react';
import {View,Text, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../compo/MyHeader';

export default class MyItems extends Component{
constructor(props){
    super(props);
    this.state={
        userid :firebase.auth().currentUser.email,
        RecievedI:[]
    }
    this.requestRef = null
}
getRecievedItems=()=>{
    this.requestRef = db.collection("all_exchenges").where('requestby','==',this.state.userid).where('request_status','==','recieved')
  .get()
  .then(snapshot=>{
  snapshot.forEach(doc=>{
      this.setState({
          RecievedI:doc.data()
      })
  })
  })
    
}
componentWillUnmount(){
    this.requestRef
}
componentDidMount(){
    this.getRecievedItems()
}
key=(item,index)=>index.toString()
renderItem=({Item,i})=>{
    return(
        <ListItem
        key={i}
        title={Item.item}
        subtitle={Item.request_status}
        titleStyle={{fontSize:30,fontWeight:'bold'}}
        bottomDivider
        />
    )
}
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center',flex:0.1}}>
             <View style={{justifyContent:'center',alignItems:'center'}}><MyHeader title="My Recieved Items" navigation={this.props.navigation} backgroundColor="orange"/></View>
        { this.state.RecievedI.length ===0?(
            <View style={{alignItems:'center',justifyContent:'center',flex:0.2}}><Text style={{fontSize:23,color:'orange'}}>list of all Recieves</Text></View>
        ):(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><FlatList
            keyExtractor={this.key}
            data={this.state.RecievedI}
            renderItem={this.renderItem}
            
            /></View>)
        
        
        }
            </View>
        )
    }
}

