import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import { Permissions, SQLite } from 'expo';

import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import NewTextNote from './components/NewTextNote/NewTextNote';
import NewAudioNote from './components/NewAudioNote/NewAudioNote';
import Add from './components/Add/Add';

import colors from './colors';

const database = SQLite.openDatabase('gogonotes.db');

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
    this.initializeDatabase();
  }

  async askForPermissions() {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  }

  initializeDatabase() {
    // Create notes table
    // id: unique integer identifier for each note
    // type: either 'text' or 'audio' specifying the data type
    // value: if type is 'text' then value is the actual text, if type is 'audio' then a URI to the audio file
    // date: a string indicating when this note was created
    database.transaction(tx => {
      tx.executeSql(
        'create table if not exists notes (id integer primary key not null, type text not null, value text not null, date text not null);'
      );

      tx.executeSql(
        'select from notes;',
        [],
        (_, { rows }) => {
          // TODO load the data when app starts up
          console.log('test');
          console.log(JSON.stringify(rows));
          this.setState({
            notes: rows.array.map((row) => {
              return {
                key: row.id,
                type: row.type,
                value: row.value,
                date: row.date
              };
            })
          });
        }
      );
    });
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

  getDateTimeString() {
    today = new Date();
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
  }


  handleAddText(text) {
    var date = this.getDateTimeString();

    database.transaction(tx => {
      tx.executeSql(
        `insert into notes (type, value, date) values ('text', ?, ?);`,
        [text, date]
      );

      tx.executeSql(
        `select max(id) as id from notes;`,
        [],
        (_, { rows }) => {
          id = rows.item(0).id;

          var newNote = {
            key: id,
            type: 'text',
            value: text,
            date: date
          };

          this.setState((prevState) => {
            return {
              notes: prevState.notes.concat([newNote]),
              showAddButton: true,
              showAddTextComponent: false,
            };
          });
        }
      );
    }, (err) => {
      console.error(err);
    });
  }

  handleAddAudio(audioURI) {
    var date = this.getDateTimeString();

    database.transaction(tx => {
      tx.executeSql(
        `insert into notes (type, value, date) values ('audio', ?, ?);`,
        [audioURI, date]
      );

      tx.executeSql(
        `select max(id) as id from notes;`,
        [],
        (_, { rows }) => {
          id = rows.item(0).id;

          var newNote = {
            key: id,
            type: 'audio',
            value: audioURI,
            date: date
          };

          this.setState((prevState) => {
            return {
              notes: prevState.notes.concat([newNote]),
              showAddButton: true,
              showAddAudioComponent: false,
            };
          });
        }
      );
    }, (err) => {
      console.error(err);
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
    this.setState({
      showAddButton: false,
      showAddTextComponent: true,
    });
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
