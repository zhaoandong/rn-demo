/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var Swiper = require('react-native-swiper');
var Dimensions = require('Dimensions');

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;



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
  Platform,
  TouchableHighlight,
  ToastAndroid
} = React;


var FirstScreen = React.createClass({
  render:function(){
    return(
        <Tab2 />
    )
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
    return(
      <ScrollView>
        <Swiper style={styles.wrapper}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        showsButtons={false} height={200} horizontal={true} >
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
              <ItemMain data = {e} />
            );
          })}
      </ScrollView>
    )
  }
});
var ItemMain = React.createClass({
  getInitialState:function(){
    return {
      data : this.props.data,
    }
  },
  render:function(){
    if(this.state.data['res_type'] == 3){
      return (
        <JournalItem data={this.state.data} />
      )
    }else if(this.state.data['res_type'] == 2){
      return(
        <RoutesItem data={this.state.data}/>
      )
    }else{
      return(
        <ThemesItem data={this.state.data} />
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
  render : function(){
    return (
      <View style={styles.item}>
            <Image 
              source={{uri:this.state.data['background_image']}} 
              style={styles.itemImage} 
            />

              <View style={styles.itemInner}>
                <Text style={styles.title}>{this.state.data['title']}</Text>
                <Text style={styles.subtitle}>——·{this.state.data['destinations']}·——</Text>
                <Image
                  source={{uri: this.state.data['avatar']}}
                  style={styles.head}
                />
              </View>
      </View>
    );
  }
});


var RoutesItem = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data,
      detail:false,
    }
  },
  showDeatil: function(){
    this.setState({
      detail:true,
    })
  },
  render : function(){
    if(this.state.detail){
      return(
        <ItemDetail data={this.state.data}/>
      )
    }else{
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
  }
});


var ThemesItem = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data
    }
  },
  render : function(){
    console.log(this.state.data);
    return false;
    return (
      <View style={styles.item}>
            <Image 
              source={{uri:this.state.data['background_image']}} 
              style={styles.itemImage} 
            />
              <View style={styles.itemInner}>
                <Text style={styles.title}>{this.state.data['title']}</Text>
                <Text style={styles.subtitle}>——·{this.state.data['highlights']}·——</Text>
              </View>
      </View>
    );
  }
});

var ItemDetail = React.createClass({
  getInitialState: function(){
    console.log(this.props);
    return {
      url: this.props.data.url,
      load: false,
      data: ''
    }
  },
  fetchData: function(){
    var url ='http://chufaba.me'+this.props.data.url+'.json';
    console.log(url);
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
        <RouteMain data={this.state.data} key="route" initData={this.props} />
      );
    }else if(this.props.res_type === 1){
      return(
        <ThemeMain data={this.state.data} key="theme" initData={this.props} />
      );
    }else{
      return(
        <JournalMain data={this.state.data} key="journal" />
      );
    }

    return(
      <View></View>
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

