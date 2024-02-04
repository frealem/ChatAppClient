import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView source={require('../assets/Animation - 1706958378037.json')} loop autoPlay />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  }
});