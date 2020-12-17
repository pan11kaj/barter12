import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Login from './Screens/Login';
import BottomTab from './compo/tab';
import SideDrawer from './compo/appdrawerNavigator';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import Rd from './Screens/recieverdetails';
export default function App() {
  return (
    <AppContainer/>
  );
}

const SwitchNavigatior = createSwitchNavigator({
  login:Login,
  Drawer:{screen:SideDrawer},
  RD:Rd
})
const AppContainer = createAppContainer(SwitchNavigatior);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
