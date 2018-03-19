import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Add extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ActionButton 
          buttonColor="rgba(231,76,60,1)"
          size={80}
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            size={60}
            textContainerStyle={styles.actionButtonTextContainer}
            textStyle={styles.actionButtonText}
            title="Text Note"
            onPress={this.props.onAddText}
          >
            <Icon name="md-create" size={20} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#9b59b6"
            size={60}
            textContainerStyle={styles.actionButtonTextContainer}
            textStyle={styles.actionButtonText}
            title="Audio Note"
            onPress={this.props.onAddAudio}
          >
            <Icon name="md-mic" size={20} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 20,

    height: '100%',
    width: '100%',
  },
  actionButtonIcon: {
    fontSize: 20,
    color: 'white',
  },
  actionButtonTextContainer: {
    height: 30,
  },
  actionButtonText: {
    fontSize: 20,
  }
});
