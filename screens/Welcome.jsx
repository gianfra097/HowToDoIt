import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, ImageBackground} from 'react-native';
import HomeButton from '../src/components/HomeButton';

const Welcome = () => {
  return (
    <ImageBackground source={require('../src/assets/images/waveBackground.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text1}>
          <Text style={{ color: 'black' }}>HOW TO </Text>
          <Text style={{ color: '#00bea5' }}>DO IT</Text>
        </Text>
        <Text style={styles.text2}>IMPARA, OVUNQUE TU SIA!</Text>
        <Image source={require('../src/assets/images/manWelcome.png')} style={styles.imageWelcome} />
        <HomeButton style={styles.welcomeButton} title="CONTINUA"/>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 38,
    fontFamily: 'DelaGothic',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'NotoSans-Medium',
  },
  imageWelcome: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default Welcome;