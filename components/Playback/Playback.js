import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import { Audio, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../colors';

export default class Playback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    this.handleStartPlaying = this.handleStartPlaying.bind(this);
    this.handleStopPlaying = this.handleStopPlaying.bind(this);
  }

  render() {
    return (
      <TouchableOpacity
        style={this.state.playing ? styles.playbackButtonPlaying : styles.playbackButton}
        onPress={this.state.playing ? this.handleStopPlaying : this.handleStartPlaying}
      >
        <Icon
          name={this.state.playing ? 'md-pause' : 'md-play'}
          style={this.state.playing ? styles.playbackButtonIconPlaying : styles.playbackButtonIcon}
          size={50}
          color={colors.secondaryColor}
        >
        </Icon>
      </TouchableOpacity>
    );
  }

  async handleStartPlaying() {
    this.setState({
      playing: true,
    });

    if (this.sound != null) {
      this.sound.replayAsync();
    } else {
      const { sound, status } = await Audio.Sound.create(
        //  require(this.props.audioURI),
        { uri: this.props.audioURI },
        {
          isLooping: false,
          isMuted: false,
          volume: 1.0,
          rate: 1.0,
          shouldCorrectPitch: true,
        }
      );


      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          this.setState({
            playing: false,
          });
        }
      });

      this.sound = sound;

      this.sound.playAsync();
    }
  }

  handleStopPlaying() {
    this.setState({
      playing: false,
    });

    if (this.sound != null) {
      this.sound.pauseAsync();
    }
  }
}

const styles = StyleSheet.create({
  playbackButton: {
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
  playbackButtonPlaying: {
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
  playbackButtonIcon: {
    marginLeft: 10,
  },
  playbackButtonIconPlaying: {
  },
});
