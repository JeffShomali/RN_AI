import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState,
  Dimensions
} from 'react-native';
import BleManager from 'react-native-ble-manager';

export default class App extends Component {

  render() {  
    return (
      <View>
          <Text>Scan Bluetooth </Text>
      </View>
    );
  }
}
