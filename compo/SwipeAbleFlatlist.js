import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,Image,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';


export default class SwipeAble extends Component{
  constructor(props) {
    super(props);
    this.state = {
      allNotifications : this.props.allNotifications,
    };
  }


  updateMarkAsread =(notification)=>{
    db.collection("all_notification").doc(notification.doc_id).update({
      "noti_status" : "read"
    })
  }

  onSwipeValueChange = swipeData => {
    var allNotifications = this.state.allNotifications
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
   const newData = [...allNotifications];
       const prevIndex = allNotifications.findIndex(item => item.key === key);
       this.updateMarkAsread(allNotifications[prevIndex]);
         newData.splice(prevIndex, 1);
        this.setState({allNotifications : newData})
   };
};

  renderItem = data => (
    
        <ListItem
          leftElement={<Image source={require('../assets/img.png')} style={{width:90,height:90}}/>}
          title={data.item.item_name}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.message}
          bottomDivider
        />

  );

  renderHiddenItem = () => (
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Text style={styles.backTextWhite}></Text>
          </View>
      </View>
  );

  render(){
    return(
      <View style={styles.container}>
          <SwipeListView
              data={this.state.allNotifications}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
      
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});
