import React from 'react';
import { 
  StyleSheet,
  View,
  TextInput,
  Alert,
  Button
} from 'react-native';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.onAddNote = this.onAddNote.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write a note"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          style={styles.addButton}
          onPress={this.onAddNote}
          title="Add"
        />
      </View>
    );
  }

  onAddNote() {
    Alert.alert(`You added a new note: ${this.state.text}`);
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
