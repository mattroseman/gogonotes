import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import NewNote from './components/NewNote/NewNote.js';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
        <NewNote></NewNote>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
  },
});
