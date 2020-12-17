import ExchengeItem from '../Screens/Exchenge';
import HomeScreen from '../Screens/HomeScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React,{Component} from 'react';
import {Image} from 'react-native'
export const BottomTab = createBottomTabNavigator({
 
    home:{ screen :HomeScreen}, change:{screen :ExchengeItem},
   
  },
  {
    defaultNavigationOptions:({navigation})=>({
      tabBarIcon:({})=>{
        const routname = navigation.state.routeName;
         if(routname === 'change'){
           return    <Image source={require('../assets/chan.jpg')} style={{width:50,height:50}}/>
         }
         if(routname === 'home'){
          return    <Image source={require('../assets/home.jpg')} style={{width:50,height:50}}/>
        }
      }
    })
  })
  export default BottomTab;