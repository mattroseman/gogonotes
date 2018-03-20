import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import NewTextNote from './components/NewTextNote/NewTextNote';
import NewAudioNote from './components/NewAudioNote/NewAudioNote';
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
            // this shouldn't be reached, because keyboard will automatically open with modal
            // and if back is pressed to remove keyboard, modal will close
            this.setState({
              showAddTextComponent: false,
              showAddButton: true,
            });
          }}
        >
          <NewTextNote
            show={this.state.showAddTextComponent}
            onAddNote={this.handleAddNote}
            onCancel={this.handleCancelNote}
          >
          </NewTextNote>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddAudioComponent}
          onRequestClose={() => {
            // this shouldn't be reached, because keyboard will automatically open with modal
            // and if back is pressed to remove keyboard, modal will close
            this.setState({
              showAddAudioComponent: false,
              showAddButton: true,
            });
          }}
        >
          <NewAudioNote
            show={this.state.showAddAudioComponent}
            onAddNote={this.handleAddNote}
            onCancel={this.handleCancelNote}
          >
          </NewAudioNote>
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
    this.setState({
      showAddButton: false,
      showAddAudioComponent: true,
    });
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
  },
});
