/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');

var Swiper = require('react-native-swiper');

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

var JournalMain = React.createClass({
  getInitialState:function(){
    return {
      data:this.props.data,
    }
  },
  render:function(){
    var departure = this.state.data['departure_date'];
    return (
      <ScrollView style={styles.container}>
        <Image 
          source={{uri:this.state.data['background_image']}} 
          style={styles.bannerImage} 
        />
        <View style={styles.itemInner}>
          <Text style={styles.title}>{this.state.data['title']}</Text>
          <Text style={styles.subtitle}>——·{this.state.destinations}·——</Text>
          <Image
            source={{uri: this.state.data['avatar']}}
            style={styles.head}
          />
        </View>
        <Text style={styles.desc}>{this.state.data['intro']}</Text>
        {
          this.state.data['itinerary'].map(function(day,index){
            return <Day data={day} dayNum={index} departure={departure} />
          })
        }
      </ScrollView>
    )
  }
});

var Day = React.createClass({
  getInitialState:function(){
      console.log(this.props);
    return {
      data:this.props.data,
      dayNum:this.props.dayNum,
      departure:this.props.departure,
    }
  },
  render:function(){
    return(
      <View>
        <View style={styles.dayTop}>
          <Text style={[styles.dayTip,styles.fontStrong]}>DAY {this.state.dayNum+1}</Text>
          <Text style={styles.dayTip}>{this.state.departure},{this.state.data['locations'].length}个地点,{this.state.data['city']}</Text>
        </View>
        <View style={styles.dayIntro}>
          <Text style={styles.dayIntroFont}>{this.state.data['desc']}</Text>
        </View>
        {
          this.state.data['locations'].map(function(detail){
            return <JournalCard detail={detail} />
          })
        }
      </View>
    )
  }
});

var JournalCard = React.createClass({
  getInitialState:function(){
    return {
      data:this.props.detail
    }
  },
  render:function(){
     var name = (this.state.data['name'] != "") ? this.state.data['name'] : this.state.data['name_en'];
    return (
      <View>
        <View style={styles.journalCard}>
          <Text style={styles.journalCardTop}>{name}</Text>
        </View>
        <JournalImage imageArray = {this.state.data['comment']['images']}/>
        <Text style={styles.journalCardDesc}>{this.state.data['comment']['desc']}</Text>
      </View>
    );
  }
});

var JournalImage = React.createClass({
  getInitialState:function(){
    return {
      images : this.props.imageArray
    }
  },
  render:function(){
    return (
      <Swiper style={styles.journalWrapper}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
          showsButtons={false} height={(w-16)*0.8} horizontal={true} autoplay={false}>
            {
              this.state.images.map(function(image){
                return (
                  <View>
                      <Image
                        source={{uri: "http://img.chufaba.me/"+image}}
                        style={styles.journalCardImage}
                      />
                  </View>
                )
              })
            }
      </Swiper>
    )
  }
});


var styles = StyleSheet.create({
  outerContainer:{
    flex:1,
  },
  container:{
    backgroundColor:'#f5f5f5',
  },
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
  head:{
    width:32,
    height:32,
    borderRadius:16,
    borderColor: 'rgba( 0, 0, 0, 0.1 )',
    borderWidth: 2,
    marginTop:10,
  },
  journalDesc:{
    padding:16,
  },
  dayTop:{
    height:64,
    borderTopWidth:1,
    borderTopColor:'rgba(0,0,0,0.1)',
    borderBottomWidth:1,
    borderBottomColor:'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    paddingLeft:48,
  },
  dayTip:{
    fontSize:12,
    color:'#3c9',
  },
  fontStrong:{
    fontWeight:'bold',
  },
  dayIntro:{
    padding:16,
    paddingLeft:48,
  },
  dayIntroFont:{
    fontSize:14,
    color:'#666',
  },
  journalCard:{
    borderTopWidth:1,
    borderTopColor:'rgba(0,0,0,0.1)',
    height:64,
    justifyContent: 'center',
    paddingLeft:54,
  },
  journalCardTop:{
    fontSize:14,
    color:"#333",
  },
  journalWrapper:{
    marginLeft:8,
    width:w-16,
    height:(w-16)/5*4,
    borderRadius:4,
  },
  journalCardImage:{
    width:w-16,
    height:(w-16)/5*4,
    borderRadius:4,
  },
  journalCardDesc:{
    padding:16,
    fontSize:14,
    lineHeight:20,
    color:'#666'
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
  },
  image:{
    height:300,
    width:400
  }
});


module.exports = JournalMain;
