import React, { Component } from "react";
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
  ListItem,
} from "native-base";
export default class AnatomyExample extends Component {
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
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem itemHeader first>
              <Text>Available Devices</Text>
            </ListItem>
            <ListItem>
              <Text>MackBook Pro</Text>
            </ListItem>
            <ListItem>
              <Text>iPhone XR</Text>
            </ListItem>
            <ListItem>
              <Text>iPad</Text>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon active name="apps" />
              <Text>Scan</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Connect</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Share</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Info</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
