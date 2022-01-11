import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Color from '../theme/Color';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={Color.white} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Color.primary,
  },
});

export default PlayButton;
