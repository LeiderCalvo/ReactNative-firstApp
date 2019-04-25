import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from "react-router-native";
import DocsList from './src/components/DocsList/DocsList';
import DocView from './src/components/DocView/DocView';


export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={DocsList} />
        <Route path="/doc/:id" component={DocView} />
      </NativeRouter>
    );
  }
}