/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Tabs = require('react-native-tabs');
var Swiper = require('react-native-swiper');
var Dimensions = require('Dimensions');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image,
  TextInput,
  ScrollView,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  WebView,
  SliderIOS,
  DatePickerIOS,
  MapView,
  TouchableNativeFeedback,
} = React;

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;


var Tab3 = React.createClass({
  getInitialState() {
    return {

    };
  },
  render : function(){
    return(
      <ScrollView style={styles.outter}>
        <ScrollView style={styles.container}>
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/p1_a.png'}}
            style={styles.image} >
              <Text>dasjhdjksahdjkhsajkhdjksahdjkh</Text>
               <Text>dasjhdjksahdjkhsajkhdjksahdjkh</Text>
                <Text>dasjhdjksahdjkhsajkhdjksahdjkh</Text>
                 <Text>dasjhdjksahdjkhsajkhdjksahdjkh</Text>
                  <Text>dasjhdjksahdjkhsajkhdjksahdjkh</Text>
          </Image>
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/meng.png'}}
            style={styles.image}
          />
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/p2_a.png'}}
            style={styles.image}
          />
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/meng.png'}}
            style={styles.image}
          />
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/p3_a.png'}}
            style={styles.image}
          />
          <Image
            source={{uri: 'http://img.chufaba.me/web_assets/activities/sale/meng.png'}}
            style={styles.image}
          />
        </ScrollView>
        <View>
            <Text>ahsfkjhdsfjkhddfjkhjfdhsjf</Text>
        </View>
      </ScrollView>

    );
  }
});

var ListImage = React.createClass({
  render:function(){
    return(
      <View>

      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    position:'absolute',
    left:0,
    top:0,
    width:w,
  },
  image:{
    width:w,
    height:w/750*1206,
  },
  outter:{
    width:w,
    position:'relative',
    // backgroundColor:'red',
    height:9000,

  },
  bg:{
    backgroundColor:'rgba(0,0,0,0.2)',
    width:w,
    height:w/750*1206,
  }
});

module.exports = Tab3;