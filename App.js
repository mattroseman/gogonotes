import React from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Notes from './components/Notes/Notes';
import NewTextNote from './components/NewTextNote/NewTextNote';
import NewAudioNote from './components/NewAudioNote/NewAudioNote';
import Add from './components/Add/Add';

import colors from './colors';

const database = SQLite.openDatabase({name: 'gogonotes.db', location: 'default'});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchNotes: [],

      showHeader: true,
      showSearchBar: false,
      showSearch: false,
      showAddButton: true,
      showAddTextComponent: false,
      showAddAudioComponent: false,
    };

    this.handleSearch = this.handleSearch.bind(this);

    this.handleAddText = this.handleAddText.bind(this);
    this.handleAddAudio = this.handleAddAudio.bind(this);

    this.handleShowSearch = this.handleShowSearch.bind(this);
    this.handleShowAddText = this.handleShowAddText.bind(this);
    this.handleShowAddAudio = this.handleShowAddAudio.bind(this);

    this.handleCancelSearch = this.handleCancelSearch.bind(this);
    this.handleCancelAddText = this.handleCancelAddText.bind(this);
    this.handleCancelAddAudio = this.handleCancelAddAudio.bind(this);

    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  componentDidMount() {
    this.initializeDatabase();
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
        'select * from notes;',
        [],
        (_, { rows }) => {
          this.setState({
            notes: rows._array.map((row) => {
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
    }, (err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Header title="GoGoNotes" onSearch={this.handleShowSearch}></Header>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showSearchBar}
          onRequestClose={this.handleCancelSearch}
        >
          <SearchBar
            show={this.state.showSearchBar}
            onCancel={this.handleCancelSearch}
            onSearch={this.handleSearch}
          >
          </SearchBar>
        </Modal>

        <Notes
          notes={this.state.showSearch ? this.state.searchNotes : this.state.notes}
          onDelete={this.handleDeleteNote}
        >
        </Notes>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddTextComponent}
          onRequestClose={this.handleCancelAddText}
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
          onRequestClose={this.handleCancelAddAudio}
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

    // TODO analyze the audio and get candidate words
    // Add these words to the database

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

  handleSearch(searchText) {
    searchNotes = this.state.notes.filter((note) => {
      if (note.type === 'text') {
        return note.value.toLowerCase().search(searchText.toLowerCase()) >= 0;
      } else {
        return false;
      }
    });

    this.setState({
      showSearch: true,
      searchNotes: searchNotes
    });
  }

  handleDeleteNote(note) {
    database.transaction(tx => {
      tx.executeSql(
        'delete from notes where id = ?;',
        [note.key],
        () => {
          this.setState(prevState => {
            newNotes = prevState.notes.filter((oldNote) => {
              return oldNote.key != note.key;
            });

            return {
              notes: newNotes
            };
          });
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  handleCancelSearch() {
    this.setState({
      showSearchBar: false,
      showSearch: false,
      showHeader: true,
      showAddButton: true,
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

  handleShowSearch() {
    this.setState({
      showSearchBar: true,
      showHeader: false,
      showAddButton: false,
    });
  }

  handleShowAddText() {
    this.setState({
      showAddButton: false,
      showAddTextComponent: true,
    });
  }

  handleShowAddAudio() {
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
