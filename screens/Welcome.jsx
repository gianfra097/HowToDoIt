import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>BENVENUTO IN</Text>
      <Text style={styles.text2}>
        <Text style={{ color: 'black' }}>HOW TO </Text>
        <Text style={{ color: '#00bea5' }}>DO IT</Text>
      </Text>
      <Image source={require('.././src/assets/images/manWelcome.png')} style={styles.imageWelcome} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    fontFamily: 'DelaGothic',
  },
  text2: {
    fontSize: 38,
    fontFamily: 'DelaGothic',
  },
  imageWelcome: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: 50,
  },
});

export default Welcome;