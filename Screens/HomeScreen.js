import React,{Component} from 'react';
import { StyleSheet,  View,TouchableOpacity ,Text,FlatList, ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase'
import { ListItem } from 'react-native-elements';
import MyHeader from '../compo/MyHeader'

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            allItems:[]
        }
        this.ref = null
    }
  
    componentDidMount=()=>{
    this.ref = db.collection('Users')
    .onSnapshot((snapshot)=>{
        var AllItems = snapshot.docs.map((doc) => doc.data())
        this.setState({
       allItems:AllItems
        });
      })
    }
    keyExtractor =(item,index)=>index.toString()
    
    renderItem=({item,i})=>{
     return(
         <ListItem
         key={i}
         title={item.Item}
         subtitle={item.Des}
         titleStyle={{color:'red',fontWeight:'bold'}}
         rightElement={<TouchableOpacity style={{backgroundColor:'red',borderRadius:20}} onPress={()=>{this.props.navigation.navigate('RD',{"details":item})}}><Text style={{color:'white'}}>View details</Text></TouchableOpacity>}
        bottomDivider
         />
     )
    }


    render(){
        return(
        <View style={{flex:1}}>
            <View><MyHeader title="All Items" navigation ={this.props.navigation}/></View>
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.allItems}
        renderItem={this.renderItem}
        />
        
        </View>
    
        )
        }}        
const styles = StyleSheet.create({
    des:{
     fontSize:17,color:'green',maxWidth:280,backgroundColor:"yellow"
    },
    outputs:{
      fontSize:20,color:'blue',marginTop:50,backgroundColor:'yellow',maxWidth:280
    },head:{ flex:1, fontSize: 28, alignItems:'center',marginTop:50,textAlign:'center',backgroundColor:'red', },
    buton:{
        alignItems:'flex-end',borderWidth:2,width:70,backgroundColor:'red',marginLeft:300,borderRadius:30
    }
})