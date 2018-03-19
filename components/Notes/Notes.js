import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => <Text style={styles.note}>{item.data}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 6,
  },
  note: {
    fontSize: 20,
  },
});
