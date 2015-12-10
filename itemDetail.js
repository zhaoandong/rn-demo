/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');

var Swiper = require('react-native-swiper');

var ParallaxView = require('react-native-parallax-view');

var Themes = require('./themes');
var Journals = require('./journals');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
} = React;

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

var itemDetail = React.createClass({
  getInitialState: function(){
    return {
      url: this.props.url,
      load: false,
      data: ''
    }
  },
  fetchData: function(){
    var url ='http://chufaba.me'+this.props.url+'.json';
    fetch(url)
      .then((response) => response.json())
      .then((responseText) => {
        this.setState({
          data: responseText,
          load:true
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  },
  render : function(){
    if(!this.state.load){
      this.fetchData();
      return <Loading />
    }
    if(this.props.res_type === 2){
      return(
        <Themes data={this.state.data} key="route" initData={this.props} />
      );
    }else if(this.props.res_type === 1){
      return(
        <Routes data={this.state.data} key="theme" initData={this.props} />
      );
    }else{
      return(
        <Journals data={this.state.data} key="journal" />
      );
    }

    return(
      <View></View>
    )
  }
});


var Routes = React.createClass({
  getInitialState:function(){
    return {
      data:this.props.data
    }
  },
  render:function(){
    return (
      <View>
        <Text>adksjkd</Text>
        <Text>adksjkd</Text>
        <Text>adksjkd</Text>
        <Text>adksjkd</Text>
        <Text>adksjkd</Text>
        <Text>adksjkd</Text>
      </View>
    )
  }
});



var Loading = React.createClass({
  render:function(){
    return(
      <View>
        <Image 
          source={{uri:'http://img.chufaba.me/web_assets/activities/hot/loading.gif'}}  
        />
      </View>
    )
  }
});


var styles = StyleSheet.create({
	bannerImage:{
    height:w*0.8,
    width:w
  },
  bannerBack:{
    height:w*0.8,
    width:w,
    backgroundColor:'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    left : 0,
    top : 0,
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
  desc:{
    padding:16,
    fontSize:14,
    lineHeight:23,
    color:'#666',
  },

  itemInner:{
    backgroundColor:'rgba(0,0,0,0)',
    height:(w)/5*4,
    backgroundColor:'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    width:w,
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
});

module.exports = itemDetail;