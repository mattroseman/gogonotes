import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import NewNote from './components/NewNote/NewNote';
import Add from './components/Add/Add';

import colors from './colors';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      showAddButton: true,
      showAddTextComponent: false,
      showAddAudioComponent: false,
    };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleShowAddText = this.handleShowAddText.bind(this);
    this.handleShowAddAudio = this.handleShowAddAudio.bind(this);
    this.handleCancelNote = this.handleCancelNote.bind(this);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Header title="GoGoNotes"></Header>
        <Notes notes={this.state.notes}></Notes>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddTextComponent}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
          <NewNote
            show={this.state.showAddTextComponent}
            onAddNote={this.handleAddNote}
            onCancel={this.handleCancelNote}
          >
          </NewNote>
        </Modal>
        <Add
          show={this.state.showAddButton}
          onAddText={this.handleShowAddText}
          onAddAudio={this.handleShowAddAudio}
        >
        </Add>
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
      return {
        notes: prevState.notes.concat([newNote]),
        showAddButton: true,
        showAddTextComponent: false,
      };
    });
  }

  handleCancelNote() {
    this.setState({
      showAddButton: true,
      showAddTextComponent: false,
    });
  }

  handleShowAddText() {
    console.log('opening add text component');
    // TODO hide Add component
    // TODO show component for adding text
    this.setState({
      showAddButton: false,
      showAddTextComponent: true,
    });
    // TODO bring up keyboard
  }

  handleShowAddAudio() {
    console.log('opening add audio component');
    // TODO hide Add component
    // TODO show component for adding audio
    // this.setState({
    //   showAddButton: false,
    //   showAddAudioComponent: true,
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    backgroundColor: colors.primaryColor,
  },
  header: {
    flex: 1,
  }
});
