import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';

import NewNote from './components/NewNote/NewNote.js';
import Notes from './components/Notes/Notes';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
        <Notes></Notes>
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
  }
});
