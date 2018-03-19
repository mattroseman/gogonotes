import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';

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
        <TextInput
          style={styles.input}
          placeholder="Write a note"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          multiline={true}
          underlineColorAndroid='transparent'
        />
        <Button
          style={styles.addButton}
          onPress={this.handleAddButtonPress}
          title="Add"
        />
        <Button
          style={styles.cancelButton}
          onPress={this.handleCancelButtonPress}
          title="Cancel"
        />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 10,

    maxHeight: 60,
    minHeight: 60,
  },
  input: {
    flex: 1,

    fontSize: 20,

    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 10,

    // padding: 5,

    height: 60,
  },
  addButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  }
});
