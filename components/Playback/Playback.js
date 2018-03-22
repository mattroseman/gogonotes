import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

// import { Audio, FileSystem } from 'expo';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

import colors from '../../colors';

export default class Playback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    this.handleStartPlaying = this.handleStartPlaying.bind(this);
    this.handleStopPlaying = this.handleStopPlaying.bind(this);

    this.styles = StyleSheet.create({
      playbackButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: colors.secondaryColor,
        borderWidth: 2,
        borderRadius: props.size,

        backgroundColor: 'white',

        minHeight: props.size * 2,
        maxHeight: props.size * 2,
        minWidth: props.size * 2,
        maxWidth: props.size * 2,
      },
      playbackButtonPlaying: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: colors.secondaryColor,
        borderWidth: 2,
        borderRadius: props.size,

        backgroundColor: 'white',

        minHeight: props.size * 2,
        maxHeight: props.size * 2,
        minWidth: props.size * 2,
        maxWidth: props.size * 2,
      },
      playbackButtonIcon: {
        marginLeft: props.size / 5,
      },
      playbackButtonIconPlaying: {
      },
    });
  }

  componentDidMount() {
    console.log(RNFS.ExternalDirectoryPath + '/audio_note_0.amr_wb');
    var sound = new Sound(RNFS.ExternalDirectoryPath + '/audio_note_0.amr_wb', (err) => {
      console.error(err);
    });

    this.sound = sound;
  }

  render() {
    return (
      <TouchableOpacity
        style={this.state.playing ? this.styles.playbackButtonPlaying : this.styles.playbackButton}
        onPress={this.state.playing ? this.handleStopPlaying : this.handleStartPlaying}
      >
        <Icon
          name={this.state.playing ? 'md-pause' : 'md-play'}
          style={this.state.playing ? this.styles.playbackButtonIconPlaying : this.styles.playbackButtonIcon}
          size={this.props.size}
          color={colors.secondaryColor}
        >
        </Icon>
      </TouchableOpacity>
    );
  }

  async handleStartPlaying() {

    this.sound.play((success) => {
      if (success) {
        this.setState({
          playing: true,
        });
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });


    // this.sound.play((success) => {
    //   if (!success) {
    //     console.error('playback failed due to audio decoding errors');
    //   }
    // });

    // if (this.sound != null) {
    //   this.sound.play();
    // } else {
    //   var sound = new Sound(this.props.audioURI, '', (err) => {
    //     console.error(err);
    //   });

    //   sound.play((success) => {
    //     if (!success) {
    //       console.error('playback failed due to audio decoding errors');
    //     }
    //   });

    //   this.sound = sound;
    // }


      // const { sound, status } = await Audio.Sound.create(
      //   //  require(this.props.audioURI),
      //   { uri: this.props.audioURI },
      //   {
      //     isLooping: false,
      //     isMuted: false,
      //     volume: 1.0,
      //     rate: 1.0,
      //     shouldCorrectPitch: true,
      //   }
      // );


      // sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      //   if (playbackStatus.didJustFinish) {
      //     this.setState({
      //       playing: false,
      //     });

      //     sound.unloadAsync();
      //   }
      // });

      // this.sound = sound;

      // this.sound.playAsync();
    // }
  }

  handleStopPlaying() {
    this.setState({
      playing: false,
    });

    if (this.sound != null) {
      this.sound.stop();
    }
  }
}
