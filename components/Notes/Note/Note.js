import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Playback from '../../Playback/Playback';

import colors from '../../../colors';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
    };

    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);
    this.handleDeletePress = this.handleDeletePress.bind(this);
  }

  render() {
    if (this.props.note.type === 'text') {
      var noteContent = (
        <View style={styles.noteTextContainer}>
          <Text style={styles.noteText}>{this.props.note.value}</Text>
        </View>
      );
    } else {
      var noteContent = (
        <View style={styles.noteAudioContainer}>
          <Playback audioURI={this.props.note.value} size={25}></Playback>
        </View>
      );
    }

    if (this.state.showDelete) {
      var deleteButton = (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={this.handleDeletePress}
        >
          <Icon
            name='md-close'
            style={styles.deleteButtonIcon}
            size={20}
            color='white'
          >
          </Icon>
        </TouchableOpacity>
      );
    } else {
      var deleteButton = null;
    }

    return (
      <TouchableOpacity
        style={styles.note}
        activeOpacity={.6}
        onPress = {() => {
          this.handlePress();
        }}
        onLongPress={() => {
          this.handleLongPress();
        }}
      >
        <View style={styles.noteContentAndDeleteContainer} >
          {deleteButton}
          {noteContent}
        </View>
        <View style={styles.noteDateContainer}>
          <Text style={styles.noteDate}>{this.props.note.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handlePress() {
    this.setState({
      showDelete: false,
    });
  }

  handleLongPress() {
    this.setState({
      showDelete: true,
    });
  }

  handleDeletePress() {
    this.props.onDelete();
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    backgroundColor: colors.primaryColorLight,

    borderRadius: 10,

    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
    padding: 5,
  },

  noteContentAndDeleteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // borderColor: colors.red,
    // borderWidth: 2,
    borderRadius: 18, 

    backgroundColor: colors.red,

    marginRight: 10,

    minHeight: 36,
    maxHeight: 36,
    minWidth: 36,
    maxWidth: 36,
  },
  deleteButtonIcon: {
  },

  noteTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noteText: {
    color: 'white',
    fontSize: 20,
  },

  noteAudioContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  noteDate: {
    color: colors.gray,
    fontSize: 12,
  },
});
