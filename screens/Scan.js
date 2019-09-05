import React, { Component } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem
} from 'native-base';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class Scan extends Component {
  constructor() {
    super();
    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: ''
    };
  }

  componentDidMount() {
    console.log('bluetooth scanner mounted');

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', data => {
      // let device = 'device found: ' + data.name + '(' + data.id + ')';

      if (this.devices.indexOf(device) == -1) {
        this.devices.push(device);
      }

        console.log(data)
      
    });

    BleManager.start({ showAlert: false }).then(() => {
      console.log('Module initialized');
    });
  }

  startScanning() {
    console.log('start scanning');
    BleManager.scan([], 120);
 }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>GCNext</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem itemHeader first>
              <Text>Available Devices</Text>
            </ListItem>
            <ListItem selected>
              <Left>
                <Text>Macbook Pro</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>iPhone XR</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active onPress={() => this.startScanning()}>
              <Icon active name="ios-bluetooth" />
              <Text>Scan</Text>
            </Button>
            <Button vertical>
              <Icon name="ios-radio" />
              <Text>Connect</Text>
            </Button>
            <Button vertical>
              <Icon name="ios-repeat" />
              <Text>Share</Text>
            </Button>
            <Button vertical>
              <Icon name="ios-sync" />
              <Text>Info</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
