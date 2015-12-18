/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Navigator
} = React;

var chufaba = React.createClass({
  configureScene(route){
    return Navigator.SceneConfigs.FadeAndroid;
  },
  turn: function(){
    console.log("111");
  },
  renderScene(router, navigator){
    var Component = null;this._navigator = navigator;
    switch(router.name){
      case "P1":
        Component = P1;
        break;
      case "P2":
        Component = P2;
        break;
      default:
        Component = P3;
    }

    return <Component navigator={navigator} />
  },
  render: function() {
    return (
        <Navigator
          initialRoute={{name: 'P1'}}
          configureScene={this.configureScene}
          renderScene={this.renderScene} />
    );
  }
});

var P1 = React.createClass({
  turn: function(){
    this.props.navigator.push({name: 'P2'});
  },
  render: function(){
    return (
      <View>
        <Text onPress={this.turn}>
          p1
        </Text>
      </View>
    )
  }
});

var P2 = React.createClass({
  turn: function(){
    this.props.navigator.push({name: 'P3'});
  },
  render: function(){
    return (
      <View>
        <Text onPress={this.turn}>p2</Text>
      </View>
    )
  }
});

var P3 = React.createClass({
  turn: function(){
    this.props.navigator.push({name: 'P4'});
  },
  render: function(){
    return (
      <View>
        <Text onPress={this.turn}>p3</Text>
      </View>
    )
  }
});

var P4 = React.createClass({
  render: function(){
    return (
      <View>
        <Text>p4</Text>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('chufaba', () => chufaba);
