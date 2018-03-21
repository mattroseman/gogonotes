import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import colors from '../../colors';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => {
          console.log('test');
          this.props.onCancel();
        }}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="search for a note"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically={true}
            autoFocus={true}
          >
          </TextInput>
        </View>
      </TouchableWithoutFeedback>
    );
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  input: {
    flex: 1,

    backgroundColor: 'white',

    borderRadius: 100,

    minHeight: 40,
    maxHeight: 40,

    paddingLeft: 10,
    paddingRight: 10,

    fontSize: 20,
  }
});
