import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
// import NewNote from './components/NewNote/NewNote';
import Add from './components/Add/Add';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleAddText = this.handleAddText.bind(this);
    this.handleAddAudio = this.handleAddAudio.bind(this);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Header title="GoGoNotes"></Header>
        <Notes notes={this.state.notes}></Notes>
        <Add onAddText={this.handleAddText} onAddAudio={this.handleAddAudio}></Add>
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

  handleAddText() {
    console.log('opening add text component');
  }

  handleAddAudio() {
    console.log('opening add audio component');
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
