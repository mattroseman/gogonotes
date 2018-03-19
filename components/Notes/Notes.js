import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => {
            return (
              <View style={styles.note}>
                <Text style={styles.noteText}>{item.data}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    backgroundColor: '#E2E2E2',
  },
  note: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',

    borderRadius: 10,

    marginTop: 5,
    marginLeft: 2,
    marginRight: 2,
    padding: 5,
  },
  noteText: {
    fontSize: 20,
  },
});
