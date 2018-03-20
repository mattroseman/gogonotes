import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
// import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../colors';

export default class NewAudioNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      recording: false,
    };

    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.handleCancelButtonPress = this.handleCancelButtonPress.bind(this);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.recorderContainer}>
          <TouchableOpacity
            style={this.state.recording ? styles.recordButtonRecording : styles.recordButton}
            onPress={() => {
              console.log('test');
              this.setState(prevState => {
                return { recording: !prevState.recording };
              });
            }}
          >
            <Icon
              name="md-mic"
              style={styles.recordButtonIcon}
              size={50}
              color={this.state.recording ? 'white' : colors.secondaryColor}
            >
            </Icon>
          </TouchableOpacity>
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
    );
  }

  handleAddButtonPress() {
    this.props.onAddNote(this.state.text);

    // TODO do I need to do this, it should reset when adding again
    this.setState({
      text: ''
    });
  }

  handleCancelButtonPress() {
    this.props.onCancel();

    // TODO do I need to do this, it should reset when adding again
    this.setState({
      text: ''
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    margin: 10,
    marginTop: 50,

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

    borderColor: colors.primaryColorDark,
    borderWidth: 1.5,
    borderRadius: 50,

    backgroundColor: colors.red,

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