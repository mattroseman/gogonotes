import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert
} from 'react-native';

import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import NewNote from './components/NewNote/NewNote.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };

    this.handleAddNote = this.handleAddNote.bind(this);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Header title="GoGoNotes"></Header>
        <Notes notes={this.state.notes}></Notes>
        <NewNote onAddNote={this.handleAddNote}></NewNote>
      </KeyboardAvoidingView>
    );
  }

  handleAddNote(note) {
    // TODO use a unique id for every note, besides getting length
    // what happens when you delete notes?
    var newNote = {
      key: this.state.notes.length,
      data: note
    };
    this.setState((prevState) => {
      return { notes: prevState.notes.concat([newNote]) };
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
  }
});
