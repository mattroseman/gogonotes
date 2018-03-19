import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

    paddingTop: 20,

    maxHeight: 50,
    minHeight: 50,
  },
  title: {
    fontSize: 25,
  }
});
