import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Chatting</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical:20,
    borderRadius: 5,
    marginVertical:20,
  },
  logoText: {
    color: '#ddd',
    fontSize: 34,
    fontWeight: 900,
    
  },
  placeholder:{
    fontSize:18,
    color:"white"
  }
});

export default Logo;