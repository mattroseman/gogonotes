import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';

import Playback from '../Playback/Playback';

import colors from '../../colors';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false
    };

    this.handleLongPress = this.handleLongPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => {
            if (item.type === 'text') {
              var noteContent = (
                <View style={styles.noteTextContainer}>
                  <Text style={styles.noteText}>{item.value}</Text>
                </View>
              );
            } else {
              var noteContent = (
                <View style={styles.noteAudioContainer}>
                  <Playback audioURI={item.value} size={25}></Playback>
                </View>
              );
            }

            return (
              <TouchableOpacity
                style={styles.note}
                activeOpacity={.6}
                onLongPress={() => {
                  this.handleLongPress();
                }}
              >
                {noteContent}
                <View style={styles.noteDateContainer}>
                  <Text style={styles.noteDate}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  handleLongPress() {
    this.setState({
      showDelete: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    backgroundColor: colors.primaryColor,
  },
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
