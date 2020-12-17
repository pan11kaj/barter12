import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Rd from '../screens/recieverdetails';
import HomeScreen from '../Screens/HomeScreen';
export const AppStackNavigator = createStackNavigator({
   HomeScreen: {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RD : {
    screen :Rd,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'HomeScreen'
  }
);
export default AppStackNavigator