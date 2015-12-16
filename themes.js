/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');

var Swiper = require('react-native-swiper');

var ParallaxView = require('react-native-parallax-view');


var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
  TabBarIOS,
  ActionSheetIOS,
  TextInput
} = React;

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
var ThemeMain = React.createClass({
  getInitialState:function(){
    console.log(this.props.data);
    return {
      data:this.props.data
    }
  },
  share:function(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://code.facebook.com',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
    });
  },
  render: function(){
    return(
      <ScrollView style={styles.container}>
        <Image 
          source={{uri:this.state.data['image']}} 
          style={styles.bannerImage} 
        />
        <View style={styles.itemInner}>
            <Text style={styles.title}>{this.state.data['title']}</Text>
            <Text style={styles.subtitle}>——·{this.state.data['highlights']}·——</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.desc}>
              {this.state.data['desc']}
            </Text>
            {
              this.state.data['nodes'].map(function(detail){
                return <ThemeCard data={detail} />
              })
            }
            <Like data={this.state.data['likes']}/>
        </View>
        <View style={styles.action}>
          <View style={styles.actionLi}>
            <Image 
              source={{uri:'http://img.chufaba.me//web_assets/activities/simple/test.png'}}
              style={styles.fixedIcon}  
            />
            <Text style={styles.actionLiFont}>赞</Text>
          </View>
          <View style={styles.actionLi}>
            <Image 
              source={{uri:'http://img.chufaba.me//web_assets/activities/simple/test.png'}}
              style={styles.fixedIcon}  
            />
            <Text style={styles.actionLiFont}>评论</Text>
          </View>
          <TouchableHighlight onPress={this.share} style={styles.actionLi}>
            <View style={styles.actionLi} >
              <Image 
                source={{uri:'http://img.chufaba.me//web_assets/activities/simple/test.png'}}
                style={styles.fixedIcon}  
              />
              <Text style={styles.actionLiFont}>分享</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
});

var ThemeCard = React.createClass({
  getInitialState:function(){
    return{
      data:this.props.data
    }
  },
  render:function(){
    return (
      <View style={styles.themeCard}>
        <View style={styles.cardTop}>
          <Image 
            source={{uri:this.state.data['images'][0]}} 
            style={styles.cardIcon} 
          />
          <View style={styles.cardTips}>
            <Text style={styles.cardTipsB}>{this.state.data['name']}</Text>
            <Text style={styles.cardTipsS}>{this.state.data['city']},{this.state.data['country']}</Text>
          </View>
        </View>
        <Image 
          source={{uri:this.state.data['images'][0]}} 
          style={styles.cardImage} 
        />
        <Text style={styles.cardNote}>{this.state.data['note']}</Text>
      </View>
    )
  }

});

var Like = React.createClass({
  getInitialState:function(){
    return{
      data:this.props.data
    }
  },
  render:function(){
    return(
      <View style={styles.likeContainer}>
        <Text style={styles.likeTitle}>赞</Text>
        <View style={styles.likeMain}>
          {
            this.state.data.map(function(item){
              return (  
                <Image 
                  source={{uri:item['avatar']}}
                  style={styles.likeAvatar}  
                />
              )
            })
          }
        </View>
      </View>
    )
  }
});

// var Comment = React.createClass({
//   getInitialState:function(){
//     return {
//       data:this.props.data
//     }
//   },
//   render:function(){
//     return(
//       <View style={styles.commentContainer}>
//         <Text style={styles.commentTitle}>评论</Text>
//           <TextInput
//             style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//           />
//       </View>
//     )
//   }
// });

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
  outter:{
    height:h,
    paddingBottom:48,
    marginBottom:40,
  },
  container:{
    backgroundColor:'#f5f5f5',
    flex:1,
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
  themeCard:{
    margin:8,
    paddingTop:16,
    borderTopWidth:1,
    borderTopColor:'rgba(0,0,0,0.1)',
  },
  cardTop:{
    flexDirection:'row',
  },
  cardIcon:{
    width:40,
    height:40,
    borderRadius:4,
  },
  cardTips:{
    marginLeft:16,
  },
  cardTipsB:{
    fontSize:16,
    color:'#333',
    lineHeight:20,
  },
  cardTipsS:{
    fontSize:12,
    color:'#999',
  },
  cardImage:{
    width:w-16,
    height:(w-16)/5*4,
    marginTop:16,
    borderRadius:4,
  },
  cardNote:{
    padding:16,
    fontSize:14,
    color:'#666',
    lineHeight:20,
    backgroundColor:'white',
    borderRadius:4,
    borderColor:'#efefef',
    borderWidth:1,
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
  image:{
    height:300,
    width:400
  },
  likeContainer:{
    marginLeft:8,
    width:w-16,
    backgroundColor:'white',
    paddingBottom:24,
  },
  likeTitle:{
    fontSize:14,
    color:'#999',
    height:48,
    lineHeight:24,
    paddingLeft:8,
    alignItems: 'center',
  },
  likeMain:{
    flex:1,
    flexDirection:'row',
  },
  likeAvatar:{
    width:32,
    height:32,
    borderRadius:16,
    marginLeft:8,
  },
  action:{
    position:'absolute',
    top:h-48,
    left:0,
    height:48,
    width:w,
    flexDirection:'row',
  },
  actionLi:{
    height:48,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  actionLiFont:{
    color:'#3c9',
    marginLeft:8,
  },
  fixedIcon:{
    width:18,
    height:18
  },
  commentContainer:{
    marginLeft:8,
    width:w-16,
    backgroundColor:'white',
    marginTop:16,
  },
  commentTitle:{
    fontSize:14,
    color:'#999',
    height:48,
    lineHeight:24,
    paddingLeft:8,
    alignItems: 'center',
  },
});

module.exports = ThemeMain;