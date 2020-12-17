import React,{Component} from 'react';
import {Header,Badge,Icon} from 'react-native-elements';
import {View,Text} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class MyHeader extends Component{
constructor(props){
super(props);
this.state={
    unreadNoti:"",i:firebase.auth().currentUser.email
}
}
unreadNotification(){
    db.collection("all_notification").where('targeted_user_id','==',this.state.i).where('noti_status','==','unRead')
    .onSnapshot(snapshot=>{
        var unreadNoti = snapshot.docs.map((doc) => doc.data());
        
        this.setState({
            unreadNoti:unreadNoti.length
        })
    })
}
componentDidMount(){
    this.unreadNotification()
}
bellIcon=()=>{
    return(
        <View>
      <Icon name="bell" type="font-awesome" onPress={()=>this.props.navigation.navigate('YourNotification')}/> 
      <Badge
      value={this.state.unreadNoti}
      containerStyle={{position:"absolute",top:-4,right:-4}}
      />
        </View>
    )
}

render(){
    
    return(
    
        <Header
         leftComponent={<Icon name="bars" type="font-awesome" onPress={()=>this.props.navigation.toggleDrawer()} />}
        centerComponent={{text:this.props.title,style:{color:'red',fontSize:20,justifyContent:'center',textAlign:'center'}}}
        rightComponent={<this.bellIcon {...this.props}/>}
        backgroundColor={'yellow'}
        />
    )
}

}




        

