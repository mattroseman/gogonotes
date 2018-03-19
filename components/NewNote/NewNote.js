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

    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write a note"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={styles.addButton}
          onPress={this.handleButtonPress}
          title="Add"
        />
      </View>
    );
  }

  handleButtonPress() {
    this.props.onAddNote(this.state.text);

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
  },
  input: {
    flex: 1,

    fontSize: 20,

    height: 50,
  },
  addButton: {
    flex: 1,
  }
});
