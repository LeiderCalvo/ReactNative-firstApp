import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link} from "react-router-native";
import { observer } from 'mobx-react/native';

import store from '../../stores/store';


@observer export default class DocsList extends React.Component {
  render() {
    return (
        <View style={{margin: 30}}>
            {store.docs.list.map(doc => <Link
            key={doc.id}
            to={`/doc/${doc.id}`}>
                <Text>{doc.name}</Text>
            </Link>)}
        </View>
    );
  }
}