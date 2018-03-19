import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../../colors';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.primaryColorDark,

    paddingTop: 20,
    paddingBottom: 10,

    maxHeight: 60,
    minHeight: 60,
  },
  title: {
    fontSize: 25,

    color: 'white',
  }
});
