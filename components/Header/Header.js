import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../colors';

export default class Notes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftHeaderContainer}></View>
        <View style={styles.centerHeaderContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.rightHeaderContainer}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.props.onSearch}
          >
            <Icon
              name="md-search"
              size={30}
              color="white"
              style={styles.searchButtonIcon}
            >
            </Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.primaryColorDark,

    paddingTop: 20,

    maxHeight: 70,
    minHeight: 70,
  },

  leftHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginLeft: 10,
  },

  centerHeaderContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginRight: 10,
  },

  title: {
    fontSize: 25,

    color: 'white',
  },

  searchButton: {
  },
  searchButtonIcon: {
  }
});
