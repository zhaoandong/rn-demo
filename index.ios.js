/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  AlertIOS,
  View,
} = React;

var FirstScreen = require('./FirstScreen');
var itemDetail = require('./itemDetail');

//ES6 test start
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let key of map) {
  console.log(key);
}
//ES6 test end

var chufaba = React.createClass({
  _handleNextButtonPress: function() {
    this.refs.nav.push({
          component: itemDetail,
          title: '登陆',
    });
  },
  render: function() {
    return (
       <NavigatorIOS
       ref = "nav"
        style={styles.container}
        initialRoute={{
          title: '出发吧',
          component: FirstScreen,
          rightButtonTitle: 'Add',
          onRightButtonPress: this._handleNextButtonPress,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

AppRegistry.registerComponent('chufaba', () => chufaba);

