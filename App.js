import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import { Permissions } from 'expo';

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

      haveRecordingPermissions: false,
    };

    this.handleAddText = this.handleAddText.bind(this);
    this.handleAddAudio = this.handleAddAudio.bind(this);

    this.handleShowAddText = this.handleShowAddText.bind(this);
    this.handleShowAddAudio = this.handleShowAddAudio.bind(this);

    this.handleCancelAddText = this.handleCancelAddText.bind(this);
    this.handleCancelAddAudio = this.handleCancelAddAudio.bind(this);
  }

  componentDidMount() {
    this.askForPermissions();
  }

  askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    }, () => {
      console.log(response.status);
    });
  };

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
            onAdd={this.handleAddText}
            onCancel={this.handleCancelAddText}
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
            onAdd={this.handleAddAudio}
            onCancel={this.handleCancelAddAudio}
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

  handleAddText(text) {
    // TODO use a unique id for every note, besides getting length
    // what happens when you delete notes?
    var newNote = {
      key: this.state.notes.length,
      type: 'text',
      data: text
    };
    this.setState((prevState) => {
      return {
        notes: prevState.notes.concat([newNote]),
        showAddButton: true,
        showAddTextComponent: false,
      };
    });
  }

  handleAddAudio(audioURI) {
    var newNote = {
      key: this.state.notes.length,
      type: 'audio',
      data: audioURI
    };
    this.setState((prevState) => {
      return {
        notes: prevState.notes.concat([newNote]),
        showAddButton: true,
        showAddAudioComponent: false,
      };
    });
  }

  handleCancelAddText() {
    this.setState({
      showAddButton: true,
      showAddTextComponent: false,
    });
  }

  handleCancelAddAudio() {
    this.setState({
      showAddButton: true,
      showAddAudioComponent: false,
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
