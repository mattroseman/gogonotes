import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write a note"
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',

    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,

    fontSize: 20,
    height: 60,
  }
});
