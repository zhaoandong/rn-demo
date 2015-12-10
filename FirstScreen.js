/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Tabs = require('react-native-tabs');
var Swiper = require('react-native-swiper');
var Dimensions = require('Dimensions');
var itemDetail = require('./itemDetail');
var Tab3 = require('./tab3');

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
  PickerIOS,
  Platform
} = React;

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

var FirstScreen = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'redTab', 
      notifCount: 0,
      presses: 0,
    };
  },
  _renderContent: function(page: page) {
    if(page=="pageone"){
      return (
        <View>
          <Tab1 />
        </View>
      );
    }else if(page=="pagetwo"){
      return (
        <ScrollView>
          <Tab2 navigator={this.props.navigator} />
        </ScrollView>
      );
    }else if(page=="pagethree"){
      return (
        <ScrollView>
          <Tab3 />
        </ScrollView>
      );
    }
  },
  render: function() {
    var self =this;
    if (Platform.OS === 'android') {
      return(
        <View><Text>12321321312</Text></View>
      );
    }else{
      return (
        <View style={styles.container}>
          <TabBarIOS>
            <TabBarIOS.Item
              title="webView测试"
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}>
              {this._renderContent('pageone')}
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon="history"
              badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                  notifCount: this.state.notifCount + 1,
                });
              }}>
              {this._renderContent('pagetwo')}
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon="more"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                  presses: this.state.presses + 1
                });
              }}>
              {this._renderContent('pagethree')}
            </TabBarIOS.Item>
          </TabBarIOS>
        </View>
      );
    }
  }
});

var Tab1 = React.createClass({
  render : function(){
    return(
      <View style={styles.tab1}>
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url='http://chufaba.me'
          javaScriptEnabledAndroid={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
});



var Tab2 = React.createClass({
  getInitialState: function() {
    this.fetchData();
    return {
      data: []
    };
  },
  fetchData : function(){
    var url ='http://chufaba.me/journals/discoveryMore.json';
    fetch(url)
      .then((response) => response.json())
      .then((responseText) => {
        this.setState({
          data: responseText
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  },
  render : function(){
    var navigator = this.props.navigator;
    return(
      <View>
        <Swiper style={styles.wrapper}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        showsButtons={false} height={200} horizontal={true} autoplay={true}>
          <View>
              <Image
                source={{uri: 'http://img.chufaba.me/web_assets/posts/bg.jpg'}}
                style={styles.image}
              />
          </View>
          <View>
              <Image
                source={{uri: 'http://img.chufaba.me/web_assets/posts/bg2.jpg'}}
                style={styles.image}
              />
          </View>
          <View>
              <Image
                source={{uri: 'http://img.chufaba.me/web_assets/posts/bg3.jpg'}}
                style={styles.image}
              />
          </View>
        </Swiper>
        {
          this.state.data.map(function(e){
            return(
              <ItemMain data = {e} name={navigator}/>
            );
          })}
      </View>
    )
  }
});
var ItemMain = React.createClass({
  getInitialState:function(){

    return {
      data : this.props.data,
      navigator : this.props.name
    }
  },
  render:function(){
    if(this.state.data['res_type'] === 3){
      return (
        <JournalItem data={this.state.data} navigator={this.state.navigator}/>
      )
    }else if(this.state.data['res_type'] === 2){
      return(
        <RoutesItem data={this.state.data}  navigator={this.state.navigator}/>
      )
    }else{
      return(
        <ThemesItem data={this.state.data}  navigator={this.state.navigator}/>
      )
    }
  }
});


var JournalItem = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data
    }
  },
  showDeatil: function(){
    this.props.navigator.push({
      component: itemDetail,
      title: this.state.data['title'],
      passProps: this.state.data
    });
  },
  render : function(){
    return (
      <View style={styles.item}>
            <Image 
              source={{uri:this.state.data['background_image']}} 
              style={styles.itemImage} 
            />
            <TouchableHighlight onPress={this.showDeatil} style={styles.itemInner}>
              <View style={styles.itemInner}>
                <Text style={styles.title}>{this.state.data['title']}</Text>
                <Text style={styles.subtitle}>——·{this.state.data['destinations']}·——</Text>
                <Image
                  source={{uri: this.state.data['avatar']}}
                  style={styles.head}
                />
              </View>
            </TouchableHighlight>
      </View>
    );
  }
});


var RoutesItem = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data
    }
  },
  showDeatil: function(){
    this.props.navigator.push({
      component: itemDetail,
      title: this.state.data['title'],
      passProps: this.state.data
    });
  },
  render : function(){
    return (
      <View style={styles.item}>
            <Image 
              source={{uri:this.state.data['image']}} 
              style={styles.itemImage} 
            />
            <TouchableHighlight onPress={this.showDeatil} style={styles.itemInner}>
              <View style={styles.itemInner}>
                <Text style={styles.title}>{this.state.data['title']}</Text>
                <Text style={styles.subtitle}>——·{this.state.data['highlights']}·——</Text>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
});


var ThemesItem = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data
    }
  },
  showDeatil: function(){
    this.props.navigator.push({
      component: itemDetail,
      title: this.state.data['title'],
      passProps: this.state.data
    });
  },
  render : function(){
    return (
      <View style={styles.item}>
            <Image 
              source={{uri:this.state.data['background_image']}} 
              style={styles.itemImage} 
            />
            <TouchableHighlight onPress={this.showDeatil} style={styles.itemInner}>
              <View style={styles.itemInner}>
                <Text style={styles.title}>{this.state.data['title']}</Text>
                <Text style={styles.subtitle}>——·{this.state.data['highlights']}·——</Text>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab:{
    flex:1,
    height:200,
    fontSize:14,
    backgroundColor:'rgba(10,20,30,1)',
    position:'absolute',
    left:0,
    top:0,
  },
  tab_font_active:{
    color:"rgba(255,255,255,1)",
  },
  tab_font:{
    color:"rgba(255,255,255,0.6)",
  },
  image:{
    width:w,
    height:w/16*9,
  },
  wrapper: {
    flex:1,
  },
  item:{
    marginTop:8,
    marginLeft:8,
    marginRight:8,
  },
  itemImage:{
    height:w/16*9,
    borderRadius:4,
    width:w-16
  },
  itemInner:{
    backgroundColor:'rgba(0,0,0,0)',
    height:w/16*9,
    backgroundColor:'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    width:w-16,
    position:'absolute',
    left : 0,
    top : 0,
    borderRadius:4,
  },
  title:{
    fontSize:24,
    color:"rgba(255,255,255,1)",
    textAlign:'center',
    shadowColor:'#000',
    shadowOpacity:1,
  },
  subtitle:{
    fontSize:12,
    color:"rgba(255,255,255,1)",
    textAlign:'center',
    marginTop:8,
  },
  head:{
    width:32,
    height:32,
    borderRadius:16,
    borderColor: 'rgba( 0, 0, 0, 0.1 )',
    borderWidth: 2,
    marginTop:10,
  },
  tab1:{
    paddingTop:70,
    
  },
  webView:{
    height:h-70,
    width:w,
  },
  initHeight:{
    height:w,
    width:h-70,
    backgroundColor: '#eeeeee',
  }
});

module.exports = FirstScreen;
