import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import colors from '../../colors';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => {
            if (item.type === 'text') {
              return (
                <View style={styles.note}>
                  <Text style={styles.noteText}>{item.data}</Text>
                </View>
              );
            } else if (item.type === 'audio') {
              // TODO show a playback button instead of URI
              return (
                <View style={styles.note}>
                  <Text style={styles.noteText}>{item.data}</Text>
                </View>
              );
            }
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

    backgroundColor: colors.primaryColor,
  },
  note: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.primaryColorLight,

    borderRadius: 10,

    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
    padding: 5,
  },
  noteText: {
    color: 'white',
    fontSize: 20,
  },
});
