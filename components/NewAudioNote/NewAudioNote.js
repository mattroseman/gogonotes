import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text
} from 'react-native';

import { Audio } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import Playback from '../Playback/Playback';

import colors from '../../colors';

export default class NewAudioNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioURI: null,
      recording: false,
      showPlayback: false,
      playing: false,
    };

    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.handleCancelButtonPress = this.handleCancelButtonPress.bind(this);

    this.handleStartRecording = this.handleStartRecording.bind(this);
    this.handleStopRecording = this.handleStopRecording.bind(this);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    if (this.state.showPlayback) {
      var recorderContainer = (<Playback audioURI={this.state.audioURI} size={50}></Playback>);
    } else {
      var recorderContainer = (
        <TouchableHighlight
          style={this.state.recording ? styles.recordButtonRecording : styles.recordButton}
          activeOpacity={.7}
          underlayColor={colors.red}
          onPressIn={this.handleStartRecording}
          onPressOut={this.handleStopRecording}
        >
          <Icon
            name="md-mic"
            style={styles.recordButtonIcon}
            size={50}
            color={this.state.recording ? 'white' : colors.secondaryColor}
          >
          </Icon>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={this.handleCancelButtonPress}
      >
        <View style={styles.modalContainer}>
          <View style={styles.recorderContainer}>
            {recorderContainer}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.handleCancelButtonPress}
              color={colors.secondaryColor}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handleAddButtonPress}
              color={colors.secondaryColor}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  handleAddButtonPress() {
    if (this.state.audioURI != null) {
      this.props.onAdd(this.state.audioURI);
    } else {
      this.props.onCancel();
    }
  }

  handleCancelButtonPress() {
    this.props.onCancel();
  }

  async handleStartRecording() {
    this.setState({
      recording: true,
    });

    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
    } catch (err) {
      console.error(err);
    }

    this.recording = recording;
  }

  async handleStopRecording() {
    this.setState({
      recording: false,
      showPlayback: true,
    });

    try {
      await this.recording.stopAndUnloadAsync();
    } catch (err) {
      console.error(err);
    }

    this.setState({
      audioURI: this.recording.getURI()
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    padding: 10,
    paddingTop: 50,

    minHeight: 220,
  },

  recorderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    backgroundColor: 'white',

    padding: 10,

    maxHeight: 180,
    minHeight: 180,
  },

  recordButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: colors.secondaryColor,
    borderWidth: 2,
    borderRadius: 50,

    backgroundColor: 'white',

    minHeight: 100,
    maxHeight: 100,
    minWidth: 100,
    maxWidth: 100,
  },
  recordButtonRecording: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: colors.red,
    borderWidth: 1.5,
    borderRadius: 50,

    backgroundColor: 'white',

    minHeight: 100,
    maxHeight: 100,
    minWidth: 100,
    maxWidth: 100,
  },
  recordButtonIcon: {
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',

    backgroundColor: '#EAEAEA',

    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    maxHeight: 40,
    minHeight: 40,
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: .5,
    //borderTopWidth: 1,

    backgroundColor: '#EAEAEA',

    marginRight: 8,

    width: 20,
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRightWidth: .5,
    //borderTopWidth: 1,

    backgroundColor: '#EAEAEA',

    marginLeft: 8,

    width: 20,
  },
  buttonText: {
    fontSize: 20,
  }
});
