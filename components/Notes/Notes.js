import React from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

import Note from './Note/Note';

import colors from '../../colors';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => {
            return (
              <Note
                note={item}
                onDelete={() => {
                  this.props.onDelete(item);
                }}
              >
              </Note>
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

    backgroundColor: colors.primaryColor,
  },
});
