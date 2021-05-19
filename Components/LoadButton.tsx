import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoadButton() {
  const [buttonText, setButtonText] = useState('Download');
  const [pressed, setPressed] = useState(false);
  const buttonHeight2 = useRef(new Animated.Value(height / 12)).current;
  const loadWidth2 = useRef(new Animated.Value(50)).current;

  function shrink() {
    setPressed(!pressed);
    setButtonText('');
    Animated.parallel([
      Animated.spring(buttonHeight2, {
        toValue: height / 20,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function grow() {
    setPressed(!pressed);
    setButtonText('Done!');
    Animated.parallel([
      Animated.spring(buttonHeight2, {
        toValue: height / 12,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const renderButton = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            pressed ? grow() : shrink();
          }}
        >
          <Animated.View
            style={[
              styles.button,
              {
                position: 'absolute',
                zIndex: 1,
                backgroundColor: '#862cc7',
                width: 40,
                height: buttonHeight2,
              },
            ]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.button,
              {
                width: width - 100,
                height: buttonHeight2,
              },
            ]}
          >
            <Text style={styles.text}>{buttonText}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={styles.container}>{renderButton()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99c7cf',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'sans-serif',
  },
});
