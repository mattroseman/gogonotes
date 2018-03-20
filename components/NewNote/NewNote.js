import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import colors from '../../colors';

// TODO make this whole thing a popup, and have an add/cancel at the bottom, or click outside to cancel

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.handleCancelButtonPress = this.handleCancelButtonPress.bind(this);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a note"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically={true}
            textAlignVertical='top'
            autoFocus={true}
          />
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

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    backgroundColor: 'white',

    padding: 10,

    maxHeight: 180,
    minHeight: 180,
  },
  input: {
    flex: 1,
    justifyContent: 'flex-start',

    fontSize: 20,
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
